import { Species, weighted } from "./mod.ts";
import loader from "./loader.ts";

export const Orchynx: Species = loader.register(U => ({
  name: "Orchynx",
  description:
    "Metal plates underneath its fur protect it from harm. It replenishes its energy by basking in the sun's rays.",
  types: [U.Types.Grass, U.Types.Steel],
  abilities: {
    normal: [U.Abilities.BattleArmor],
    hidden: U.Abilities.Overgrow,
  },
  genders: weighted({ effect: U.Genders.Male, weight: 7 }, { effect: U.Genders.Female, weight: 1 }),
  catchRate: 42,
  eggCycles: 20,
  height: 0.7,
  weight: 6.9,
  baseExperienceYield: 70,
  experienceGroup: U.Experience.MedFast,
  bodyType: "Quadruped",
  baseFriendship: 70,
  baseStats: {
    hp: 50,
    attack: 55,
    defense: 55,
    specialAttack: 70,
    specialDefense: 70,
    speed: 50,
  },
  evYields: { specialAttack: 1 },
  learnset: {
    1: [U.Moves.Scratch, U.Moves.Growl],
    5: [U.Moves.LeechSeed],
    9: [U.Moves.VineWhip],
    13: [U.Moves.MetalClaw],
    18: [U.Moves.HoneClaws],
    20: [U.Moves.MegaDrain],
    25: [U.Moves.IronDefense],
    29: [U.Moves.LeafBlade],
    33: [U.Moves.IronTail],
    37: [U.Moves.Synthesis],
    41: [U.Moves.EnergyBall],
    45: [U.Moves.MeteorMash],
    machine: [
      U.Moves.Roar,
      U.Moves.Toxic,
      U.Moves.BulletSeed,
      U.Moves.HiddenPower,
      U.Moves.SunnyDay,
      U.Moves.Taunt,
      U.Moves.Protect,
      U.Moves.GigaDrain,
      U.Moves.Frustration,
      U.Moves.SolarBeam,
      U.Moves.IronTail,
      U.Moves.Return,
      U.Moves.Dig,
      U.Moves.DoubleTeam,
      U.Moves.AerialAce,
      U.Moves.Facade,
      U.Moves.Rest,
      U.Moves.Attract,
      U.Moves.EnergyBall,
      U.Moves.FalseSwipe,
      U.Moves.Endure,
      U.Moves.ShadowClaw,
      U.Moves.GyroBall,
      U.Moves.SwordsDance,
      U.Moves.XScissor,
      U.Moves.SleepTalk,
      U.Moves.GrassKnot,
      U.Moves.Swagger,
      U.Moves.Substitute,
      U.Moves.Strength,
      U.Moves.RockSmash,
    ],
    tutoring: [U.Moves.Crunch, U.Moves.IronDefense, U.Moves.IronHead, U.Moves.PoisonFang, U.Moves.SeedBomb],
    breeding: [
      [
        [
          U.Species.Feleng,
          U.Species.Owten,
          U.Species.Jerbolta,
          U.Species.Cottonee,
          U.Species.Eevee,
          U.Species.Pufluff,
          U.Species.Minicorn,
        ],
        U.Moves.Charm,
      ],
      [[U.Species.Cocaran, U.Species.Chimical], U.Moves.Curse],
      [[U.Species.Jungore], U.Moves.IronHead],
      [[U.Species.Tikiki, U.Species.Leafeon], U.Moves.MagicalLeaf],
      [[U.Species.Ratsy], U.Moves.MagnetBomb],
      [[U.Species.Lotad, U.Species.Costraw, U.Species.Cocaran, U.Species.Cottonee, Tikiki], U.Moves.MegaDrain],
      [[U.Species.Cottonee], U.Moves.PetalDance],
      [[U.Species.Minyan, U.Species.Ratsy], U.Moves.Thief],
    ],
  },
  evolutions: [
    {
      species: U.Species.Metalynx,
      level: 28,
    },
  ],
}));
export const Metalynx: Species = {} as Species;
export const Raptorch: Species = {} as Species;
export const Archilles: Species = {} as Species;
export const Eletux: Species = {} as Species;
export const Electruxo: Species = {} as Species;
export const Chyinmunk: Species = {} as Species;
export const Kinetmunk: Species = {} as Species;
export const Birbie: Species = {} as Species;
export const Aveden: Species = {} as Species;
export const Splendifowl: Species = {} as Species;
export const Cubbug: Species = {} as Species;
export const Cubblfly: Species = {} as Species;
export const Nimflora: Species = {} as Species;
export const Barewl: Species = {} as Species;
export const Dearewl: Species = {} as Species;
export const Gararewl: Species = {} as Species;
export const Grozard: Species = {} as Species;
export const Terlard: Species = {} as Species;
export const Tonemy: Species = {} as Species;
export const Tofurang: Species = {} as Species;
export const Feleng: Species = {} as Species;
export const Felunge: Species = {} as Species;
export const Feliger: Species = {} as Species;
export const Empirilla: Species = {} as Species;
export const Owten: Species = {} as Species;
export const Eshouten: Species = {} as Species;
export const Smore: Species = {} as Species;
export const Firoke: Species = {} as Species;
export const Brailip: Species = {} as Species;
export const Brainoar: Species = {} as Species;
export const Tancoon: Species = {} as Species;
export const Tanscure: Species = {} as Species;
export const Sponee: Species = {} as Species;
export const Sponaree: Species = {} as Species;
export const Pahar: Species = {} as Species;
export const Palij: Species = {} as Species;
export const Pajay: Species = {} as Species;
export const Jerbolta: Species = {} as Species;
export const Comite: Species = {} as Species;
export const Cometeor: Species = {} as Species;
export const Astronite: Species = {} as Species;
export const Baashaun: Species = {} as Species;
export const Baaschaf: Species = {} as Species;
export const Baariette: Species = {} as Species;
export const Tricwe: Species = {} as Species;
export const Harylect: Species = {} as Species;
export const Costraw: Species = {} as Species;
export const Trawpint: Species = {} as Species;
export const Lunapup: Species = {} as Species;
export const Herolune: Species = {} as Species;
export const Minyan: Species = {} as Species;
export const Vilucard: Species = {} as Species;
export const Modrille: Species = {} as Species;
export const Drilgann: Species = {} as Species;
export const Cocaran: Species = {} as Species;
export const Cararalm: Species = {} as Species;
export const Cocancer: Species = {} as Species;
export const Corsoreef: Species = {} as Species;
export const Tubjaw: Species = {} as Species;
export const Tubareel: Species = {} as Species;
export const Cassnail: Species = {} as Species;
export const Sableau: Species = {} as Species;
export const Escartress: Species = {} as Species;
export const Nupin: Species = {} as Species;
export const Gellin: Species = {} as Species;
export const Barand: Species = {} as Species;
export const Glaslug: Species = {} as Species;
export const Glavinug: Species = {} as Species;
export const S51: Species = {} as Species;
export const S51A: Species = {} as Species;
export const Paraudio: Species = {} as Species;
export const Paraboom: Species = {} as Species;
export const Flager: Species = {} as Species;
export const Inflagetah: Species = {} as Species;
export const Chimical: Species = {} as Species;
export const Chimaconda: Species = {} as Species;
export const Tikiki: Species = {} as Species;
export const Frikitiki: Species = {} as Species;
export const Unymph: Species = {} as Species;
export const Harptera: Species = {} as Species;
export const Chicoatl: Species = {} as Species;
export const Quetzoral: Species = {} as Species;
export const Coatlith: Species = {} as Species;
export const Tracton: Species = {} as Species;
export const Snopach: Species = {} as Species;
export const Dermafrost: Species = {} as Species;
export const Slothohm: Species = {} as Species;
export const Theriamp: Species = {} as Species;
export const Titanice: Species = {} as Species;
export const Frynai: Species = {} as Species;
export const Saidine: Species = {} as Species;
export const Daikatuna: Species = {} as Species;
export const Selkid: Species = {} as Species;
export const Syrentide: Species = {} as Species;
export const Miasmedic: Species = {} as Species;
export const Jackdeary: Species = {} as Species;
export const Winotinger: Species = {} as Species;
export const Duplicat: Species = {} as Species;

