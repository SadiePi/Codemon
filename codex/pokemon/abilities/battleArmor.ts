import { Ability, Effects, permanent, proxy, TraditionalBBP as T } from "../mod.ts";

export const BattleArmor: Ability = {
  name: "Battle Armor",
  description: "Hard armor protects the Pokémon from critical hits. ",
  slot: "ability",

  apply: ({ self }) => {
    function cancelCriticalHits(effect: Effects<T>) {
      if (!effect.attack) return;

      effect.attack = proxy(effect.attack, result => {
        if (result) result.criticalHit = undefined;
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
