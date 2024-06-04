import { Ability, Effects, MoveEntry, TraditionalBBP as T, TargetContext, permanent, proxy } from "./mod.ts";

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

export const Atomize = {} as Ability;
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
