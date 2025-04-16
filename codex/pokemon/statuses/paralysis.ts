import { Action, Codemon, MoveEntry, StatusEffect, volatile, TraditionalBBP as T, config } from "../mod.ts";
import loader from "../loader.ts";

export const Paralysis: StatusEffect<T> = loader.register(P => ({
  name: "Paralysis",
  slot: "primary",
  description: "This Codemon is paralyzed! It might not be able to move!",

  apply: ({ target, action, battle }) => {
    if (!(target instanceof Codemon)) return; // only applies to codemon
    if (target.getSpecies().types.includes(P.Types.Electric)) return; // immune

    action.message(`${target.name} is paralyzed, so ${target.gender.pronouns.subject} may be unable to move!`);

    // 25% chance to not move
    const maybeDontMove = (action: Action<T>) => {
      if (!(action.params.source instanceof MoveEntry)) return;
      if (action.params.user !== target) return;
      if (config.rng() < 0.25) {
        action.message(`${target.name} couldn't move because ${target.gender.pronouns.subject}'s paralyzed!`);
        action.cancel = true;
      }
    };

    // TODO reduce speed by 50% when sorting actions
    // TODO decrease chance of escaping

    return {
      name: "Paralysis",
      activate: () => target.on("action", maybeDontMove),
      deactivate: () => target.off("action", maybeDontMove),
      expiry: volatile(battle),
    };
  },
}));
