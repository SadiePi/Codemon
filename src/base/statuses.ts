// deno-lint-ignore-file no-unused-vars
import C, {
  ReadyAction,
  ActionSource,
  ActionTarget,
  MoveEntry,
  RoundReciept,
  StatusEffect,
  Codemon,
  Action,
  ActionEffects,
  PreliminaryRoundReciept,
} from "./index.ts";

// Non-volatile status effects

export const Burn: StatusEffect = {
  name: "Burn",
  description:
    "This Codemon is burned by searing heat! Take 1/16 of max HP as damage after each turn. Attack damage is halved.",
  volatile: false,

  apply: (target, source, battle) => {
    if (!(target instanceof Codemon)) throw new Error("Burn can only be applied to Codemon");
    if (target.species.types.includes(C.Types.Fire)) return; // immune

    // halve attack damage, damage after action
    let attackedThisRound = false; // TODO: this probably doesn't work. test it
    const halveDamageAndBurnIfAttack = (effect: ActionEffects, _target: ActionTarget, action: Action) => {
      if (!(action.source instanceof MoveEntry)) return;
      if (action.source.user !== target) return;
      if (!effect.attack) return;

      attackedThisRound = true;
      if (effect.attack.other) effect.attack.other *= 0.5;
      else effect.attack.other = 0.5;

      const user = action.source.user;
      action.messages.push(`${user.name} is weakened by ${user.gender.pronouns.possessive} burn!`);
      action.reactions.push({
        source: BurnDamage,
        targets: [user],
      });
    };
    const burnIfDidntAttack = (reciept: PreliminaryRoundReciept) => {
      if (!attackedThisRound) {
        reciept.reactions.push({
          source: BurnDamage,
          targets: [target],
        });
        attackedThisRound = false;
      }
    };

    battle.on("beforeEffectReciept", halveDamageAndBurnIfAttack);
    battle.on("roundEnd", burnIfDidntAttack);

    return () => {
      battle.off("beforeEffectReciept", halveDamageAndBurnIfAttack);
      battle.off("roundEnd", burnIfDidntAttack);
    };
  },
};

const BurnDamage: ActionSource = {
  targetingCategory: "Self",
  useAction: (targets, battle): Action => {
    if (targets.length !== 1) throw new Error("BurnDamage can only target one Codemon");
    const target = targets[0];
    if (!(target instanceof Codemon)) return new Action({}, BurnDamage, targets, battle);
    const damage = Math.floor(target.stats.hp.max / 16);
    const action = new Action(
      {
        hp: -damage,
      },
      BurnDamage,
      targets,
      battle
    );
    action.messages.push(`${target.name} took ${damage} damage from ${target.gender.pronouns.possessive} burn!`);
    return action;
  },
};

export const Freeze: StatusEffect = {
  name: "Freeze",
  description: "The target is frozen.",
  volatile: false,
  apply: (target, source, battle) => {},
};

export const Paralysis: StatusEffect = {
  name: "Paralysis",
  description: "The target is unable to move.",
  volatile: false,
  apply: (target, source, battle) => {},
};

export const Poison: StatusEffect = {
  name: "Poison",
  description: "The target is poisoned.",
  volatile: false,
  apply: (target, source, battle) => {},
};

export const BadlyPoisoned: StatusEffect = {
  name: "Badly Poisoned",
  description: "The target is badly poisoned.",
  volatile: false,
  apply: (target, source, battle) => {},
};

export const Sleep: StatusEffect = {
  name: "Sleep",
  description: "The target falls asleep.",
  volatile: false,
  apply: (target, source, battle) => {},
};

// Volatile status effects

