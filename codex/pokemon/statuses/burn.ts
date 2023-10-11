import {
  Action,
  MoveEntry,
  Round,
  volatile,
  StatusEffect,
  TraditionalBBP as T,
  effectAction,
  TargetEffects,
  proxy,
} from "../mod.ts";
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
    let hurtByBurnThisRound = false;

    const burnIfDidntAttack = (round: Round<T>) => {
      if (!hurtByBurnThisRound) {
        round.reactions.add(
          effectAction({
            battle,
            targets: [target],
            user: target,
            effect: {
              hp: -Math.floor(target.stats.hp.max / 16),
            },
          })
        );
      }
    };

    const inflictBurnRecoil = (action: Action<T>) => {
      // confirm it's this codemon using an attacking move
      if (!(action.params.source instanceof MoveEntry)) return;
      if (action.params.source.user !== target) return;
      if (!action.params.effect.attack) return;

      hurtByBurnThisRound = true;
      action.message(`${target.name} was hurt by ${target.gender.pronouns.possessive} burn!`);
      action.reactions.add(
        effectAction({
          battle,
          targets: [target],
          user: target,
          effect: {
            status: P.Statuses.Burn,
          },
        })
      );
    };

    const halveAttackDamage = (effect: TargetEffects<T>) => {
      if (!effect.attack) return;
      effect.attack = proxy(effect.attack, result => {
        if (!result) return;
        result.other = (result.other ?? 1) * 0.5;
      });
    };

    return {
      name: "Burn",
      activate: () => {
        battle.on("round", () => (hurtByBurnThisRound = false));
        target.on("actionEnd", inflictBurnRecoil);
        target.on("inflictEffects", halveAttackDamage);
        battle.on("roundEnd", burnIfDidntAttack);
      },
      deactivate: () => {
        target.off("actionEnd", inflictBurnRecoil);
        target.off("inflictEffects", halveAttackDamage);
        battle.off("roundEnd", burnIfDidntAttack);
      },
      expiry: volatile(battle),
    };
  },
}));
