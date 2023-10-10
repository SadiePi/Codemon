import { Ability, Effects, permanent, proxy, TraditionalBBP as T, TargetContext } from "../mod.ts";

export const BattleArmor: Ability = {
  name: "Battle Armor",
  description: "Hard armor protects the Pokémon from critical hits. ",
  slot: "ability",

  apply: ({ self }) => {
    function cancelCriticalHits(effect: Effects<T>, context: TargetContext<T>) {
      if (context.target !== self) return;
      if (!effect.attack) return;

      effect.attack = proxy(effect.attack, result => {
        if (result) result.critical = undefined;
      });
    }

    return {
      name: BattleArmor.name,
      activate: () => self.on("receiveEffects", cancelCriticalHits),
      deactivate: () => self.off("receiveEffects", cancelCriticalHits),
      expiry: permanent,
    };
  },
};
