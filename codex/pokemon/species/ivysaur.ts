import { Species } from "../mod.ts";
import loader from "../loader.ts";

export const Ivysaur: Species = loader.register<Species>(P => ({
  ...P.Species.Bulbasaur,
  name: "Ivysaur",
  description:
    "Exposure to sunlight adds to its strength. Sunlight also makes the bud on its back grow larger. When the bulb on its back grows too large, it appears to lose the ability to stand on its hind legs.",
  height: 1.0,
  weight: 13.0,
  baseExperienceYield: 142,
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
    1: [P.Moves.Tackle, P.Moves.Growl, P.Moves.VineWhip, P.Moves.Growth],
    9: [P.Moves.LeechSeed],
    12: [P.Moves.RazorLeaf],
    15: [P.Moves.PoisonPowder, P.Moves.SleepPowder],
    20: [P.Moves.SeedBomb],
    25: [P.Moves.TakeDown],
    30: [P.Moves.SweetScent],
    35: [P.Moves.Synthesis],
    40: [P.Moves.WorrySeed],
    45: [P.Moves.DoubleEdge],
    50: [P.Moves.SolarBeam],
    machine: P.Species.Bulbasaur.learnset.machine,
    breeding: P.Species.Bulbasaur.learnset.breeding,
    tutoring: P.Species.Bulbasaur.learnset.tutoring,
  },
  evolutions: [{ species: P.Species.Venusaur, level: 32 }],
}));
