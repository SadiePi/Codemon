import C, {
  Action,
  ActionEffects,
  ActionSource,
  ActionTarget,
  Codemon,
  MoveEntry,
  PreliminaryRoundReciept,
  StatusEffect,
} from "../index.ts";

export const Burn: StatusEffect = {
  name: "Burn",
  description:
    "This Codemon is burned by searing heat! Take 1/16 of max HP as damage after each turn. Attack damage is halved.",
  volatile: false,

  apply: (target, source, battle) => {
    if (!(target instanceof Codemon)) throw new Error("Burn can only be applied to Codemon");
    if (target.species.types.includes(C.Types.Fire)) return; // immune

    // halve attack damage, damage after action
    let attackedThisRound = false; // TODO: this probably doesn't work. test it
    const halveDamageAndBurnIfAttack = (effect: ActionEffects, _target: ActionTarget, action: Action) => {
      if (!(action.source instanceof MoveEntry)) return;
      if (action.source.user !== target) return;
      if (!effect.attack) return;

      attackedThisRound = true;
      if (effect.attack.other) effect.attack.other *= 0.5;
      else effect.attack.other = 0.5;

      const user = action.source.user;
      action.messages.push(`${user.name} is weakened by ${user.gender.pronouns.possessive} burn!`);
      action.reactions.push({
        source: BurnDamage,
        targets: [user],
      });
    };
    const burnIfDidntAttack = (reciept: PreliminaryRoundReciept) => {
      if (!attackedThisRound) {
        reciept.reactions.push({
          source: BurnDamage,
          targets: [target],
        });
        attackedThisRound = false;
      }
    };

    battle.on("beforeEffectReciept", halveDamageAndBurnIfAttack);
    battle.on("roundEnd", burnIfDidntAttack);

    return () => {
      battle.off("beforeEffectReciept", halveDamageAndBurnIfAttack);
      battle.off("roundEnd", burnIfDidntAttack);
    };
  },
};

const BurnDamage: ActionSource = {
  targetingCategory: "Self",
  useAction: (targets, battle): Action => {
    if (targets.length !== 1) throw new Error("BurnDamage can only target one Codemon");
    const target = targets[0];
    if (!(target instanceof Codemon)) return new Action({}, BurnDamage, targets, battle);
    const damage = Math.floor(target.stats.hp.max / 16);
    const action = new Action(
      {
        hp: -damage,
      },
      BurnDamage,
      targets,
      battle
    );
    action.messages.push(`${target.name} took ${damage} damage from ${target.gender.pronouns.possessive} burn!`);
    return action;
  },
};
