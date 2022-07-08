import { MoveInfo, TC } from "./index.ts";
import Types from "./types.ts";

export const Tackle: MoveInfo = {
  name: "Tackle",
  description: "A physical attack in which the user charges and slams into the target with its whole body.",
  type: Types.Normal,
  damageCategory: "Physical",
  basePP: 35, // max 56
  basePower: 40,
  baseAccuracy: 100,
  targetingCategory: TC.Adjacent | TC.Foe,
  makesContact: true,
};

export const Growl: MoveInfo = {
  name: "Growl",
  description:
    "The user growls in an endearing way, making opposing Pokémon less wary. This lowers their Attack stats.",
  type: Types.Normal,
  damageCategory: "Status",
  basePP: 40, // max 64
  basePower: 0,
  baseAccuracy: 100,
  targetingCategory: TC.All | TC.Adjacent | TC.Foe,
  makesContact: false,
  stageMods: {
    attack: -1,
  },
  // TODO functionality
};

export const VineWhip: MoveInfo = {
  name: "Vine Whip",
  description: "The target is struck with slender, whiplike vines to inflict damage.",
  type: Types.Grass,
  damageCategory: "Physical",
  basePP: 25, // max 40
  basePower: 45,
  baseAccuracy: 100,
  targetingCategory: TC.Adjacent,
  makesContact: true,
};

export const Growth: MoveInfo = {
  name: "Growth",
  description: "The user's body grows all at once, raising the Attack and Sp. Atk stats.",
  type: Types.Normal,
  damageCategory: "Status",
  basePP: 20, // max 32
  basePower: 0,
  baseAccuracy: 100,
  targetingCategory: TC.Self,
  makesContact: false,
  stageMods: {
    attack: 1,
    specialAttack: 1,
  },
};

export const LeechSeed: MoveInfo = {
  name: "Leech Seed",
  description: "A seed is planted on the target. It steals some HP from the target every turn.",
  type: Types.Grass,
  damageCategory: "Status",
  basePP: 10, // max 16
  basePower: 0,
  baseAccuracy: 90,
  targetingCategory: TC.Adjacent,
  makesContact: false,
  // TODO functionality
};

export const RazorLeaf: MoveInfo = {
  name: "Razor Leaf",
  description: "Sharp-edged leaves are launched to slash at opposing Pokémon. Critical hits land more easily.",
  type: Types.Grass,
  damageCategory: "Physical",
  basePP: 25, // max 40
  basePower: 55,
  baseAccuracy: 95,
  targetingCategory: TC.Adjacent | TC.Foe,
  makesContact: false,
  criticalHitStage: 1,
};

export const PoisonPowder: MoveInfo = {
  name: "Poison Powder",
  description: "The user scatters a cloud of poisonous dust that poisons the target.",
  type: Types.Poison,
  damageCategory: "Status",
  basePP: 35, // max 56
  basePower: 0,
  baseAccuracy: 75,
  targetingCategory: TC.Adjacent,
  makesContact: false,
  // TODO functionality
};

export const SleepPowder: MoveInfo = {
  name: "Sleep Powder",
  description: "The user scatters a big cloud of sleep-inducing dust around the target.",
  type: Types.Grass,
  damageCategory: "Status",
  basePP: 15, // max 24
  basePower: 0,
  baseAccuracy: 75,
  targetingCategory: TC.Adjacent,
  makesContact: false,
  // TODO functionality
};

export const SeedBomb: MoveInfo = {
  name: "Seed Bomb",
  description: "The user slams a barrage of hard-shelled seeds down on the target from above.",
  type: Types.Grass,
  damageCategory: "Physical",
  basePP: 15, // max 24
  basePower: 80,
  baseAccuracy: 100,
  targetingCategory: TC.Adjacent,
  makesContact: false,
};

export const TakeDown: MoveInfo = {
  name: "Take Down",
  description: "A reckless, full-body charge attack for slamming into the target. This also damages the user a little.",
  type: Types.Normal,
  damageCategory: "Physical",
  basePP: 20, // max 32
  basePower: 90,
  baseAccuracy: 85,
  targetingCategory: TC.Adjacent,
  makesContact: true,
  recoilFactor: 1 / 4,
};

export const SweetScent: MoveInfo = {
  name: "Sweet Scent",
  description: "A sweet scent that harshly lowers opposing Pokémon's evasiveness.",
  type: Types.Normal,
  damageCategory: "Status",
  basePP: 20, // max 32
  basePower: 0,
  baseAccuracy: 100,
  targetingCategory: TC.Adjacent | TC.Foe,
  makesContact: false,
  stageMods: {
    evasion: -2,
  },
};

export const Synthesis: MoveInfo = {
  name: "Synthesis",
  description: "The user restores its own HP. The amount of HP regained varies with the weather.",
  type: Types.Grass,
  damageCategory: "Status",
  basePP: 5, // max 8
  basePower: 0,
  baseAccuracy: 100,
  targetingCategory: TC.Self,
  makesContact: false,
  // TODO functionality
};

export const WorrySeed: MoveInfo = {
  name: "Worry Seed",
  description:
    "A seed that causes worry is planted on the target. It prevents sleep by making the target's Ability Insomnia.",
  type: Types.Grass,
  damageCategory: "Status",
  basePP: 10, // max 16
  basePower: 0,
  priority: 0,
  baseAccuracy: 100,
  targetingCategory: TC.Adjacent,
  makesContact: false,
  // TODO functionality
};

export const DoubleEdge: MoveInfo = {
  name: "Double-Edge",
  description:
    "A reckless, life-risking tackle in which the user rushes the target. This also damages the user quite a lot.",
  type: Types.Normal,
  damageCategory: "Physical",
  basePP: 15, // max 24
  basePower: 120,
  baseAccuracy: 100,
  targetingCategory: TC.Adjacent,
  makesContact: true,
  recoilFactor: 1 / 4,
};

export const SolarBeam: MoveInfo = {
  name: "Solar Beam",
  description: "In this two-turn attack, the user gathers light, then blasts a bundled beam on the next turn.",
  type: Types.Grass,
  damageCategory: "Special",
  basePP: 10, // max 16
  basePower: 120,
  baseAccuracy: 100,
  targetingCategory: TC.Adjacent,
  makesContact: false,
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
