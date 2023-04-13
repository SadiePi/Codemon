import { duration } from "../../../src/mod.ts";
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

export const Flinch: StatusEffect = loader.register(P => ({
  name: "Flinch",
  slot: "secondary",
  description: "This Pokemon flinches! It loses its turn to attack this round.",

  apply: ({ target, effect, context: { battle } }) => {
    if (!(target instanceof Codemon)) return; // only applies to codemon

    effect.messages.push(`${target.name} flinches!`);

    // lose turn to attack
    const handleFlinch = (effect: Effects, _target: Combatant, action: Action) => {
      if (!(action.source instanceof MoveEntry)) return;
      if (action.source.user !== target) return;

      action.cancel = true;
      action.messages.push(`${target.name} flinches and can't move!`);
    };

    return {
      activate: () => {
        battle.on("effect", handleFlinch);
      },
      deactivate: () => {
        battle.off("effect", handleFlinch);
      },
      expiry: duration(1, battle),
    };
  },
}));
