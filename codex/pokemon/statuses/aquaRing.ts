import { Action, MoveEntry, Round, StatusEffect, TraditionalBBP as T, effectAction, volatile } from "../mod.ts";

const HEAL_FACTOR = 1 / 16;

export const AquaRing: StatusEffect<T> = {
  name: "Aqua Ring",
  slot: "primary",
  description: "This Codemon is surrounded by a veil of water! It restores 1/16 of its max HP after each turn.",

  apply: ({ target, action, battle }) => {
    action.message(`${target.name} is surrounded by a veil of water!`);
    let healedByAquaRingThisRound = false;

    const resetTurn = () => (healedByAquaRingThisRound = false);

    const healIfDidntUseMove = (round: Round<T>) => {
      if (!healedByAquaRingThisRound) {
        round.message(`${target.name} was healed by ${target.gender.pronouns.possessive} Aqua Ring!`);
        round.reactions.add(
          effectAction({
            battle,
            targets: [target],
            user: target,
            effect: {
              hp: Math.floor(target.stats.hp.max * HEAL_FACTOR),
            },
          })
        );
      }
      healedByAquaRingThisRound = false;
    };

    const healFromAquaRing = (action: Action<T>) => {
      // confirm it's this codemon using a move
      if (!(action.params.source instanceof MoveEntry)) return;
      if (action.params.source.user !== target) return;

      healedByAquaRingThisRound = true;
      action.message(`${target.name} was healed by its Aqua Ring!`);
      action.reactions.add(
        effectAction({
          battle,
          targets: [target],
          user: target,
          effect: {
            hp: Math.floor(target.stats.hp.max / 16),
          },
        })
      );
    };

    return {
      name: "Aqua Ring",
      activate: () => {
        resetTurn();
        battle.on("round", resetTurn);
        target.on("action", healFromAquaRing);
        battle.on("roundEnd", healIfDidntUseMove);
      },
      deactivate: () => {
        battle.off("round", resetTurn);
        target.off("action", healFromAquaRing);
        battle.off("roundEnd", healIfDidntUseMove);
      },
      expiry: volatile(battle),
    };
  },
};
