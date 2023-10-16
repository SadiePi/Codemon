import loader from "../loader.ts";
import { Ability, Effects, MoveEntry, TargetContext, permanent, TraditionalBBP as T, proxy } from "../mod.ts";

export const Electromorphosis: Ability = loader.register(P => ({
  name: "Electromorphosis",
  description:
    "The Pokémon becomes charged when it takes damage, boosting the power of the next Electric-type move the Pokémon uses.",
  slot: "ability",

  apply: ({ self }) => {
    let charged = false;

    function chargeOnHit(_effect: Effects<T>, { source }: TargetContext<T>) {
      if (!(source instanceof MoveEntry)) return;

      charged = true;
    }

    function boostElectricWhenCharged(effect: Effects<T>, { source }: TargetContext<T>) {
      if (!charged) return;
      if (!(source instanceof MoveEntry)) return;
      if (source.effects.type !== P.Types.Electric) return;
      if (!effect.attack) return;

      effect.attack = proxy(effect.attack, result => {
        if (!result) return;
        result.power *= 2;
      });
      charged = false;
    }

    return {
      name: Electromorphosis.name,
      activate: () => {
        self.on("receiveEffects", chargeOnHit);
        self.on("inflictEffects", boostElectricWhenCharged);
      },
      deactivate: () => {
        self.off("receiveEffects", chargeOnHit);
        self.off("inflictEffects", boostElectricWhenCharged);
      },
      expiry: permanent,
    };
  },
}));
