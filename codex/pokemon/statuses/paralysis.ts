import { Action, Codemon, MoveEntry, StatusEffect, volatile } from "../mod.ts";
import loader from "../loader.ts";

export const Paralysis: StatusEffect = loader.register(P => ({
  name: "Paralysis",
  slot: "primary",
  description: "This Codemon is paralyzed! It might not be able to move!",

  apply: ({ target, effect, context: { battle } }) => {
    if (!(target instanceof Codemon)) return; // only applies to codemon
    if (target.species.types.includes(P.Types.Electric)) return; // immune

    effect.messages.push(`${target.name} is paralyzed, so ${target.gender.pronouns.subject} may be unable to move!`);

    // 25% chance to not move
    const maybeDontMove = (action: Action) => {
      if (!(action.source instanceof MoveEntry)) return;
      if (action.source.user !== target) return;
      if (Math.random() < 0.25) {
        action.messages.push(`${target.name} couldn't move because ${target.gender.pronouns.subject}'s paralyzed!`);
        action.effect = {};
      }
    };

    // TODO reduce speed by 50% when sorting actions
    // TODO decrease chance of escaping

    return {
      activate: () => battle.on("action", maybeDontMove),
      deactivate: () => battle.off("action", maybeDontMove),
      expiry: volatile(battle),
    };
  },
}));
