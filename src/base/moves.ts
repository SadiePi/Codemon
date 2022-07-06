import { MoveInfo, TC } from "./index.ts";
import Types from "./types.ts";

export const Tackle: MoveInfo = {
  name: "Tackle",
  type: Types.Normal,
  basePP: 35, // max 56
  basePower: 40,
  priority: 0,
  description: "A physical attack in which the user charges and slams into the target with its whole body.",
  baseAccuracy: 100,
  makesContact: true,
  criticalHitStage: 0,
  damageCategory: "Physical",
  targetingCategory: TC.Adjacent | TC.Foe,
};

export const Growl: MoveInfo = {
  name: "Growl",
  type: Types.Normal,
  basePP: 40, // max 64
  basePower: 0,
  priority: 0,
  stageMods: {
    attack: -1,
  },
  description:
    "The user growls in an endearing way, making opposing Pokémon less wary. This lowers their Attack stats.",
  baseAccuracy: 100,
  makesContact: false,
  criticalHitStage: 0,
  damageCategory: "Status",
  targetingCategory: TC.All | TC.Adjacent | TC.Foe,
  // TODO functionality
};

export const VineWhip: MoveInfo = {
  name: "Vine Whip",
  type: Types.Grass,
  basePP: 25, // max 40
  basePower: 45,
  priority: 0,
  description: "The target is struck with slender, whiplike vines to inflict damage.",
  baseAccuracy: 100,
  makesContact: true,
  criticalHitStage: 0,
  damageCategory: "Physical",
  targetingCategory: TC.Adjacent,
};

export const Growth: MoveInfo = {
  name: "Growth",
  type: Types.Normal,
  basePP: 20, // max 32
  basePower: 0,
  priority: 0,
  stageMods: {
    attack: 1,
    specialAttack: 1,
  },
  description: "The user's body grows all at once, raising the Attack and Sp. Atk stats.",
  baseAccuracy: 100,
  makesContact: false,
  criticalHitStage: 0,
  damageCategory: "Status",
  targetingCategory: TC.Self,
};

export const LeechSeed: MoveInfo = {
  name: "Leech Seed",
  type: Types.Grass,
  basePP: 10, // max 16
  basePower: 0,
  priority: 0,
  description: "A seed is planted on the target. It steals some HP from the target every turn.",
  baseAccuracy: 90,
  makesContact: false,
  criticalHitStage: 0,
  damageCategory: "Status",
  targetingCategory: TC.Adjacent,
  // TODO functionality
};

export const RazorLeaf: MoveInfo = {
  name: "Razor Leaf",
  type: Types.Grass,
  basePP: 25, // max 40
  basePower: 55,
  priority: 0,
  description: "Sharp-edged leaves are launched to slash at opposing Pokémon. Critical hits land more easily.",
  baseAccuracy: 95,
  makesContact: false,
  criticalHitStage: 1,
  damageCategory: "Physical",
  targetingCategory: TC.Adjacent | TC.Foe,
};

export const PoisonPowder: MoveInfo = {
  name: "Poison Powder",
  type: Types.Poison,
  basePP: 35, // max 56
  basePower: 0,
  priority: 0,
  description: "The user scatters a cloud of poisonous dust that poisons the target.",
  baseAccuracy: 75,
  makesContact: false,
  criticalHitStage: 0,
  damageCategory: "Status",
  targetingCategory: TC.Adjacent,
  // TODO functionality
};

export const SleepPowder: MoveInfo = {
  name: "Sleep Powder",
  type: Types.Grass,
  basePP: 15, // max 24
  basePower: 0,
  priority: 0,
  description: "The user scatters a big cloud of sleep-inducing dust around the target.",
  baseAccuracy: 75,
  makesContact: false,
  criticalHitStage: 0,
  damageCategory: "Status",
  targetingCategory: TC.Adjacent,
  // TODO functionality
};

export const SeedBomb: MoveInfo = {
  name: "Seed Bomb",
  type: Types.Grass,
  basePP: 15, // max 24
  basePower: 80,
  priority: 0,
  description: "The user slams a barrage of hard-shelled seeds down on the target from above.",
  baseAccuracy: 100,
  makesContact: false,
  criticalHitStage: 0,
  damageCategory: "Physical",
  targetingCategory: TC.Adjacent,
};

export const TakeDown: MoveInfo = {
  name: "Take Down",
  type: Types.Normal,
  basePP: 20, // max 32
  basePower: 90,
  priority: 0,
  description: "A reckless, full-body charge attack for slamming into the target. This also damages the user a little.",
  baseAccuracy: 85,
  makesContact: true,
  criticalHitStage: 0,
  damageCategory: "Physical",
  targetingCategory: TC.Adjacent,
  // TODO recoil
};

export const SweetScent: MoveInfo = {
  name: "Sweet Scent",
  type: Types.Normal,
  basePP: 20, // max 32
  basePower: 0,
  priority: 0,
  stageMods: {
    evasion: -2,
  },
  description: "A sweet scent that harshly lowers opposing Pokémon's evasiveness.",
  baseAccuracy: 100,
  makesContact: false,
  criticalHitStage: 0,
  damageCategory: "Status",
  targetingCategory: TC.Adjacent | TC.Foe,
};

export const Synthesis: MoveInfo = {
  name: "Synthesis",
  type: Types.Grass,
  basePP: 5, // max 8
  basePower: 0,
  priority: 0,
  description: "The user restores its own HP. The amount of HP regained varies with the weather.",
  baseAccuracy: 100,
  makesContact: false,
  criticalHitStage: 0,
  damageCategory: "Status",
  targetingCategory: TC.Self,
  // TODO functionality
};

export const WorrySeed: MoveInfo = {
  name: "Worry Seed",
  type: Types.Grass,
  basePP: 10, // max 16
  basePower: 0,
  priority: 0,
  description:
    "A seed that causes worry is planted on the target. It prevents sleep by making the target's Ability Insomnia.",
  baseAccuracy: 100,
  makesContact: false,
  criticalHitStage: 0,
  damageCategory: "Status",
  targetingCategory: TC.Adjacent,
  // TODO functionality
};

export const DoubleEdge: MoveInfo = {
  name: "Double-Edge",
  type: Types.Normal,
  basePP: 15, // max 24
  basePower: 120,
  priority: 0,
  description:
    "A reckless, life-risking tackle in which the user rushes the target. This also damages the user quite a lot.",
  baseAccuracy: 100,
  makesContact: true,
  criticalHitStage: 0,
  damageCategory: "Physical",
  targetingCategory: TC.Adjacent,
  // TODO recoil
};

export const SolarBeam: MoveInfo = {
  name: "Solar Beam",
  type: Types.Grass,
  basePP: 10, // max 16
  basePower: 120,
  priority: 0,
  description: "In this two-turn attack, the user gathers light, then blasts a bundled beam on the next turn.",
  baseAccuracy: 100,
  makesContact: false,
  criticalHitStage: 0,
  damageCategory: "Special",
  targetingCategory: TC.Adjacent,
  // TODO functionality
};

export default {
  Tackle,
  Growl,
  VineWhip,
  Growth,
  LeechSeed,
  RazorLeaf,
  PoisonPowder,
  SleepPowder,
  SeedBomb,
  TakeDown,
  SweetScent,
  Synthesis,
  WorrySeed,
  DoubleEdge,
  SolarBeam,
};
