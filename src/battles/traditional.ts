import {
  MoveEntry,
  TargetChoice,
  Codemon,
  spawn,
  EffectReciept,
  ActionReciept,
  ActionSource,
  ActionTarget,
  Battle,
  ReadyAction,
  RoundReciept,
  effectsFromParams,
  PreliminaryRoundReciept,
} from "../index.ts";

export class TraditionalBattle extends Battle {
  public combatants: Codemon[];

  constructor(...combatants: (Codemon | Parameters<typeof spawn>[0])[]) {
    super();
    this.combatants = combatants.map(c => (c instanceof Codemon ? c : spawn(c)));
  }

  getTargets(source: ActionSource): TargetChoice {
    return {
      source,
      targets: [...this.combatants],
      choice: "RandomSingle",
    };
  }

  async runBattle() {
    await this.wait("start", this.combatants);

    const rounds: RoundReciept[] = [];
    while (this.combatants.length > 1) rounds.push(await this.runRound());

    const report = { winner: this.combatants[0] ?? null, rounds, messages: [] };
    await this.wait("afterEnd", report);

    return report;
  }

  async runRound() {
    await this.wait("round", this.combatants, this.round);
    const actions = await this.getActions();
    await this.wait("ready", actions);

    const reciepts: ActionReciept[] = [];
    for (const action of this.sortActions(actions)) reciepts.push(await this.runAction(action));
    const preciept: PreliminaryRoundReciept = {
      round: this.round,
      actions: reciepts,
      messages: [],
      reactions: [],
    };

    await this.wait("roundEnd", preciept);
    for (const reaction of this.sortActions(preciept.reactions)) reciepts.push(await this.runAction(reaction));
    const reciept: RoundReciept = {
      round: this.round,
      actions: reciepts,
      messages: [],
    };

    this._round++;
    return reciept;
  }

  // deno-lint-ignore require-await
  async getActions() {
    return this.combatants.map(c => this.getAIAction(c));
  }

  // getTeamActions() {
  //   throw new Error("Method not implemented.");
  //   return []
  // }

  getAIAction(codemon: Codemon): ReadyAction {
    return {
      source: codemon.moves[0],
      targets: [this.combatants[this.combatants.findIndex(c => c !== codemon)]],
    };
  }

  // deno-lint-ignore no-unused-vars
  getAITarget(codemon: ActionTarget, choice: TargetChoice): ActionTarget[] {
    throw new Error("Method not implemented.");
  }

  sortActions(actions: ReadyAction[]) {
    return actions.sort((a, b) => {
      const prioDiff = (a.source.priority ?? 0) - (b.source.priority ?? 0);
      if (prioDiff !== 0) return prioDiff;

      const aSpeed = a.source instanceof MoveEntry ? a.source.user.stats.speed.value(true) : 0;
      const bSpeed = b.source instanceof MoveEntry ? b.source.user.stats.speed.value(true) : 0;
      return bSpeed - aSpeed;
    });
  }

  async runAction(ready: ReadyAction): Promise<ActionReciept> {
    await this.wait("beforeAction", ready);
    const action = ready.source.useAction(ready.targets, this);
    await this.wait("action", action);

    const preactions: ActionReciept[] = [];
    for (const preaction of this.sortActions(action.preactions)) preactions.push(await this.runAction(preaction));

    const effects: EffectReciept[] = [];
    for (const target of action.targets) {
      const effect = effectsFromParams(action, ready, target, this);
      await this.wait("beforeEffectReciept", effect, target, action);
      const reciept = await target.recieveAction(effect, ready, this);
      await this.wait("effectReciept", reciept);
      effects.push(reciept);
    }

    const reactions: ActionReciept[] = [];
    for (const reaction of this.sortActions(action.reactions)) reactions.push(await this.runAction(reaction));

    const reciept: ActionReciept = {
      preactions,
      action,
      effects,
      messages: [],
      reactions,
    };

    await this.wait("actionReciept", reciept);

    return reciept;
  }

  consoleInterface() {
    this.on("start", () => {
      console.log("Battle started!\n");
      console.log("Combatants:");
      console.log(this.combatants.map(c => c.toString(true)).join("\n"));
      prompt("Press enter to continue...");
      console.log();
    });

    this.on("round", round => {
      console.log(`\nRound ${round}!`);
    });

    //this.on("ready", () => console.log("Actions ready!"));

    this.on("action", action => {
      if (action.source instanceof MoveEntry)
        action.messages.push(`${action.source.user.name} used ${action.source.data.name}!`);
      // TODO add other action types
    });

    this.on("effectReciept", reciept => {
      if (reciept.target instanceof Codemon) {
        if (reciept.attack) {
          if (reciept.attack.typeBoost === 0) console.log("It had no effect!");
          console.log(reciept.target.name + " took " + reciept.attack.total + " damage!");
        }
      }
    });

    this.on("roundEnd", reciept => {
      console.log("\nRound " + reciept.round + " ended!");
      console.log(reciept.messages.join("\n"));
      prompt("Press enter to continue...");
      console.log();
    });
  }
}
