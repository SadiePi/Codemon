import C from "../index.ts";
import { species } from "../core/codex.ts";

export const Ivysaur = species.register(() => ({
  name: "Ivysaur",
  description:
    "Exposure to sunlight adds to its strength. Sunlight also makes the bud on its back grow larger. When the bulb on its back grows too large, it appears to lose the ability to stand on its hind legs.",
  types: [C.Types.Grass, C.Types.Poison],
  genders: [
    [C.Genders.Male, 7],
    [C.Genders.Female, 1],
  ],
  abilities: {
    normal: [C.Abilities.Overgrow],
    hidden: C.Abilities.Chlorophyll,
  },
  catchRate: 45,
  eggCycles: 21, // INCORRECT, REDO
  height: 1,
  weight: 13,
  baseExperienceYield: 142,
  experienceGroup: C.Experience.MedSlow,
  bodyType: "Quadruped",
  baseFriendship: 70,
  baseStats: {
    hp: 60,
    attack: 62,
    defense: 63,
    specialAttack: 80,
    specialDefense: 80,
    speed: 60,
  },
  evYields: {
    specialAttack: 1,
    specialDefense: 1,
  },
  learnset: {
    1: [C.Moves.Tackle, C.Moves.Growl, C.Moves.VineWhip, C.Moves.Growth],
    9: [C.Moves.LeechSeed],
    12: [C.Moves.RazorLeaf],
    15: [C.Moves.PoisonPowder, C.Moves.SleepPowder],
    20: [C.Moves.SeedBomb],
    25: [C.Moves.TakeDown],
    30: [C.Moves.SweetScent],
    35: [C.Moves.Synthesis],
    40: [C.Moves.WorrySeed],
    45: [C.Moves.DoubleEdge],
    50: [C.Moves.SolarBeam],
    machine: C.Species.Bulbasaur.learnset.machine,
    breeding: C.Species.Bulbasaur.learnset.breeding,
    tutoring: C.Species.Bulbasaur.learnset.tutoring,
  },
  evolutions: [[C.Species.Venusaur, { level: 32 }]],
}));
