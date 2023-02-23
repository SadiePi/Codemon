import P, {
  Action,
  ActionSource,
  Combatant,
  Codemon,
  MoveEntry,
  StatusEffect,
  Effects,
  Round,
  ActionUseContext,
} from "../index.ts";
import loader from "../loader.ts";

// TODO make this MUCH less cumbersome
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

export const Burn: StatusEffect = loader.register(() => ({
  name: "Burn",
  description:
    "This Codemon is burned by searing heat! Take 1/16 of max HP as damage after each turn. Attack damage is halved.",
  volatile: false,

  apply: (target, reciept, context) => {
    if (!(target instanceof Codemon)) return; // only applies to codemon
    if (target.species.types.includes(P.Types.Fire)) return; // immune

    // halve attack damage, damage after action, damage after round if didn't attack
    const halveDamageAndBurnIfAttack = (effect: Effects, _target: Combatant, action: Action) => {
      if (!(action.source instanceof MoveEntry)) return;
      if (action.source.user !== target) return;
      if (!effect.attack) return;

      attackedThisRound = true;
      effect.attack.other = (effect.attack.other ?? 1) * 0.5;

      action.messages.push(`${target.name} is weakened by ${target.gender.pronouns.possessive} burn!`);
      action.reactions.push({
        combatant: target,
        source: BurnDamage,
        targets: [target],
      });
    };
    let attackedThisRound = false;
    const burnIfDidntAttack = (round: Round) => {
      if (!attackedThisRound) {
        round.reactions.push({
          combatant: target,
          source: BurnDamage,
          targets: [target],
        });
      }
      attackedThisRound = false;
    };

    context.battle.on("effect", halveDamageAndBurnIfAttack);
    context.battle.on("roundEnd", burnIfDidntAttack);

    reciept.messages.push(`${target.name} was burned!`);

    return () => {
      context.battle.off("effect", halveDamageAndBurnIfAttack);
      context.battle.off("roundEnd", burnIfDidntAttack);
    };
  },
}));
