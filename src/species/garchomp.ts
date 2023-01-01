import { Codex, Species, weighted } from "../index.ts";
import preload from "../preload.ts";

export const Garchomp: Species = preload.register<Species>((C: Codex) => ({
  name: "Garchomp",
  description:
    "The protuberances on its head serve as sensors. It can even detect distant prey. It is said that when one runs at high speed, its wings create blades of wind that can fell nearby trees.",
  //graphics: Graphics,
  types: [C.Types.Dragon, C.Types.Ground],
  abilities: {
    normal: [C.Abilities.SandVeil],
    hidden: C.Abilities.RoughSkin,
  },
  genders: weighted([
    [C.Genders.Female, 1],
    [C.Genders.Male, 1],
  ]),
  catchRate: 45,
  eggCycles: 120,
  height: 1.9,
  weight: 95.0,
  baseExperienceYield: 270,
  bodyType: "Tailed Bipedal",
  experienceGroup: C.Experience.Slow,
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
    1: [C.Moves.Crunch, C.Moves.DualChop, C.Moves.SandTomb, C.Moves.Tackle, C.Moves.SandAttack, C.Moves.DragonBreath],
    18: [C.Moves.Bulldoze],
    27: [C.Moves.Bite],
    34: [C.Moves.Slash],
    42: [C.Moves.DragonClaw],
    52: [C.Moves.Dig],
    62: [C.Moves.Sandstorm],
    72: [C.Moves.TakeDown],
    82: [C.Moves.DragonRush],
    evolution: [C.Moves.Crunch],
    machine: [
      C.Moves.TakeDown,
      // C.Moves.ScaryFace,
      // ...
    ],
    breeding: [
      // ...
    ],
    tutoring: [],
  },
  evolutions: [],
}));
