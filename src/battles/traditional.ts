import {
  MoveEntry,
  TargetChoice,
  EffectReciept,
  ActionReciept,
  ActionSource,
  Battle,
  ReadyAction,
  RoundReciept,
  decideEffects,
  Round,
  Codemon,
  Combatant,
  recoil
} from "../index.ts";

export default class TraditionalBattle extends Battle {
  private round: Round;

  constructor(...combatants: Combatant[]) {
    super(combatants);
    this.round = {
      number: 0,
    } as Round;
  }

  // deno-lint-ignore no-unused-vars
  getTargets(source: ActionSource): TargetChoice {
    // TODO apply targeting category filter
    return {
      targets: this.combatants,
      count: 1,
      random: true,
    };
  }

  async runBattle() {
    await this.wait("start", this.combatants);
    const rounds: RoundReciept[] = [];
    while (this.combatants.length > 1) rounds.push(await this.runRound());
    console.log(`${this.combatants.length} combatants remaining.`)

    const reciept = { remaining: this.combatants, rounds, messages: [] };
    await this.wait("battleReciept", reciept);

    return reciept;
  }

  async runRound() {
    this.round = {
      number: this.round.number + 1,
      preactions: [],
      actions: [],
      messages: [],
      reactions: [],
    };
    await this.wait("round", this.getRound());
    const preactions = await this.runActions(this.getRound().preactions);

    const readys = await this.getActions();
    await this.wait("allReady", readys);

    const actions = await this.runActions(readys);

    await this.wait("roundEnd", this.getRound());
    const reactions = await this.runActions(this.getRound().reactions);

    const reciept: RoundReciept = {
      number: this.round.number,
      preactions,
      actions,
      reactions,
      messages: [],
    };
    await this.wait("roundReciept", reciept);

    return reciept;
  }

  getAction(combatant: Combatant): ReadyAction | Promise<ReadyAction> {
    return combatant.getAction(this);
  }

  async getActions() {
    const actions: ReadyAction[] = [];
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

  async runActions(readys: ReadyAction[]) {
    const actions: ActionReciept[] = [];
    for (const action of this.sortActions(readys)) {
      const actionReciept = await this.runAction(action);
      if(actionReciept) actions.push(actionReciept);
    }
    return actions;
  }

  async runAction(ready: ReadyAction) {
    const { source, targets, combatant } = ready;
    if(combatant instanceof Codemon && combatant.stats.hp.current <= 0) return;
    await this.wait("beforeAction", ready);
    
    const action = source.useAction({
      targets: targets,
      battle: this,
    });
    await this.wait("action", action);
    
    const preactions = await this.runActions(action.preactions);

    const hit = true // TODO: implement hit chance
    if(source instanceof MoveEntry) {
      if(hit && action.effect.recoil) action.reactions.push(recoil(source.user, action.effect.recoil))
      if(!hit && action.effect.crash) action.reactions.push(recoil(source.user, action.effect.crash))
    }


    const effects: EffectReciept[] = [];
    for (const target of action.targets) {
      const effect = decideEffects(action, target, this);
      await this.wait("effect", effect, target, action);
      const reciept = target.recieveEffect({ effect: effect, action, battle: this });
      if(reciept.faint || reciept.eject) this.combatants = this.combatants.filter(c => c !== target);
      await this.wait("effectReciept", reciept);
      effects.push(reciept);
    }

    await this.wait("actionEnd", action);
    const reactions = await this.runActions(action.reactions);

    const reciept: ActionReciept = {
      preactions,
      source,
      effects,
      messages: action.messages,
      reactions,
    };

    await this.wait("actionReciept", reciept);

    return reciept;
  }

  getRound() {
    return this.round;
  }
}