import loader from "../loader.ts";
import { Effects, MoveEntry, TargetContext, Terrain, proxy, roundDuration, TraditionalBBP as T } from "../mod.ts";

export const Misty: Terrain = loader.register(P => ({
  name: "Misty",
  description:
    "For five turns, protects Pokémon on the ground from status conditions and halves damage from Dragon-type moves.",
  slot: "terrain",

  apply: ({ battle }) => {
    function halveDragonDamage(effect: Effects<T>, { source }: TargetContext<T>) {
      if (!(source instanceof MoveEntry)) return;
      if (source.effects.type !== P.Types.Dragon) return;
      if (!effect.attack) return;

      effect.attack = proxy(effect.attack, result => {
        if (!result) return;
        if (!result.conditions) result.conditions = {};
        result.conditions.terrain = 1 / 2;
      });
    }

    // TODO prevent status conditions

    return {
      name: Misty.name,
      activate: () => battle.on("effect", halveDragonDamage),
      deactivate: () => battle.off("effect", halveDragonDamage),
      expiry: roundDuration(5, battle), // TODO extend to 8 if user is holding Terrain Extender
    };
  },
}));
