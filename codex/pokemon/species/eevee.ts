import { Species, weighted } from "../mod.ts";
import loader from "../loader.ts";

export const Eevee: Species = loader.register(P => ({
  name: "Eevee",
  description:
    "Its genetic code is irregular. It may mutate if it is exposed to radiation from element stones. Its ability to evolve into many forms allows it to adapt smoothly and perfectly to any environment.",
  types: [P.Types.Normal],
  baseStats: {
    hp: 55,
    attack: 55,
    defense: 50,
    specialAttack: 45,
    specialDefense: 65,
    speed: 55,
  },
  abilities: {
    normal: [P.Abilities.RunAway, P.Abilities.Adaptability],
    hidden: P.Abilities.Anticipation,
  },
  genders: weighted({ entry: P.Genders.Male, weight: 7 }, { entry: P.Genders.Female, weight: 1 }),
  evYields: { specialDefense: 1 },
  baseExperienceYield: 65,
  evolutions: [
    { species: P.Species.Vaporeon, item: P.Items.WaterStone },
    { species: P.Species.Jolteon, item: P.Items.ThunderStone },
    { species: P.Species.Flareon, item: P.Items.FireStone },
    { species: P.Species.Leafeon, item: P.Items.LeafStone },
    // { species: P.Species.Leafeon, (levelup near Moss Rock) },
    { species: P.Species.Glaceon, item: P.Items.IceStone },
    // { species: P.Species.Glaceon, (levelup near Ice Rock) },
    { species: P.Species.Espeon, friendship: 220, time: "day" }, // TODO trigger on levelup
    { species: P.Species.Umbreon, friendship: 220, time: "night" }, // TODO trigger on levelup
    { species: P.Species.Sylveon, friendship: 220, moveType: P.Types.Fairy }, // TODO trigger on levelup
  ],
  experienceGroup: P.Experience.MedFast,
  catchRate: 45,
  eggCycles: 35, // (2805+1) / 257
  height: 0.3,
  weight: 6.5,
  bodyType: "Quadruped",
  baseFriendship: 70,
  learnset: {
    1: [P.Moves.Covet, P.Moves.HelpingHand, P.Moves.Tackle, P.Moves.Growl, P.Moves.TailWhip],
    5: [P.Moves.SandAttack],
    10: [P.Moves.QuickAttack],
    15: [P.Moves.BabyDollEyes],
    20: [P.Moves.Swift],
    25: [P.Moves.Bite],
    30: [P.Moves.Copycat],
    35: [P.Moves.BatonPass],
    40: [P.Moves.TakeDown],
    45: [P.Moves.Charm],
    50: [P.Moves.DoubleEdge],
    55: [P.Moves.LastResort],
    machine: [
      P.Moves.TakeDown,
      P.Moves.Charm,
      P.Moves.FakeTears,
      P.Moves.MudSlap,
      P.Moves.Protect,
      P.Moves.Trailblaze,
      P.Moves.Facade,
      P.Moves.Swift,
      P.Moves.StoredPower,
      P.Moves.Endure,
      P.Moves.SunnyDay,
      P.Moves.RainDance,
      P.Moves.Dig,
      P.Moves.BodySlam,
      P.Moves.SleepTalk,
      P.Moves.Rest,
      P.Moves.Substitute,
      P.Moves.ShadowBall,
      P.Moves.HyperVoice,
      P.Moves.CalmMind,
      P.Moves.HelpingHand,
      P.Moves.BatonPass,
      P.Moves.TeraBlast,
      P.Moves.Roar,
      P.Moves.WeatherBall,
      P.Moves.DoubleEdge,
      P.Moves.Curse,
      P.Moves.AlluringVoice,
    ],
    breeding: [
      {
        parent: [
          P.Species.Numel,
          P.Species.Camerupt,
          P.Species.Torkoal,
          P.Species.Zangoose,
          P.Species.Zorua,
          P.Species.Zoroark,
        ],
        move: P.Moves.Curse,
      },
      {
        parent: [
          P.Species.Torchic,
          P.Species.Combusken,
          P.Species.Blaziken,
          P.Species.Zangoose,
          P.Species.Lucario,
          P.Species.Mienfoo,
          P.Species.Mienshao,
        ],
        move: P.Moves.Detect,
      },
      {
        parent: [
          P.Species.Tauros,
          P.Species.Jolteon,
          P.Species.Combusken,
          P.Species.Blaziken,
          P.Species.Zangoose,
          P.Species.Deerling,
          P.Species.Sawsbuck,
          P.Species.Litten,
          P.Species.Torracat,
          P.Species.Incineroar,
          P.Species.Mudbray,
          P.Species.Mudsdale,
          P.Species.Scorbunny,
          P.Species.Raboot,
          P.Species.Cinderace,
        ],
        move: P.Moves.DoubleKick,
      },
      {
        parent: [
          P.Species.Dunsparce,
          P.Species.Dudunsparce,
          P.Species.Swinub,
          P.Species.Piloswine,
          P.Species.Mamoswine,
          P.Species.Phanpy,
          P.Species.Slakoth,
          P.Species.Slaking,
          P.Species.Zangoose,
          P.Species.Cubchoo,
          P.Species.Beartic,
          P.Species.Komala,
          P.Species.Cetoddle,
          P.Species.Cetitan,
        ],
        move: P.Moves.Flail,
      },
      {
        parent: [
          P.Species.Diglett,
          P.Species.Diglett,
          P.Species.Dugtrio,
          P.Species.Dugtrio,
          P.Species.Dunsparce,
          P.Species.Dudunsparce,
          P.Species.Swinub,
          P.Species.Piloswine,
          P.Species.Mamoswine,
          P.Species.Drilbur,
          P.Species.Excadrill,
          P.Species.Yungoos,
          P.Species.Gumshoos,
          P.Species.Mudbray,
          P.Species.Mudsdale,
          P.Species.Orthworm,
        ],
        move: P.Moves.MudSlap,
      },
      { parent: [P.Species.Aipom, P.Species.Ambipom, P.Species.Minccino, P.Species.Cinccino], move: P.Moves.Tickle },
      { parent: [P.Species.Vaporeon, P.Species.Leafeon], move: P.Moves.Wish },
      {
        parent: [
          P.Species.Wooper,
          P.Species.Wooper,
          P.Species.Quagsire,
          P.Species.Clodsire,
          P.Species.Dunsparce,
          P.Species.Dudunsparce,
          P.Species.Poochyena,
          P.Species.Mightyena,
          P.Species.Slakoth,
          P.Species.Slaking,
          P.Species.Camerupt,
          P.Species.Hippopotas,
          P.Species.Hippowdon,
          P.Species.Yungoos,
          P.Species.Gumshoos,
          P.Species.Komala,
          P.Species.Fuecoco,
          P.Species.Crocalor,
          P.Species.Skeledirge,
          P.Species.Lechonk,
          P.Species.Oinkologne,
        ],
        move: P.Moves.Yawn,
      },
    ],
  },
}));
