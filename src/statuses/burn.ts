import C, {
  Action,
  ActionSource,
  EffectTarget,
  Codemon,
  MoveEntry,
  StatusEffect,
  Effects,
  Round,
  ActionUseContext,
} from "../index.ts";

export const Burn: StatusEffect = {
  name: "Burn",
  description:
    "This Codemon is burned by searing heat! Take 1/16 of max HP as damage after each turn. Attack damage is halved.",
  volatile: false,

  apply: (target, _action, battle) => {
    if (!(target instanceof Codemon)) return; // only applies to codemon
    if (target.species.types.includes(C.Types.Fire)) return; // immune

    // halve attack damage, damage after action
    let attackedThisRound = false; // TODO: this probably doesn't work. test it
    const halveDamageAndBurnIfAttack = (effect: Effects, _target: EffectTarget, action: Action) => {
      if (!(action.source instanceof MoveEntry)) return;
      if (action.source.user !== target) return;
      if (!effect.attack) return;

      attackedThisRound = true;
      effect.attack.other = (effect.attack.other ?? 1) * 0.5;

      action.messages.push(`${target.name} is weakened by ${target.gender.pronouns.possessive} burn!`);
      action.reactions.push({
        source: BurnDamage,
        targets: [target],
      });
    };
    const burnIfDidntAttack = (round: Round) => {
      if (!attackedThisRound) {
        round.reactions.push({
          source: BurnDamage,
          targets: [target],
        });
      }
      attackedThisRound = false;
    };

    battle.on("effect", halveDamageAndBurnIfAttack);
    battle.on("roundEnd", burnIfDidntAttack);

    return () => {
      battle.off("effect", halveDamageAndBurnIfAttack);
      battle.off("roundEnd", burnIfDidntAttack);
    };
  },
};

const BurnDamage: ActionSource = {
  targetingCategory: "Self",
  useAction: (context: ActionUseContext): Action => {
    if (context.targets.length !== 1) throw new Error("BurnDamage can only have one target");
    const target = context.targets[0];
    const action = new Action({
      effect: {},
      source: BurnDamage,
      targets: [target],
    });
    if (target instanceof Codemon) {
      const damage = Math.floor(target.stats.hp.max / 16);
      action.effect.hp = -damage;
      action.messages.push(`${target.name} took ${damage} damage from ${target.gender.pronouns.possessive} burn!`);
    }
    return action;
  },
};