export const Bound: StatusEffect = {
  name: "Bound",
  description: "The target is bound.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const CantEscape: StatusEffect = {
  name: "Can't Escape",
  description: "The target is unable to escape.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Confusion: StatusEffect = {
  name: "Confusion",
  description: "The target is confused.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Curse: StatusEffect = {
  name: "Curse",
  description: "The target is cursed.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Drowsy: StatusEffect = {
  name: "Drowsy",
  description: "The target is drowsy.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Embargo: StatusEffect = {
  name: "Embargo",
  description: "The target is unable to use items.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Encore: StatusEffect = {
  name: "Encore",
  description: "The target is encored.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Flinch: StatusEffect = {
  name: "Flinch",
  description: "The target flinches.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const HealBlock: StatusEffect = {
  name: "Heal Block",
  description: "The target is unable to heal.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Identified: StatusEffect = {
  name: "Identified",
  description: "The target is identified.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Infatuation: StatusEffect = {
  name: "Infatuation",
  description: "The target is infatuated.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const LeechSeed: StatusEffect = {
  name: "Leech Seed",
  description: "The target's hp is leeched by the attacker.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Nightmare: StatusEffect = {
  name: "Nightmare",
  description: "The target is in a nightmare.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const PerishSong: StatusEffect = {
  name: "Perish Song",
  description: "The target is about to perish.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Taunt: StatusEffect = {
  name: "Taunt",
  description: "The target is taunted.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Telekinesis: StatusEffect = {
  name: "Telekinesis",
  description: "The target is telekinetic.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Torment: StatusEffect = {
  name: "Torment",
  description: "The target is tormented.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const TypeChange: StatusEffect = {
  name: "Type Change",
  description: "The target's type is changed.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Splinters: StatusEffect = {
  name: "Splinters",
  description: "The target is splintered.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const PowerBoost: StatusEffect = {
  name: "Power Boost",
  description: "The target's power is boosted.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const PowerDrop: StatusEffect = {
  name: "Power Drop",
  description: "The target's power is dropped.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const GuardBoost: StatusEffect = {
  name: "Guard Boost",
  description: "The target's guard is boosted.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const GuardDrop: StatusEffect = {
  name: "Guard Drop",
  description: "The target's guard is dropped.",
  volatile: true,
  apply: (target, source, battle) => {},
};

// Volatile battle status

export const AquaRing: StatusEffect = {
  name: "Aqua Ring",
  description: "The target is protected by an aqua ring.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Bracing: StatusEffect = {
  name: "Bracing",
  description: "The target is bracing.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const ChargingTurn: StatusEffect = {
  name: "Charging Turn",
  description: "The target is charging a turn.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const CenterOfAttention: StatusEffect = {
  name: "Center Of Attention",
  description: "The target is focused on the center of the field.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const DefenseCurl: StatusEffect = {
  name: "Defense Curl",
  description: "The target is curling its defense.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Rooting: StatusEffect = {
  name: "Rooting",
  description: "The target is rooted.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const MagicCoat: StatusEffect = {
  name: "Magic Coat",
  description: "The target is protected by a magic coat.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const MagneticLevitation: StatusEffect = {
  name: "Magnetic Levitation",
  description: "The target is levitating with magnetic force.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Mimic: StatusEffect = {
  name: "Mimic",
  description: "The target is mimicking an opponent.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Minimize: StatusEffect = {
  name: "Minimize",
  description: "The target is minimized.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Protection: StatusEffect = {
  name: "Protection",
  description: "The target is protected.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Recharging: StatusEffect = {
  name: "Recharging",
  description: "The target is recharging.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const SemiInvulnerableTurn: StatusEffect = {
  name: "Semi-Invulnerable Turn",
  description: "The target is semi-invulnerable for a turn.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Substitute: StatusEffect = {
  name: "Substitute",
  description: "The target is protected by a substitute.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const TakingAim: StatusEffect = {
  name: "Taking Aim",
  description: "The target is taking aim.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Thrashing: StatusEffect = {
  name: "Thrashing",
  description: "The target is thrashing.",
  volatile: true,
  apply: (target, source, battle) => {},
};

export const Transformed: StatusEffect = {
  name: "Transformed",
  description: "The target is transformed.",
  volatile: true,
  apply: (target, source, battle) => {},
};
