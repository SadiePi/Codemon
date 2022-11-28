import { Species } from "./index.ts";
import * as Moves from "./moves.ts";
import * as Types from "./types.ts";
import * as Experience from "./experience.ts";

export const Bulbasaur: Species = {
  name: "Bulbasaur",
  types: [Types.Grass, Types.Poison],
  sexRatio: 1 / 8,
  catchRate: 45,
  eggCycles: 21, // 5397 / 257
  height: 0.7,
  weight: 6.9,
  baseExperienceYield: 64,
  experienceGroup: Experience.MedSlow,
  baseFriendship: 70,
  baseStats: {
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45,
  },
  evYields: { specialAttack: 1 },
  learnset: {
    1: [Moves.Tackle, Moves.Growl],
    3: [Moves.VineWhip],
    6: [Moves.Growth],
    9: [Moves.LeechSeed],
    12: [Moves.RazorLeaf],
    15: [Moves.PoisonPowder, Moves.SleepPowder],
    18: [Moves.SeedBomb],
    21: [Moves.TakeDown],
    24: [Moves.SweetScent],
    27: [Moves.Synthesis],
    30: [Moves.WorrySeed],
    33: [Moves.DoubleEdge],
    36: [Moves.SolarBeam],
  },
};
// ivysaur, venusaur, ...

export const Garchomp: Species = {
  name: "Garchomp",
  //graphics: Graphics,
  types: [Types.Dragon, Types.Ground],
  //normalAbility1: Ability,
  //normalAbility2: Ability,
  //specialAbility: Ability,
  sexRatio: 0.5,
  catchRate: 45,
  eggCycles: 120,
  height: 1.9,
  weight: 95.0,
  baseExperienceYield: 270,
  experienceGroup: Experience.Slow,
  //bodyStyle: BodyStyle,
  //footprint: Footprint,
  //typedexColor: TypedexColor,
  baseFriendship: 70,
  baseStats: {
    hp: 108,
    attack: 130,
    defense: 95,
    specialAttack: 80,
    specialDefense: 85,
    speed: 102,
  },
  evYields: {
    attack: 3,
  },
  learnset: {
    evolution: [Moves.Crunch],
    1: [Moves.Crunch, Moves.DualChop, Moves.SandTomb, Moves.Tackle, Moves.SandAttack, Moves.DragonBreath],
    18: [Moves.Bulldoze],
    27: [Moves.Bite],
    34: [Moves.Slash],
    42: [Moves.DragonClaw],
    52: [Moves.Dig],
    62: [Moves.Sandstorm],
    72: [Moves.TakeDown],
    82: [Moves.DragonRush],
  },
};
