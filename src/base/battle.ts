import Codemon from "../core/codemon.ts";
import { Battle, BattleAction, BattleEvents, Combatant } from "../core/battle.ts";
import { Move, MoveReciept, MoveUsage } from "../core/move.ts";

interface TEvents extends BattleEvents {
  beforeStart: [];
  beforeRound: [];
  beforeAction: [action: TActions];

  beforeMoveUsage: [move: Move, targets: Combatant[]];
  afterMoveUsage: [move: Move, moveUsage: MoveUsage];
  beforeMoveApply: [move: MoveUsage];
  afterMoveApply: [reciept: MoveReciept];
  afterMove: [report: MoveReciept[]];

  beforeItemUsage: [target: Combatant, item: never];
  afterItemUsage: [target: Combatant, item: never];

  beforeFleeAttempt: [coward: Combatant];
  beforeUnsuccessfulFlee: [coward: Combatant];
  afterUnsuccessfulFlee: [coward: Combatant];
  beforeSuccessfulFlee: [coward: Combatant];
  afterSuccessfulFlee: [coward: Combatant];
  afterFleeAttempt: [coward: Combatant];

  beforeSwap: [coward: Combatant, replacement: Combatant];
  afterSwap: [coward: Combatant, replacement: Combatant];

  beforeWeatherChange: [newWeather: never];
  afterWeatherChange: [];

  beforeStatusChange: [combatant: Combatant, statusChange: never];
  afterStatusChange: [combatant: Combatant, statusChange: never];

  beforeFaint: [fainter: Combatant];
  afterFaint: [fainter: Combatant];

  afterAction: [action: TActions];
  afterRound: [];
  afterEnd: [result: TResult];
}

type TActions =
  | BattleAction<"move", Combatant, { move: Move; targets: Combatant[] }>
  | BattleAction<"item", Combatant, { item: never }>
  | BattleAction<"swap", Combatant, { replacement: Combatant }>
  | BattleAction<"flee", Combatant>;

interface TResult {
  winner: Codemon | null;
}

export class TraditionalBattle extends Battle<TEvents, TActions, TResult> {
  public combatants: Combatant[];

  constructor(combatants: Combatant[]) {
    super();
    this.combatants = combatants;
  }

  async runBattle() {
    await this.wait("beforeStart");
    while (this.combatants.length > 1) await this.runRound();
    const ret = { winner: this.combatants[0] ?? null };
    await this.wait("afterEnd", ret);
    return ret;
  }

  async runRound() {
    await this.wait("beforeRound");
    const actions = this.sortActions(await this.getActions());
    for (const action of actions) await this.applyAction(action);
    await this.wait("afterRound");
  }

  // deno-lint-ignore require-await
  async getActions() {
    return this.combatants.map(c => this.getAIAction(c));
  }

  async getPlayerAction(actor: Codemon) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.getAIAction(actor);
  }

  getAIAction(actor: Codemon) {
    return {
      type: "move" as const,
      actor,
      move: actor.moves[0],
      targets: [this.combatants[this.combatants.findIndex(c => c !== actor)]],
    } as TActions;
  }

  sortActions(actions: TActions[]) {
    return actions.sort((a, b) => {
      const speedDiff = a.actor.stats.speed.value(true) - b.actor.stats.speed.value(true);
      const aPrio = a.type === "move" ? a.move.info.priority : 0;
      const bPrio = b.type === "move" ? b.move.info.priority : 0;
      return aPrio - bPrio || speedDiff;
    });
  }

  async applyAction(action: TActions) {
    if (action.actor.stats.hp.current <= 0) return;
    await this.wait("beforeAction", action);
    switch (action.type) {
      case "move": {
        await this.wait("beforeMoveUsage", action.move, action.targets);
        const usage = action.move.Use(action.targets);
        await this.emit("afterMoveUsage", action.move, usage);

        const report: MoveReciept[] = [];
        for (const target of action.targets) {
          await this.wait("beforeMoveApply", usage);
          const reciept = target.RecieveMove(usage);
          await this.wait("afterMoveApply", reciept);

          if (reciept.fainted) {
            await this.wait("beforeFaint", target);
            this.combatants = this.combatants.filter(c => c !== target);
            await this.wait("afterFaint", target);
          }
          report.push(reciept);
        }

        await this.wait("afterMove", report);

        break;
      }
      case "item":
        await this.wait("beforeItemUsage", action.actor, action.item);
        await this.wait("afterItemUsage", action.actor, action.item);
        break;
      case "swap":
        await this.wait("beforeSwap", action.actor, action.replacement);
        await this.wait("afterSwap", action.actor, action.replacement);
        break;
      case "flee": {
        // TODO: Currently uses gen 3 and 4 logic (incomplete at that).
        // Should be changed to use later gen logic.
        const odds = Math.floor(
          (action.actor.stats.speed.value(true) * 128) /
            this.combatants.reduce((acc, c) => acc + c.stats.speed.value(true), 0)
        );
        if (Math.random() * 256 < odds) {
          await this.wait("beforeFlee", action.actor);
          this.combatants = this.combatants.filter(c => c !== action.actor);
          await this.wait("afterFlee", action.actor);
        }
        break;
      }
    }

    await this.wait("afterAction", action);
  }

  consoleInterface() {
    this.on("beforeStart", async () => {
      console.log("Battle started!\n");
      console.log("Combatants:");
      console.log(this.combatants.map(c => c.toString(false)).join("\n"));
      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    this.on("beforeAction", action => {
      console.log();
      console.log(action.actor.toString(true));
    });

    this.on("beforeMoveUsage", (move, targets) => {
      console.log(`${move.user.name} uses ${move.info.name} on ${targets.map(c => c.name).join(", ")}!`);
    });

    this.on("afterMoveApply", reciept => {
      console.log(
        `${reciept.target.name} took ${reciept.damage} damage! ${reciept.target.stats.hp.current} HP remaining.`
      );
    });

    this.on("afterFaint", fainter => {
      console.log(`${fainter.name} fainted!`);
    });

    this.on("afterAction", async _action => await new Promise(resolve => setTimeout(resolve, 2000)));
  }
}
