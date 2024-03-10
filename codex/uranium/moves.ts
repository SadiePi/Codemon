import { chance, Move, power, MoveEntry, decide, choose } from "./mod.ts";
import loader from "./loader.ts";

// data translated from https://pokemon-uranium.fandom.com/wiki/New_Moves_and_Abilities

export const AtomicPunch: Move = loader.register<Move>(U => ({
  name: "Atomic Punch",
  description: "A punch inbued with radiation, capable of infecting the enemy",
  type: U.Types.Nuclear,
  pp: 15,
  accuracy: 95,
  category: "Physical",
  attack: power(80),
  target: { position: "Adjacent", alignment: "Foe" },
  makesContact: true,
  status: chance(3 / 20, U.Statuses.Paralysis),
}));

export const CausticBreath: Move = loader.register<Move>(U => ({
  name: "Caustic Breath",
  description: "The user damages the opposing Pokémon and lowers its defense and special defense.",
  type: U.Types.Dragon,
  pp: 10,
  category: "Special",
  attack: power(60),
  target: { alignment: "Foe", quantity: "All" },
  makesContact: false,
  stages: {
    defense: -1,
    specialDefense: -1,
  },
}));

export const CoralBreak: Move = loader.register<Move>(U => ({
  name: "Coral Break",
  description: "The user creates waves in the water to attack the target. This move does physical damage.",
  type: U.Types.Water,
  pp: 15,
  accuracy: 95,
  category: "Special",
  attack: power(80, attack => (attack.category = "Physical")),
  target: { position: "Adjacent" },
  makesContact: true,
}));

export const DrainLife: Move = loader.register<Move>(U => ({
  name: "Drain Life",
  description:
    "The user drains the foe's energy with its fangs. The user's HP is restored by half the damage inflicted.",
  type: U.Types.Dark,
  pp: 10,
  category: "Physical",
  attack: power(75),
  target: { position: "Adjacent" },
  makesContact: true,
  // leech: 1 / 2, TODO
}));

export const Expunge: Move = loader.register<Move>(U => ({
  name: "Expunge",
  description: "Purges the foe of impurities, dealing extra damage to Nuclear types.",
  type: U.Types.Poison,
  pp: 5,
  accuracy: 70,
  category: "Special",
  attack: power(110, (attack, { target }) => {
    if (target.getSpecies().types.includes(U.Types.Nuclear)) attack.typeEffectiveness = 2;
  }),
  target: { position: "Adjacent" },
  makesContact: true,
}));

export const Fallout: Move = loader.register<Move>(U => ({
  name: "Fallout",
  description:
    "Summons a five-turn nuclear fallout to hurt all combatants except the Nuclear and Steel types every turn.",
  type: U.Types.Nuclear,
  pp: 10,
  category: "Status",
  target: { quantity: "All" },
  makesContact: false,
  weather: U.Weathers.NuclearFallout,
}));

export const FissionBurst: Move = loader.register<Move>(U => ({
  name: "Fission Burst",
  description: "The user explodes to inflict damage on those around it. The user faints upon using this move.",
  type: U.Types.Nuclear,
  pp: 5,
  category: "Physical",
  attack: power(150),
  target: { quantity: "All", position: "Adjacent" },
  makesContact: false,
  recoil: { faint: true },
}));

export const FlameImpact: Move = loader.register<Move>(U => ({
  name: "Flame Impact",
  description: "The user tackles the target at high temps gained by air friction. This attack always goes first.",
  type: U.Types.Fire,
  pp: 15,
  priority: 2,
  category: "Physical",
  attack: power(65),
  target: { position: "Adjacent" },
  makesContact: true,
}));

export const GammaRay: Move = loader.register<Move>(U => ({
  name: "Gamma Ray",
  description: "The user fires a blast of nuclear radiation at the enemy.",
  type: U.Types.Nuclear,
  pp: 30,
  category: "Special",
  attack: power(40),
  target: { alignment: "Foe" },
  makesContact: false,
}));

export const GemstoneGlimmer: Move = loader.register<Move>(U => ({
  name: "Gemstone Glimmer",
  description: "Unleashes a blinding light from its body. May lower the foe's accuracy.",
  type: U.Types.Rock,
  pp: 15,
  accuracy: 95,
  category: "Special",
  attack: power(75),
  target: { position: "Adjacent" },
  makesContact: false,
  stages: chance(1 / 4, { accuracy: -1 }),
}));

