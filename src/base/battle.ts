import Codemon, { spawn } from "../core/codemon.ts";
import { Battle, BattleAction, BattleEvents, StatusEffect } from "../core/battle.ts";
import { Move, MoveReciept, MoveUsage } from "../core/move.ts";

type TMove = Move<TraditionalBattle>;
type TCodemon = Codemon<TraditionalBattle>;
type TMoveUsage = MoveUsage<TraditionalBattle>;
type TMoveReciept = MoveReciept<TraditionalBattle>;
type TStatusEffect = StatusEffect<TraditionalBattle>;

interface TEvents extends BattleEvents {
  beforeStart: [beforeStart?: unknown];
  beforeRound: [beforeRound?: unknown];
  beforeAction: [action: TPreAction];

  beforeMoveUsage: [action: TPreAction<"move">];
  afterMoveUsage: [action: TPreAction<"move">, usage: TMoveUsage];
  beforeMoveApply: [action: TPreAction<"move">, usage: TMoveUsage, target: TCodemon];
  afterMoveApply: [action: TPreAction<"move">, usage: TMoveUsage, reciept: TMoveReciept];
  afterMove: [after: TPostAction<"move">];

  beforeItemUsage: [action: TPreAction<"item">];
  afterItemUsage: [action: TPostAction<"item">];

  beforeFleeAttempt: [action: TPreAction<"flee">];
  afterFleeAttempt: [action: TPostAction<"flee">];

  beforeSwap: [action: TPreAction<"swap">];
  afterSwap: [action: TPostAction<"swap">];

  beforeWeatherChange: [newWeather?: unknown];
  afterWeatherChange: [afterWeatherChange?: unknown];

  beforeApplyStatusEffect: [combatant: TCodemon, statusEffect: TStatusEffect];
  afterApplyStatusEffect: [combatant: TCodemon, statusEffect: TStatusEffect];
  beforeUnapplyStatusEffect: [combatant: TCodemon, statusEffect: TStatusEffect];
  afterUnapplyStatusEffect: [combatant: TCodemon, statusEffect: TStatusEffect];

  beforeFaint: [fainter: TCodemon];
  afterFaint: [fainter: TCodemon];

  afterAction: [action: TPostAction];
  afterRound: [afterRound?: unknown];
  afterEnd: [result: TResult];
}

// There's got to be a more automated way of doing this
type TAction<T extends TActionType | undefined = undefined> = T extends undefined
  ?
      | BattleAction<
          "move",
          TCodemon,
          { move: TMove; targets: TCodemon[] },
          { usage: TMoveUsage; reciepts: TMoveReciept[] }
        >
      | BattleAction<"item", TCodemon, { item: never }>
      | BattleAction<"flee", TCodemon, Record<never, never>, { successful: boolean }>
      | BattleAction<"swap", TCodemon, { replacement: TCodemon }>
  : TAction & { type: T };
type TActionType = TAction["type"];
type TPreAction<T extends TActionType | undefined = undefined> = TAction<T>["pre"];
type TPostAction<T extends TActionType | undefined = undefined> = TAction<T>["post"];

interface TResult {
  winner: TCodemon | null;
}

export class TraditionalBattle extends Battle<TAction, TEvents, TResult> {
  getTargets(actor: TCodemon, action: TPreAction): TCodemon[] {
    throw new Error("Method not implemented.");
  }
  public combatants: TCodemon[];
  // private recurringActions: TAction["pre"][] = [];

  constructor(...combatants: (TCodemon | Parameters<typeof spawn<TraditionalBattle>>[0])[]) {
    // FIXME prettier breaks when I specify TraditionalBattle as a type argument for spawn
    super();
    this.combatants = combatants.map(c => (c instanceof Codemon ? c : spawn(c)));
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
    for (const action of actions) {
      this.pushHistory({
        pre: action,
        post: await this.applyAction(action),
      });
    }
    await this.wait("afterRound");
  }

  // deno-lint-ignore require-await
  async getActions() {
    return this.combatants.map(c => this.getAIAction(c));
  }

  // getTeamActions() {
  //   throw new Error("Method not implemented.");
  //   return []
  // }

  getAIAction(actor: TCodemon): TPreAction {
    return {
      type: "move",
      actor,
      move: actor.moves[0],
      targets: [this.combatants[this.combatants.findIndex(c => c !== actor)]],
    };
  }

