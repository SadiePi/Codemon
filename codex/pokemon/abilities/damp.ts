import loader from "../loader.ts";
import { Ability, TraditionalBBP as T, permanent, MoveEntry, Action, Battle } from "../mod.ts";

export const Damp: Ability = loader.register(P => {
  // despite the general description, Damp specifically prevents these move:
  const DampMoves = [P.Moves.SelfDestruct, P.Moves.Explosion, P.Moves.MindBlown, P.Moves.MistyExplosion];

  return {
    name: "Damp",
    description:
      "The Pokémon dampens its surroundings, preventing all Pokémon from using explosive moves such as Self-Destruct. ",
    slot: "ability",

    apply: ({ self }) => {
      function dampSelfDestruct(action: Action<T>) {
        const { source } = action.params;
        if (!(source instanceof MoveEntry)) return;
        // despite the general description, Damp specifically prevents these move:
        if (!DampMoves.includes(source.effects)) return;

        action.cancel = true;
      }

      function applyDampToBattle(battle: Battle<T>) {
        battle.on("action", dampSelfDestruct);
        self.once("exitBattle", () => battle.off("action", dampSelfDestruct));
      }

      // TODO prevent Aftermath

      return {
        name: Damp.name,
        activate: () => self.on("enterBattle", applyDampToBattle),
        deactivate: () => self.off("enterBattle", applyDampToBattle),
        expiry: permanent,
      };
    },
  };
});
