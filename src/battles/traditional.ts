import {
  MoveEntry,
  TargetChoice,
  Codemon,
  EffectReciept,
  ActionReciept,
  ActionSource,
  Battle,
  ReadyAction,
  RoundReciept,
  decideEffects,
  BattleActor,
  BattleController,
  Round,
} from "../index.ts";

export const AIController: BattleController = {} as BattleController; // TODO
export const PlayerConsoleController: BattleController = {} as BattleController; // TODO

export function AI(codemon: Codemon): BattleActor {
  return {
    self: codemon,
    controller: AIController,
  };
}

export function Player(codemon: Codemon): BattleActor {
  return {
    self: codemon,
    controller: PlayerConsoleController,
  };
}

export class TraditionalBattle extends Battle {
  private round: Round;
  public combatants: BattleActor[];

  constructor(...combatants: BattleActor[]) {
    super();
    this.combatants = combatants;
    this.round = {
      number: 0,
    } as Round;
  }

  // deno-lint-ignore no-unused-vars
  getTargets(source: ActionSource): TargetChoice {
    // TODO apply targeting category filter
    return {
      targets: this.combatants.map(c => c.self),
      count: 1,
      random: true,
    };
  }

  async runBattle() {
    await this.wait("start", this.combatants);

    const rounds: RoundReciept[] = [];
    while (this.combatants.length > 1) rounds.push(await this.runRound());

    const reciept = { remaining: this.combatants, rounds, messages: [] };
    await this.wait("battleReciept", reciept);

    return reciept;
  }

  async runRound() {
    this.round = {
      number: this.round.number + 1,
      preactions: [],
      reciepts: [],
      messages: [],
      reactions: [],
    };
    await this.wait("round", this.getCurrentRound());

    const actions = await this.getActions();
    await this.wait("ready", actions);

    const reciepts: ActionReciept[] = [];
    for (const action of this.sortActions(actions)) reciepts.push(await this.runAction(action));

    await this.wait("roundEnd", this.getCurrentRound());
    const reactionReciepts: ActionReciept[] = [];
    for (const reaction of this.sortActions(this.getCurrentRound().reactions))
      reactionReciepts.push(await this.runAction(reaction));

    const reciept: RoundReciept = {
      number: this.round.number,
      preactions: [],
      actions: reciepts,
      reactions: reactionReciepts,
      messages: [],
    };

    await this.wait("roundReciept", reciept);

    return reciept;
  }

  async getAction(combatant: BattleActor) {
    const sourcing = combatant.controller.action(combatant, this);
    const source = await sourcing;
    const choice = await this.getTargets(source);
    const targets = combatant.controller.target(combatant, source, choice);
    const ready = { source, targets };
    await this.wait("readyAction", ready);
    return ready;
  }

  async getActions() {
    const actions = [];
    for (const combatant of this.combatants) actions.push(await this.getAction(combatant));
    return actions;
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
    const action = ready.source.useAction({
      targets: ready.targets,
      battle: this,
    });

    await this.wait("action", action);
    const preactions: ActionReciept[] = [];
    for (const preaction of this.sortActions(action.preactions)) preactions.push(await this.runAction(preaction));

    const effects: EffectReciept[] = [];
    for (const target of action.targets) {
      const effect = decideEffects(action, target, this);
      await this.wait("effect", effect, target, action);
      const reciept = await target.recieveEffect({ effect: effect, action, battle: this });
      await this.wait("effectReciept", reciept);
      effects.push(reciept);
    }

    await this.wait("actionEnd", action);
    const reactions: ActionReciept[] = [];
    for (const reaction of this.sortActions(action.reactions)) reactions.push(await this.runAction(reaction));

    const reciept: ActionReciept = {
      preactions,
      source: ready.source,
      effects,
      messages: [],
      reactions,
    };

    await this.wait("actionReciept", reciept);

    return reciept;
  }

  getCurrentRound() {
    return this.round;
  }
}

/*consoleInterface() {
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
}*/
