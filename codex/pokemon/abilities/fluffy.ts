import loader from "../loader.ts";
import { Ability, Effects, TargetContext, permanent, TraditionalBBP as T, MoveEntry, proxy } from "../mod.ts";

export const Fluffy: Ability = loader.register(P => ({
  name: "Fluffy",
  description: "Halves the damage taken from moves that make direct contact, but doubles that of Fire-type moves.",
  slot: "ability",

  apply: ({ self }) => {
    function halveContactDamageAndDoubleFireDamage(effect: Effects<T>, { source }: TargetContext<T>) {
      if (!effect.attack) return;
      if (!(source instanceof MoveEntry)) return;
      if (source.effects.type === P.Types.Fire) {
        effect.attack = proxy(effect.attack, result => {
          if (!result) return;
          result.power *= 2;
        });
      } else if (source.effects.makesContact) {
        effect.attack = proxy(effect.attack, result => {
          if (!result) return;
          result.power *= 0.5;
        });
      }
    }

    return {
      name: Fluffy.name,
      activate: () => self.on("receiveEffects", halveContactDamageAndDoubleFireDamage),
      deactivate: () => self.off("receiveEffects", halveContactDamageAndDoubleFireDamage),
      expiry: permanent,
    };
  },
}));
