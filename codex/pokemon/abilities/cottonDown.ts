import {
  Ability,
  MoveEntry,
  TraditionalBBP as T,
  TargetContext,
  TargetEffects,
  effectAction,
  permanent,
} from "../mod.ts";

export const CottonDown: Ability = {
  name: "Cotton Down",
  description:
    "When the Pokémon is hit by an attack, it scatters cotton fluff around and lowers the Speed stats of all Pokémon except itself.",
  slot: "ability",

  apply: ({ self }) => {
    function applySpeedNerfToOthersOnHit(_effect: TargetEffects<T>, { source, action, battle }: TargetContext<T>) {
      if (!(source instanceof MoveEntry)) return;
      if (source.effects.category !== "Physical") return;

      action.reactions.add(
        effectAction({
          battle: battle,
          targets: battle.getCombatants().filter(c => c !== self),
          user: self,
          effect: { stages: { speed: -1 } },
        })
      );
    }

    return {
      name: "Cotton Down",
      activate: () => self.on("receiveEffects", applySpeedNerfToOthersOnHit),
      deactivate: () => self.off("receiveEffects", applySpeedNerfToOthersOnHit),
      expiry: permanent,
    };
  },
};
