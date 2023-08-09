import { Species, weighted } from "./index.ts";
import loader from "./loader.ts";

// Define the Nucleon species, a Nuclear-type eeveelution, from Pokémon Uranium.
export const Nucleon: Species = loader.register(
  U => ({
    name: "Nucleon",
    description: "A radioactive eeveelution.",
    types: [U.Types.Nuclear],
    abilities: {
      normal: [U.Abilities.Atomize],
      hidden: U.Abilities.GeigerSense,
    },
    genders: weighted({ effect: U.Genders.Male, weight: 7 }, { effect: U.Genders.Female, weight: 1 }),
    catchRate: 45,
    eggCycles: 120,
    height: 0.7,
    weight: 21.5,
    baseExperienceYield: 184,
    experienceGroup: U.Experience.MedFast,
    baseFriendship: 35,
    baseStats: {
      hp: 70,
      attack: 55,
      defense: 85,
      specialAttack: 115,
      specialDefense: 115,
      speed: 90,
    },
    evYields: {
      specialAttack: 1,
      specialDefense: 1,
    },
    bodyType: "Quadruped",
    learnset: {
      1: [U.Moves.HelpingHand, U.Moves.Tackle, U.Moves.TailWhip],
      5: [U.Moves.SandAttack],
      9: [U.Moves.GammaRay],
      12: [U.Moves.QuickAttack],
      17: [U.Moves.Swift],
      21: [U.Moves.Headbutt],
      25: [U.Moves.HalfLife],
      29: [U.Moves.Flash],
      33: [U.Moves.MirrorCoat],
      37: [U.Moves.Conversion2],
      41: [U.Moves.LastResort],
      45: [U.Moves.HyperVoice],
      machine: [
        U.Moves.CalmMind,
        U.Moves.Roar,
        U.Moves.Toxic,
        U.Moves.HiddenPower,
        U.Moves.SunnyDay,
        U.Moves.HyperBeam,
        U.Moves.LightScreen,
        U.Moves.Protect,
        U.Moves.RainDance,
        U.Moves.Safeguard,
        U.Moves.Frustration,
        U.Moves.Return,
        U.Moves.DoubleTeam,
        U.Moves.Reflect,
        U.Moves.Facade,
        U.Moves.Rest,
        U.Moves.Attract,
        U.Moves.Explosion,
        U.Moves.GigaImpact,
        U.Moves.Flash,
        U.Moves.SleepTalk,
        U.Moves.Swagger,
        U.Moves.Substitute,
        U.Moves.LastResort,
      ],
      tutor: [U.Moves.Covet, U.Moves.HelpingHand, U.Moves.HyperVoice],
      breeding: [
        //[[U.Species.Dunsparce, U.Species.Feleng, U.Species.Ekans, U.Species.Jerbolta, U.Species.Costraw, U.Species.Flager, U.Species.Chimical, U.Species.Minicorn], U.Moves.Captivate],
        // ...
      ],
    },
    evolutions: [],
  }),
  U => {
    U.Species.Eevee.evolutions.push({
      species: U.Species.Nucleon,
      level: 20,
      partyType: U.Types.Nuclear,
    });
  }
);
