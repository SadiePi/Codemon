import { Action, MoveEntry, Round, volatile, StatusEffect, TraditionalBBP as T, effectAction, decide } from "../mod.ts";
import loader from "../loader.ts";

// TODO use Codemon events instead of battle events

export const Burn: StatusEffect<T> = loader.register(P => ({
  name: "Burn",
  slot: "primary",
  description:
    "This Pokemon is burned by searing heat! Take 1/16 of max HP as damage after each turn. Attack damage is halved.",

  apply: ctx => {
    const { target, action, battle } = ctx;
    if (target.getSpecies().types.includes(P.Types.Fire)) return; // immune

    action.message(`${target.name} was burned!`);
    let attackedThisRound = false;

    const halveDamageAndBurnIfAttack = (action: Action<T>) => {
      if (!(action.params.source instanceof MoveEntry)) return;
      if (action.params.source.user !== target) return;
      if (!action.params.effect.attack) return;

      // halve damage
      attackedThisRound = true;
      const prevAttack = action.params.effect.attack;
      action.params.effect.attack = _ctx => {
        const _attack = decide(prevAttack, _ctx);
        if (!_attack) return;
        _attack.other = (_attack.other ?? 1) * 0.5;
        return _attack;
      };
      action.message(`${target.name} is weakened by ${target.gender.pronouns.possessive} burn!`);

      // damage after action
      action.reactions.add(
        effectAction(battle, target, {
          hp: -Math.floor(target.stats.hp.max / 16),
        })
      );
    };

    const burnIfDidntAttack = (round: Round<T>) => {
      // damage after round if didn't attack
      if (!attackedThisRound) {
        round.reactions.add(
          effectAction(battle, target, {
            hp: -Math.floor(target.stats.hp.max / 16),
          })
        );
      }
      attackedThisRound = false;
    };

    return {
      name: "Burn",
      activate: () => {
        battle.on("action", halveDamageAndBurnIfAttack);
        battle.on("roundEnd", burnIfDidntAttack);
      },
      deactivate: () => {
        battle.off("action", halveDamageAndBurnIfAttack);
        battle.off("roundEnd", burnIfDidntAttack);
      },
      expiry: volatile(battle),
    };
  },
}));