export const GetLucky: Move = loader.register<Move>(U => ({
  name: "Get Lucky",
  description:
    "The user locates the foe's weak spot and sends strong psychic waves to hit it. Raises critical chances.",
  type: U.Types.Psychic,
  pp: 5,
  category: "Special",
  attack: power(70),
  target: { position: "Adjacent" },
  makesContact: false,
  criticalHitStage: 1,
}));

export const GoldenFist: Move = loader.register<Move>(U => ({
  name: "Golden Fist",
  description:
    "The user slugs the opponent with a fist made of solid gold. Scatters coins which can be picked up after the battle.",
  type: U.Types.Fighting,
  pp: 20,
  category: "Physical",
  attack: power(70),
  target: { position: "Adjacent" },
  makesContact: true,
  recoil: {
    reward: ctx => {
      if (!(ctx.source instanceof MoveEntry)) return undefined;
      return { money: ctx.source.user.stats.level * 5 };
    },
  },
}));

export const HalfLife: Move = loader.register<Move>(U => ({
  name: "Half-Life",
  description: "The user emits a powerful blast of radiation that halves the foe's HP.",
  type: U.Types.Nuclear,
  pp: 20,
  category: "Special",
  hp: ({ target }) => target.stats.hp.current / 2,
  target: { position: "Adjacent" },
  makesContact: false,
}));

export const InfernalBlade: Move = loader.register<Move>(U => ({
  name: "Infernal Blade",
  description:
    "The user slashes the foe with cursed fire, hits Fairy-type for super effective damage and may also burn.",
  type: U.Types.Fire,
  pp: 10,
  accuracy: 95,
  category: "Physical",
  attack: power(90, (attack, { target }) => {
    if (target.getSpecies().types.includes(U.Types.Fairy)) attack.typeEffectiveness = 2;
  }),
  target: { position: "Adjacent" },
  makesContact: true,
  status: chance(3 / 10, U.Statuses.Burn),
}));

export const InstantCrush: Move = loader.register<Move>(U => ({
  name: "Instant Crush",
  description: "The user compresses the foe with its psychic powers. This attack always goes first.",
  type: U.Types.Psychic,
  pp: 10,
  priority: 1,
  category: "Special",
  attack: power(60),
  target: { position: "Adjacent" },
  makesContact: false,
}));

export const LaserPulse: Move = loader.register(U => ({
  name: "Laser Pulse",
  description: "The user attacks with a laser that cycles between Fire, Electric and Ice types.",
  type: U.Types.Normal,
  pp: 20,
  category: "Special",
  attack: power(90, attack => (attack.type = decide(choose(U.Types.Fire, U.Types.Electric, U.Types.Ice), undefined))), // TODO choose between Fire, Electric and Ice
  target: { position: "Adjacent" },
  makesContact: false,
}));

export const MetalCruncher: Move = loader.register<Move>(U => ({
  name: "Metal Cruncher",
  description:
    "The user crunches up the target with metal fangs. It has a high chance of lowering the target's Defense.",
  type: U.Types.Steel,
  pp: 5,
  accuracy: 85,
  category: "Physical",
  attack: power(120),
  target: { position: "Adjacent" },
  makesContact: true,
  stages: chance(17 / 20, { defense: -1 }),
}));

export const MetalWhip: Move = loader.register<Move>(U => ({
  name: "Metal Whip",
  description: "A whip made of sharp steel used to hurt and hold the enemy.",
  type: U.Types.Steel,
  pp: 10,
  accuracy: 90,
  category: "Physical",
  attack: power(50),
  target: { position: "Adjacent" },
  makesContact: true,
}));

export const NuclearSlash: Move = loader.register<Move>(U => ({
  name: "Nuclear Slash",
  description: "The target is attacked with a slash of claws or blades. Critical hits land more easily.",
  type: U.Types.Nuclear,
  pp: 20,
  accuracy: 90,
  category: "Physical",
  attack: power(55),
  target: { position: "Adjacent" },
  makesContact: true,
  criticalHitStage: 1,
}));

export const NuclearWaste: Move = loader.register<Move>(U => ({
  name: "Nuclear Waste",
  description: "Spits toxic, radioactive sludge that badly poisons the foe.",
  type: U.Types.Nuclear,
  pp: 10,
  accuracy: 85,
  category: "Special",
  target: { position: "Adjacent" },
  makesContact: true,
  status: U.Statuses.BadlyPoisoned,
}));

