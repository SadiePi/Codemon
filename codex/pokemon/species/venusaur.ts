import { Species } from "../index.ts";
import { loader } from "../loader.ts"

export const Venusaur: Species = loader.register<Species>(P => ({
  ...P.Species.Ivysaur,
  name: "Venusaur",
  description:
    "Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight. A bewitching aroma wafts from its flower. The fragrance becalms those engaged in a battle.",
  height: 2.0,
  weight: 100.0,
  baseExperienceYield: 236,
  baseStats: {
    hp: 80,
    attack: 82,
    defense: 83,
    specialAttack: 100,
    specialDefense: 100,
    speed: 80,
  },
  evYields: {
    specialAttack: 2,
    specialDefense: 1,
  },
  learnset: {
    1: [P.Moves.Tackle, P.Moves.Growl, P.Moves.VineWhip, P.Moves.Growth, P.Moves.PetalBlizzard, P.Moves.PetalDance],
    9: [P.Moves.LeechSeed],
    12: [P.Moves.RazorLeaf],
    15: [P.Moves.PoisonPowder, P.Moves.SleepPowder],
    20: [P.Moves.SeedBomb],
    25: [P.Moves.TakeDown],
    30: [P.Moves.SweetScent],
    37: [P.Moves.Synthesis],
    44: [P.Moves.WorrySeed],
    51: [P.Moves.DoubleEdge],
    58: [P.Moves.SolarBeam],
    evolution: [P.Moves.PetalBlizzard],
    machine: [
      ...P.Species.Ivysaur.learnset.machine!,
      P.Moves.HyperBeam,
      P.Moves.GigaImpact,
      P.Moves.Bulldoze,
      P.Moves.StompingTantrum,
      P.Moves.Earthquake,
      P.Moves.Outrage,
    ],
    breeding: P.Species.Ivysaur.learnset.breeding,
    tutoring: [...P.Species.Ivysaur.learnset.tutoring!, P.Moves.FrenzyPlant, P.Moves.TerrainPulse],
  },
}));