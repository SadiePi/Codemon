import P, { Ability, Effects, MoveEntry, TargetContext, TraditionalBBP as T, permanent, proxy } from "../mod.ts";

export const Aerilate: Ability = {
  name: "Aerilate",
  description: "Normal-type moves become Flying-type moves.",
  slot: "ability",

  apply: ({ self }) => {
    function normalMoveToFlying(effect: Effects<T>, { source }: TargetContext<T>) {
      if (!effect.attack) return;
      if (!(source instanceof MoveEntry)) return;
      if (source.user !== self) return;

      effect.attack = proxy(effect.attack, result => {
        if (result && result.type === P.Types.Normal) result.type = P.Types.Flying;
      });
    }

    return {
      name: Aerilate.name,
      activate: () => self.on("inflictEffects", normalMoveToFlying),
      deactivate: () => self.off("inflictEffects", normalMoveToFlying),
      expiry: permanent,
    };
  },
};
