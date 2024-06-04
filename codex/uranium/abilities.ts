import U, {
  Ability,
  Effects,
  MoveEntry,
  TraditionalBBP as T,
  TargetContext,
  permanent,
  proxy,
  config,
  effectAction,
  chance,
} from "./mod.ts";
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

export const DeepFreeze: Ability = {
  name: "Deep Freeze",
  description: "Contact with the Pokémon may freeze the attacker",
  slot: "ability",
  apply: ({ self }) => {
    function maybeFreezeOnContact(_: Effects<T>, { source, action, battle }: TargetContext<T>) {
      if (!(source instanceof MoveEntry)) return;
      if (!source.effects.makesContact) return;
      action.reactions.add(
        effectAction({
          battle,
          targets: [action.params.user],
          parent: action,
          user: self,
          effect: {
            status: chance(3 / 10, U.Statuses.Freeze),
          },
        })
      );
    }
    return {
      name: DeepFreeze.name,
      activate: () => self.on("receiveEffects", maybeFreezeOnContact),
      deactivate: () => self.off("receiveEffects", maybeFreezeOnContact),
      expiry: permanent,
    };
  },
};

export const Disenchant = {} as Ability;

export const Elementalist: Ability = loader.register(U => ({
  name: "Elementalist",
  description: "Powers up Fire, Electric, and Water-type moves",
  slot: "ability",
  apply: ({ self }) => {
    function boostElementalMoves(effect: Effects<T>, { source }: TargetContext<T>) {
      if (!(source instanceof MoveEntry)) return;
      if (!effect.attack) return;
      if (![U.Types.Fire, U.Types.Electric, U.Types.Water].includes(source.effects.type)) return;

      effect.attack = proxy(effect.attack, attack => {
        if (!attack) return;
        attack.stab = config.moves.stabMultiplier;
      });
    }

    return {
      name: Elementalist.name,
      activate: () => self.on("inflictEffects", boostElementalMoves),
      deactivate: () => self.off("inflictEffects", boostElementalMoves),
      expiry: permanent,
    };
  },
}));

export const Energizate: Ability = loader.register(U => ({
  name: "Energizate",
  description: "Normal-type moves become Electric-type moves and receive a 1.3x boost to base power",
  slot: "ability",
  apply: ({ self }) => {
    function energizateAndEmpowerNormalMoves(effect: Effects<T>, { source, target }: TargetContext<T>) {
      if (!(source instanceof MoveEntry)) return;
      if (source.effects.type !== U.Types.Normal) return;
      if (!effect.attack) return;

      effect.attack = proxy(effect.attack, attack => {
        if (!attack) return;
        attack.type = U.Types.Electric;
        attack.power *= 1.3;
        attack.stab = target.getSpecies().types.includes(attack.type) ? config.moves.stabMultiplier : 1;
      });
    }

    return {
      name: Energizate.name,
      activate: () => self.on("inflictEffects", energizateAndEmpowerNormalMoves),
      deactivate: () => self.off("inflictEffects", energizateAndEmpowerNormalMoves),
      expiry: permanent,
    };
  },
}));

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