export const NuclearWind: Move = loader.register<Move>(U => ({
  name: "Nuclear Wind",
  description: "The user emits radiation from its body and uses its powerful wings to launch fallout at its foes.",
  type: U.Types.Nuclear,
  pp: 10,
  category: "Special",
  attack: power(65),
  target: { position: "Adjacent" },
  makesContact: false,
  weather: chance(1 / 20, U.Weathers.NuclearFallout),
}));

export const OceansWrath: Move = loader.register<Move>(U => ({
  name: "Ocean's Wrath",
  description: "Traps foes in a giant whirlpool for four to five turns.",
  type: U.Types.Water,
  pp: 20,
  category: "Special",
  attack: power(90),
  target: { position: "Adjacent" },
  makesContact: false,
  // status: U.Statuses.Whirlpool,
}));

export const ProtonBeam: Move = loader.register<Move>(U => ({
  name: "Proton Beam",
  description:
    "The user unleashes a powerful, radioactive blast on the enemy. However, it lowers the user's Special Attack by two stages.",
  type: U.Types.Nuclear,
  pp: 10,
  accuracy: 90,
  category: "Special",
  attack: power(100),
  target: { position: "Adjacent" },
  makesContact: false,
  recoil: { stages: { specialAttack: -2 } },
}));

export const QuantumLeap: Move = loader.register<Move>(U => ({
  name: "Quantum Leap",
  description: "The user vanishes in the first turn and attacks the foe with full power in the next turn.",
  type: U.Types.Nuclear,
  pp: 5,
  category: "Physical",
  attack: power(100),
  target: { position: "Adjacent" },
  makesContact: true,

  charge: { status: U.Statuses.SemiInvulnerableTurn },
}));

export const Radioacid: Move = loader.register<Move>(U => ({
  name: "Radioacid",
  description: "The user shoots a powerful blast made of radioactive waste. It may cause a burn.",
  type: U.Types.Nuclear,
  pp: 15,
  category: "Special",
  attack: power(60),
  target: { position: "Adjacent" },
  makesContact: false,
  status: chance(3 / 10, U.Statuses.Burn),
}));

export const SkyFall: Move = loader.register<Move>(U => ({
  name: "Sky Fall",
  description: "The user pressurizes the air around the target, crushing it. It may leave the target with paralysis.",
  type: U.Types.Flying,
  pp: 15,
  accuracy: 85,
  category: "Special",
  attack: power(85),
  target: { position: "Adjacent" },
  makesContact: true,
  status: chance(3 / 10, U.Statuses.Paralysis),
}));

export const StickyTerrain: Move = loader.register<Move>(U => ({
  name: "Sticky Terrain",
  description: "The user makes the ground all slimy and gooey for five turns. Priority attacks won't work.",
  type: U.Types.Poison,
  pp: 10,
  category: "Status",
  target: { quantity: "All" },
  makesContact: false,
  // terrain: U.Terrains.Sticky,
}));

export const Subduction: Move = loader.register<Move>(U => ({
  name: "Subduction",
  description:
    "The user creates a massive earthquake that causes the land underneath the foe to rise up and crash down, inflicting damage.",
  type: U.Types.Ground,
  pp: 5,
  accuracy: 90,
  category: "Physical",
  attack: power(140),
  target: { position: "Adjacent" },
  makesContact: false,
  stages: { speed: -2 },
  recoil: { status: U.Statuses.Confusion },
}));

export const SuddenStrike: Move = loader.register<Move>(U => ({
  name: "Sudden Strike",
  description: "The user attacks the foe with a sudden strike. This move always attacks first.",
  type: U.Types.Dark,
  pp: 30,
  priority: 1,
  category: "Physical",
  attack: power(40),
  target: { position: "Adjacent" },
  makesContact: true,
}));

export const Thunderstorm: Move = loader.register<Move>(U => ({
  name: "Thunderstorm",
  description:
    "Summons a five-turn thunderstorm to hurt all combatants except the Ground and Electric types every other turn.",
  type: U.Types.Electric,
  pp: 10,
  category: "Status",
  target: { quantity: "All" },
  makesContact: false,
  // weather: U.Weathers.Thunderstorm,
}));
