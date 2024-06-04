import { Ability, Effects, MoveEntry, TraditionalBBP as T, TargetContext, permanent, proxy, config } from "./mod.ts";
import loader from "./loader.ts";

export const Acceleration: Ability = {
  name: "Acceleration",
  description: "Boosts the power of priority moves by 1.5x",
  slot: "ability",
  apply: ({ self }) => {
    function boostPriorityPower(effect: Effects<T>, { source }: TargetContext<T>) {
      if (!(source instanceof MoveEntry)) return;
      if ((source.priority ?? 0) <= 0) return;
      if (!effect.attack) return;

      effect.attack = proxy(effect.attack, attack => {
        if (attack) attack.power *= 1.5;
      });
    }

    return {
      name: Acceleration.name,
      activate: () => self.on("inflictEffects", boostPriorityPower),
      deactivate: () => self.off("inflictEffects", boostPriorityPower),
      expiry: permanent,
    };
  },
};

export const Atomizate: Ability = loader.register(U => ({
  name: "Atomizate",
  description: "Normal-type moves become Nuclear-type moves and receive a 1.3x boost to base power",
  slot: "ability",
  apply: ({ self }) => {
    function atomizateAndEmpowerNormalMoves(effect: Effects<T>, { source, target }: TargetContext<T>) {
      if (!(source instanceof MoveEntry)) return;
      if (source.effects.type !== U.Types.Normal) return;
      if (!effect.attack) return;

      effect.attack = proxy(effect.attack, attack => {
        if (!attack) return;
        attack.type = U.Types.Fairy;
        attack.power *= 1.3;
        attack.stab = target.getSpecies().types.includes(attack.type) ? config.moves.stabMultiplier : 1;
      });
    }

    return {
      name: Atomizate.name,
      activate: () => self.on("inflictEffects", atomizateAndEmpowerNormalMoves),
      deactivate: () => self.off("inflictEffects", atomizateAndEmpowerNormalMoves),
      expiry: permanent,
    };
  },
}));

export const BloodLust = {} as Ability;
export const Chernobyl = {} as Ability;
export const DeepFreeze = {} as Ability;
export const Disenchant = {} as Ability;
export const Elementalist = {} as Ability;
export const Energizate = {} as Ability;
export const GeigerSense = {} as Ability;
export const Infatuate = {} as Ability;
export const Lazy = {} as Ability;
export const LeadSkin = {} as Ability;
export const Petrify = {} as Ability;
export const QuickCharge = {} as Ability;
export const Rebuild = {} as Ability;
export const SharpCoral = {} as Ability;
export const SoundBoost = {} as Ability;
export const Stormbringer = {} as Ability;