  sortActions(actions: TAction["pre"][]) {
    //console.log(actions);
    return actions.sort((a, b) => {
      const speedDiff = b.actor.stats.speed.value(true) - a.actor.stats.speed.value(true);
      const aPrio = a.type === "move" ? a.move.data.priority ?? 0 : 0;
      const bPrio = b.type === "move" ? b.move.data.priority ?? 0 : 0;
      return bPrio - aPrio || speedDiff;
    });
  }

  async applyAction(action: TAction["pre"]) {
    if (action.actor.stats.hp.current <= 0) return;
    let post: TAction["post"];
    await this.wait("beforeAction", action);

    // action should have an apply method instead of this switch
    switch (action.type) {
      case "move": {
        post = await this.applyMoveAction(action);
        break;
      }
      case "item": {
        post = await this.applyItemAction(action);
        break;
      }
      case "swap": {
        post = await this.applySwapAction(action);
        break;
      }
      case "flee": {
        post = await this.applyFleeAction(action);
        break;
      }
    }

    await this.wait("afterAction", post);
    return post;
  }

  async applyMoveAction(action: TPreAction<"move">): Promise<TPostAction<"move">> {
    await this.wait("beforeMoveUsage", action);
    const usage = action.move.Use(action.targets);
    await this.emit("afterMoveUsage", action, usage);

    const reciepts: TMoveReciept[] = [];
    for (const target of action.targets) {
      if (target.stats.hp.current <= 0) continue;

      await this.wait("beforeMoveApply", action, usage, target);
      const reciept = target.RecieveMove(usage);
      await this.wait("afterMoveApply", action, usage, reciept);

      if (reciept.fainted) {
        await this.wait("beforeFaint", target);
        this.combatants = this.combatants.filter(c => c !== target);
        await this.wait("afterFaint", target);
      }
      reciepts.push(reciept);
    }

    const post = {
      type: "move" as const,
      actor: action.actor,
      usage: usage,
      reciepts: reciepts,
    };

    await this.wait("afterMove", post);
    return post;
  }

  async applyItemAction(action: TPreAction<"item">): Promise<TPostAction<"item">> {
    await this.wait("beforeItemUsage", action);
    const post: TPostAction<"item"> = {
      type: "item" as const,
      actor: action.actor,
    };
    await this.wait("afterItemUsage", post);
    return post;
  }

  async applySwapAction(action: TPreAction<"swap">): Promise<TPostAction<"swap">> {
    await this.wait("beforeSwap", action);
    const post: TPostAction<"swap"> = {
      type: "swap" as const,
      actor: action.actor,
    };
    await this.wait("afterSwap", post);
    return post;
  }

  async applyFleeAction(action: TPreAction<"flee">): Promise<TPostAction<"flee">> {
    await this.wait("beforeFleeAttempt", action);

    // TODO: Currently uses gen 3 and 4 logic (incomplete at that).
    // Should be changed to use later gen logic.
    const odds = Math.floor(
      (action.actor.stats.speed.value(true) * 128) /
        this.combatants.reduce((acc, c) => acc + c.stats.speed.value(true), 0)
    );

    const success = Math.random() * 256 < odds;
    if (success) this.combatants = this.combatants.filter(c => c !== action.actor);

    const post = {
      type: "flee" as const,
      actor: action.actor,
      successful: success,
    };

    await this.wait("afterFleeAttempt", post);
    return post;
  }

  consoleInterface() {
    this.on("beforeStart", async () => {
      console.log("Battle started!\n");
      console.log("Combatants:");
      console.log(this.combatants.map(c => c.toString(false)).join("\n"));
      await new Promise(resolve => setTimeout(resolve, 3000));
    });

    this.on("beforeAction", _ => {
      console.log();
    });

    this.on("beforeMoveUsage", async ({ move, targets }) => {
      console.log(`${move.user.name} used ${move.data.name} on ${targets.map(c => c.name).join(", ")}!`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    });

    this.on("afterMoveApply", async (_, __, reciept) => {
      console.log(
        `${reciept.target.name} took ${reciept.damage} damage! ${reciept.target.stats.hp.current} HP remaining.`
      );
      await new Promise(resolve => setTimeout(resolve, 3000));
    });

    this.on("afterFaint", async fainter => {
      console.log(`${fainter.name} fainted!`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    });

    this.on("afterAction", async _action => await new Promise(resolve => setTimeout(resolve, 3000)));

    this.setPlayerInterface(actor => {
      const moves = actor.moves.filter(m => m.PP.current > 0);
      const move = moves[Math.floor(Math.random() * moves.length)]; // TODO struggle
      const targets = this.combatants.filter(c => c !== actor && c.stats.hp.current > 0);
      return {
        type: "move",
        actor,
        move,
        targets,
      };
    });
  }
}
