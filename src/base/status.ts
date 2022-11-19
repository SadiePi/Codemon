// deno-lint-ignore-file no-unused-vars
import { TraditionalBattle } from "./battle.ts";
import { StatusEffect, Codemon } from "./index.ts";

// Non-volatile status effects

export const Burn: StatusEffect<TraditionalBattle> = {
  name: "Burn",
  description: "The target is burned. Take 1/16 of max HP as damage at the end of each turn. Attack is halved.",
  volatile: false,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Freeze: StatusEffect<TraditionalBattle> = {
  name: "Freeze",
  description: "The target is frozen.",
  volatile: false,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Paralysis: StatusEffect<TraditionalBattle> = {
  name: "Paralysis",
  description: "The target is unable to move.",
  volatile: false,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Poison: StatusEffect<TraditionalBattle> = {
  name: "Poison",
  description: "The target is poisoned.",
  volatile: false,
  apply: (target, source, battle) => {
    battle.on("afterAction", a => {
      if (a.actor === target) {
        target.stats.hp.current -= (target.stats.hp.value() * 1) / 8;
      }
    });
  },
  unapply: (target, source, battle) => {},
};

export const BadlyPoisoned: StatusEffect<TraditionalBattle> = {
  name: "Badly Poisoned",
  description: "The target is badly poisoned.",
  volatile: false,
  apply: (target, source, battle) => {
    battle.on("afterAction", a => {
      if (a.actor === target) {
        target.stats.hp.current -= (target.stats.hp.value() * 1) / 16;
      }
    });
  },
  unapply: (target, source, battle) => {},
};

export const Sleep: StatusEffect<TraditionalBattle> = {
  name: "Sleep",
  description: "The target falls asleep.",
  volatile: false,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

// Volatile status effects

export const Bound: StatusEffect<TraditionalBattle> = {
  name: "Bound",
  description: "The target is bound.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const CantEscape: StatusEffect<TraditionalBattle> = {
  name: "Can't Escape",
  description: "The target is unable to escape.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Confusion: StatusEffect<TraditionalBattle> = {
  name: "Confusion",
  description: "The target is confused.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Curse: StatusEffect<TraditionalBattle> = {
  name: "Curse",
  description: "The target is cursed.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Drowsy: StatusEffect<TraditionalBattle> = {
  name: "Drowsy",
  description: "The target is drowsy.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Embargo: StatusEffect<TraditionalBattle> = {
  name: "Embargo",
  description: "The target is unable to use items.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Encore: StatusEffect<TraditionalBattle> = {
  name: "Encore",
  description: "The target is encored.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Flinch: StatusEffect<TraditionalBattle> = {
  name: "Flinch",
  description: "The target flinches.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const HealBlock: StatusEffect<TraditionalBattle> = {
  name: "Heal Block",
  description: "The target is unable to heal.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Identified: StatusEffect<TraditionalBattle> = {
  name: "Identified",
  description: "The target is identified.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Infatuation: StatusEffect<TraditionalBattle> = {
  name: "Infatuation",
  description: "The target is infatuated.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const LeechSeed: StatusEffect<TraditionalBattle> = {
  name: "Leech Seed",
  description: "The target's hp is leeched by the attacker.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Nightmare: StatusEffect<TraditionalBattle> = {
  name: "Nightmare",
  description: "The target is in a nightmare.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const PerishSong: StatusEffect<TraditionalBattle> = {
  name: "Perish Song",
  description: "The target is about to perish.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Taunt: StatusEffect<TraditionalBattle> = {
  name: "Taunt",
  description: "The target is taunted.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Telekinesis: StatusEffect<TraditionalBattle> = {
  name: "Telekinesis",
  description: "The target is telekinetic.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Torment: StatusEffect<TraditionalBattle> = {
  name: "Torment",
  description: "The target is tormented.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const TypeChange: StatusEffect<TraditionalBattle> = {
  name: "Type Change",
  description: "The target's type is changed.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Splinters: StatusEffect<TraditionalBattle> = {
  name: "Splinters",
  description: "The target is splintered.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const PowerBoost: StatusEffect<TraditionalBattle> = {
  name: "Power Boost",
  description: "The target's power is boosted.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const PowerDrop: StatusEffect<TraditionalBattle> = {
  name: "Power Drop",
  description: "The target's power is dropped.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const GuardBoost: StatusEffect<TraditionalBattle> = {
  name: "Guard Boost",
  description: "The target's guard is boosted.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const GuardDrop: StatusEffect<TraditionalBattle> = {
  name: "Guard Drop",
  description: "The target's guard is dropped.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

// Volatile battle status

export const AquaRing: StatusEffect<TraditionalBattle> = {
  name: "Aqua Ring",
  description: "The target is protected by an aqua ring.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Bracing: StatusEffect<TraditionalBattle> = {
  name: "Bracing",
  description: "The target is bracing.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const ChargingTurn: StatusEffect<TraditionalBattle> = {
  name: "Charging Turn",
  description: "The target is charging a turn.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const CenterOfAttention: StatusEffect<TraditionalBattle> = {
  name: "Center Of Attention",
  description: "The target is focused on the center of the field.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const DefenseCurl: StatusEffect<TraditionalBattle> = {
  name: "Defense Curl",
  description: "The target is curling its defense.",
  volatile: true,
  apply: (target, source, battle) => {},

  unapply: (target, source, battle) => {},
};

export const Rooting: StatusEffect<TraditionalBattle> = {
  name: "Rooting",
  description: "The target is rooted.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const MagicCoat: StatusEffect<TraditionalBattle> = {
  name: "Magic Coat",
  description: "The target is protected by a magic coat.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const MagneticLevitation: StatusEffect<TraditionalBattle> = {
  name: "Magnetic Levitation",
  description: "The target is levitating with magnetic force.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Mimic: StatusEffect<TraditionalBattle> = {
  name: "Mimic",
  description: "The target is mimicking an opponent.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Minimize: StatusEffect<TraditionalBattle> = {
  name: "Minimize",
  description: "The target is minimized.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Protection: StatusEffect<TraditionalBattle> = {
  name: "Protection",
  description: "The target is protected.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Recharging: StatusEffect<TraditionalBattle> = {
  name: "Recharging",
  description: "The target is recharging.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const SemiInvulnerableTurn: StatusEffect<TraditionalBattle> = {
  name: "Semi-Invulnerable Turn",
  description: "The target is semi-invulnerable for a turn.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Substitute: StatusEffect<TraditionalBattle> = {
  name: "Substitute",
  description: "The target is protected by a substitute.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const TakingAim: StatusEffect<TraditionalBattle> = {
  name: "Taking Aim",
  description: "The target is taking aim.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Thrashing: StatusEffect<TraditionalBattle> = {
  name: "Thrashing",
  description: "The target is thrashing.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};

export const Transformed: StatusEffect<TraditionalBattle> = {
  name: "Transformed",
  description: "The target is transformed.",
  volatile: true,
  apply: (target, source, battle) => {},
  unapply: (target, source, battle) => {},
};
