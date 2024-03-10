import { weighted, Species } from "../mod.ts";
import loader from "../loader.ts";

export const Bulbasaur: Species = loader.register(P => ({
  name: "Bulbasaur",
  description:
    "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger. While it is young, it uses the nutrients that are stored in the seed in order to grow.",
  types: [P.Types.Grass, P.Types.Poison],
  baseStats: {
    hp: 45,
    attack: 49,
    defense: 49,
    specialAttack: 65,
    specialDefense: 65,
    speed: 45,
  },
  abilities: {
    normal: [P.Abilities.Overgrow],
    hidden: P.Abilities.Chlorophyll,
  },
  genders: weighted({ effect: P.Genders.Male, weight: 7 }, { effect: P.Genders.Female, weight: 1 }),
  evYields: { specialAttack: 1 },
  baseExperienceYield: 64,
  evolutions: [{ species: P.Species.Ivysaur, level: 16 }],
  experienceGroup: P.Experience.MedSlow,
  catchRate: 45,
  eggCycles: 21, // (5396+1) / 257
  height: 0.7,
  weight: 6.9,
  bodyType: "Quadruped",
  baseFriendship: 70,
  learnset: {
    1: [P.Moves.Tackle, P.Moves.Growl],
    3: [P.Moves.VineWhip],
    6: [P.Moves.Growth],
    9: [P.Moves.LeechSeed],
    12: [P.Moves.RazorLeaf],
    15: [P.Moves.PoisonPowder, P.Moves.SleepPowder],
    18: [P.Moves.SeedBomb],
    21: [P.Moves.TakeDown],
    24: [P.Moves.SweetScent],
    27: [P.Moves.Synthesis],
    30: [P.Moves.WorrySeed],
    33: [P.Moves.DoubleEdge],
    36: [P.Moves.SolarBeam],
    breeding: [
      {
        parent: [
          P.Species.Slowpoke,
          P.Species.Slowbro,
          P.Species.Slowking,
          P.Species.Ferroseed,
          P.Species.Ferrothorn,
          P.Species.Phantump,
          P.Species.Trevenant,
          P.Species.Bergmite,
          P.Species.Avalugg,
          P.Species.Appletun,
        ],
        move: P.Moves.Curse,
      },
      {
        parent: [
          P.Species.Tangela,
          P.Species.Tangrowth,
          P.Species.Roselia,
          P.Species.Roserade,
          P.Species.Snover,
          P.Species.Abomasnow,
          P.Species.Maractus,
          P.Species.Foongus,
          P.Species.Amoonguss,
          P.Species.Ferroseed,
          P.Species.Ferrothorn,
          P.Species.Phantump,
          P.Species.Trevenant,
          P.Species.Fomantis,
          P.Species.Lurantis,
          P.Species.Morelull,
          P.Species.Shiinotic,
        ],
        move: P.Moves.Ingrain,
      },
      {
        parent: [
          P.Species.Lotad,
          P.Species.Lombre,
          P.Species.Ludicolo,
          P.Species.Seedot,
          P.Species.Nuzleaf,
          P.Species.Shiftry,
        ],
        move: P.Moves.NaturePower,
      },
      {
        parent: [
          P.Species.Venusaur,
          P.Species.Oddish,
          P.Species.Gloom,
          P.Species.Vileplume,
          P.Species.Bellossom,
          P.Species.Roselia,
          P.Species.Roserade,
          P.Species.Cherrim,
          P.Species.Maractus,
          P.Species.Comfey,
        ],
        move: P.Moves.PetalDance,
      },
      {
        parent: [P.Species.Squirtle, P.Species.Wartortle, P.Species.Blastoise, P.Species.Avalugg],
        move: P.Moves.SkullBash,
      },
      {
        parent: [
          P.Species.NidoranM,
          P.Species.Nidorino,
          P.Species.Nidoking,
          P.Species.Oddish,
          P.Species.Gloom,
          P.Species.Vileplume,
          P.Species.Bellossom,
          P.Species.Roselia,
          P.Species.Roserade,
          P.Species.Foongus,
          P.Species.Amoonguss,
          P.Species.Salandit,
        ],
        move: P.Moves.Toxic,
      },
    ],
    machine: [
      P.Moves.MagicalLeaf,
      P.Moves.SolarBeam,
      P.Moves.LightScreen,
      P.Moves.Safeguard,
      P.Moves.Rest,
      P.Moves.Snore,
      P.Moves.Protect,
      P.Moves.GigaDrain,
      P.Moves.Charm,
      P.Moves.Attract,
      P.Moves.SunnyDay,
      P.Moves.Facade,
      P.Moves.HelpingHand,
      P.Moves.WeatherBall,
      P.Moves.BulletSeed,
      P.Moves.Venoshock,
      P.Moves.Round,
      P.Moves.GrassyTerrain,
      P.Moves.FalseSwipe,
      P.Moves.SwordsDance,
      P.Moves.BodySlam,
      P.Moves.Amnesia,
      P.Moves.Substitute,
      P.Moves.SludgeBomb,
      P.Moves.Endure,
      P.Moves.SleepTalk,
      P.Moves.SeedBomb,
      P.Moves.EnergyBall,
      P.Moves.LeafStorm,
      P.Moves.PowerWhip,
      P.Moves.GrassKnot,
      P.Moves.WorkUp,
    ],
    tutoring: [P.Moves.GrassPledge, P.Moves.GrassyGlide],
  },
}));
