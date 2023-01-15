import { Species, weighted } from "../index.ts";
import { loader } from "../loader.ts"

export const Garchomp: Species = loader.register<Species>(P => ({
  name: "Garchomp",
  description:
    "The protuberances on its head serve as sensors. It can even detect distant prey. It is said that when one runs at high speed, its wings create blades of wind that can fell nearby trees.",
  //graphics: Graphics,
  types: [P.Types.Dragon, P.Types.Ground],
  abilities: {
    normal: [P.Abilities.SandVeil],
    hidden: P.Abilities.RoughSkin,
  },
  genders: weighted([
    [P.Genders.Female, 1],
    [P.Genders.Male, 1],
  ]),
  catchRate: 45,
  eggCycles: 120,
  height: 1.9,
  weight: 95.0,
  baseExperienceYield: 270,
  bodyType: "Tailed Bipedal",
  experienceGroup: P.Experience.Slow,
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
    1: [P.Moves.Crunch, P.Moves.DualChop, P.Moves.SandTomb, P.Moves.Tackle, P.Moves.SandAttack, P.Moves.DragonBreath],
    18: [P.Moves.Bulldoze],
    27: [P.Moves.Bite],
    34: [P.Moves.Slash],
    42: [P.Moves.DragonClaw],
    52: [P.Moves.Dig],
    62: [P.Moves.Sandstorm],
    72: [P.Moves.TakeDown],
    82: [P.Moves.DragonRush],
    evolution: [P.Moves.Crunch],
    machine: [
      P.Moves.TakeDown,
      // P.Moves.ScaryFace,
      // ...
    ],
    breeding: [
      // ...
    ],
    tutoring: [],
  },
  evolutions: [],
}));
