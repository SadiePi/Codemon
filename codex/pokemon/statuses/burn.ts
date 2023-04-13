import {
  Action,
  Combatant,
  Codemon,
  MoveEntry,
  Effects,
  Round,
  StatusEffect,
  effectAction,
  volatile,
} from "../index.ts";
import loader from "../loader.ts";

// TODO use Codemon events instead of battle events

export const Burn: StatusEffect = loader.register(P => ({
  name: "Burn",
  slot: "primary",
  description:
    "This Pokemon is burned by searing heat! Take 1/16 of max HP as damage after each turn. Attack damage is halved.",

  apply: ({ target, effect, context: { battle } }) => {
    if (!(target instanceof Codemon)) return; // only applies to codemon
    if (target.species.types.includes(P.Types.Fire)) return; // immune

    effect.messages.push(`${target.name} was burned!`);
    let attackedThisRound = false;

    // halve attack damage, damage after action, damage after round if didn't attack
    const halveDamageAndBurnIfAttack = (effect: Effects, _target: Combatant, action: Action) => {
      if (!(action.source instanceof MoveEntry)) return;
      if (action.source.user !== target) return;
      if (!effect.attack) return;

      attackedThisRound = true;
      effect.attack.other = (effect.attack.other ?? 1) * 0.5;

      action.messages.push(`${target.name} is weakened by ${target.gender.pronouns.possessive} burn!`);
      action.reactions.push(
        effectAction(target, {
          hp: -Math.floor(target.stats.hp.max / 16),
        })
      );
    };

    const burnIfDidntAttack = (round: Round) => {
      if (!attackedThisRound) {
        round.reactions.push(
          effectAction(target, {
            hp: -Math.floor(target.stats.hp.max / 16),
          })
        );
      }
      attackedThisRound = false;
    };

    return {
      activate: () => {
        battle.on("effect", halveDamageAndBurnIfAttack);
        battle.on("roundEnd", burnIfDidntAttack);
      },
      deactivate: () => {
        battle.off("effect", halveDamageAndBurnIfAttack);
        battle.off("roundEnd", burnIfDidntAttack);
      },
      expiry: volatile(battle),
    };
  },
}));