export const Nucleon: Species = loader.register(
  U => ({
    name: "Nucleon",
    description:
      " One of the only non-feral Nuclear Pokémon. It's theorized that its bond with its trainer when it was an Eevee allows it to stay in control.",
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
        [
          [
            U.Species.Dunsparce,
            U.Species.Feleng,
            U.Species.Ekans,
            U.Species.Jerbolta,
            U.Species.Costraw,
            U.Species.Flager,
            U.Species.Chimical,
            U.Species.Minicorn,
          ],
          U.Moves.Captivate,
        ],
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

export const Ratsy: Species = {} as Species;
export const Raffiti: Species = {} as Species;
export const Gargryph: Species = {} as Species;
export const Masking: Species = {} as Species;
export const Dramsama: Species = {} as Species;
export const Antarki: Species = {} as Species;
export const Chupacho: Species = {} as Species;
export const Luchabra: Species = {} as Species;
export const Linkite: Species = {} as Species;
export const Chainite: Species = {} as Species;
export const Pufluff: Species = {} as Species;
export const Alpico: Species = {} as Species;
export const Anderind: Species = {} as Species;
export const Colarva: Species = {} as Species;
export const Frosulo: Species = {} as Species;
export const Frosthra: Species = {} as Species;
export const Fafurr: Species = {} as Species;
export const Fafninter: Species = {} as Species;
export const Shrimputy: Species = {} as Species;
export const Krilvolver: Species = {} as Species;
export const Lavent: Species = {} as Species;
export const Swabone: Species = {} as Species;
export const Skelerogue: Species = {} as Species;
export const Navighast: Species = {} as Species;
export const Stenowatt: Species = {} as Species;
export const Jungore: Species = {} as Species;
export const Majungold: Species = {} as Species;
export const Hagoop: Species = {} as Species;
export const Haagross: Species = {} as Species;
export const Xenomite: Species = {} as Species;
export const Xenogen: Species = {} as Species;
export const Xenoqueen: Species = {} as Species;
export const Hazma: Species = {} as Species;
export const Geigeroach: Species = {} as Species;
export const Minicorn: Species = {} as Species;
export const Kiricorn: Species = {} as Species;
export const Oblivicorn: Species = {} as Species;
export const Luxi: Species = {} as Species;
export const Luxor: Species = {} as Species;
export const Luxelong: Species = {} as Species;
export const Praseopunk: Species = {} as Species;
export const Neopunk: Species = {} as Species;
export const Sheebit: Species = {} as Species;
export const Terrabbit: Species = {} as Species;
export const Laissure: Species = {} as Species;
export const Volchik: Species = {} as Species;
export const Voltasu: Species = {} as Species;
export const Yatagaryu: Species = {} as Species;
export const Devimp: Species = {} as Species;
export const Fallengel: Species = {} as Species;
export const Beliaddon: Species = {} as Species;
export const Seikamater: Species = {} as Species;
export const Garlikid: Species = {} as Species;
export const Baitatao: Species = {} as Species;
export const Leviathao: Species = {} as Species;
export const Krakanao: Species = {} as Species;
export const Lanthan: Species = {} as Species;
export const Actan: Species = {} as Species;
export const Urayne: Species = {} as Species;
export const Aotius: Species = {} as Species;
export const Mutios: Species = {} as Species;
export const Zephy: Species = {} as Species;
