import { Action, Codemon, MoveEntry, StatusEffect } from "../index.ts";
import loader from "../loader.ts";

export const Paralysis: StatusEffect = loader.register(P => ({
  name: "Paralysis",
  description: "This Codemon is paralyzed! It might not be able to move!",
  volatile: true,
  apply: (target, reciept, context) => {
    if (!(target instanceof Codemon)) return; // only applies to codemon
    if (target.species.types.includes(P.Types.Electric)) return; // immune

    // 25% chance to not move
    const maybeDontMove = (action: Action) => {
      if (!(action.source instanceof MoveEntry)) return;
      if (action.source.user !== target) return;
      if (Math.random() < 0.25) {
        action.messages.push(`${target.name} is paralyzed! ${target.gender.pronouns.subject} can't move!`);
        action.effect = {};
      }
    };

    // TODO reduce speed by 50% when sorting actions

    context.battle.on("action", maybeDontMove);
    reciept.messages.push(`${target.name} was paralyzed!`);

    return () => context.battle.off("action", maybeDontMove);
  },
}));

Deno.test("Paralysis", () => {
  // TODO
});
