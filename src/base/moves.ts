import { MoveData, MoveEffect, TC, TraditionalBattle } from "./index.ts";
import * as Types from "./types.ts";
import * as Status from "./status.ts";

// https://bulbapedia.bulbagarden.net/wiki/List_of_moves
// TODOs: multi-turn moves, payday, raw damage, instakill, roar/whirlwind, move restrictions, mist, hp transfer,

export const Pound: MoveData<TraditionalBattle> = {
  name: "Pound",
  description: "The target is physically pounded with a long tail, a foreleg, or the like.",
  type: Types.Normal,
  category: "Physical",
  pp: 35,
  power: 40,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
} as const;

export const KarateChop: MoveData<TraditionalBattle> = {
  name: "Karate Chop",
  description: "The target is attacked with a sharp chop. Critical hits land more easily.",
  type: Types.Fighting,
  category: "Physical",
  pp: 25,
  power: 50,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  criticalHitStage: 1,
} as const;

export const DoubleSlap: MoveData<TraditionalBattle> = {
  name: "Double Slap",
  description: "The target is slapped repeatedly, back and forth, two to five times in a row.",
  type: Types.Normal,
  category: "Physical",
  pp: 10,
  power: 15,
  accuracy: 85,
  target: TC.Adjacent,
  makesContact: true,
} as const;

export const CometPunch: MoveData<TraditionalBattle> = {
  name: "Comet Punch",
  description: "The target is hit with a flurry of punches that strike two to five times in a row.",
  type: Types.Normal,
  category: "Physical",
  pp: 15,
  power: 18,
  accuracy: 85,
  target: TC.Adjacent,
  makesContact: true,
  hitAgain: (hitsSoFar: number) => {
    if (hitsSoFar === 1) return 1;
    if (hitsSoFar === 2) return 0.65;
    if (hitsSoFar === 3) return 0.3;
    if (hitsSoFar === 4) return 0.15;
    return 0;
  },
} as const;

export const MegaPunch: MoveData<TraditionalBattle> = {
  name: "Mega Punch",
  description: "The target is slugged by a punch thrown with muscle-packed power.",
  type: Types.Normal,
  category: "Physical",
  pp: 20,
  power: 80,
  accuracy: 85,
  target: TC.Adjacent,
  makesContact: true,
} as const;

export const PayDay: MoveData<TraditionalBattle> = {
  name: "Pay Day",
  description: "Numerous coins are hurled at the target to inflict damage. Money is earned after the battle.",
  type: Types.Normal,
  category: "Physical",
  pp: 20,
  power: 40,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  // TODO somehow
} as const;

export const FirePunch: MoveData<TraditionalBattle> = {
  name: "Fire Punch",
  description: "The target is punched with a fiery fist. This may also leave the target with a burn.",
  type: Types.Fire,
  category: "Physical",
  pp: 15,
  power: 75,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  effect: {
    type: "Status",
    status: Status.Burn,
    probability: 0.1,
  },
} as const;

export const IcePunch: MoveData<TraditionalBattle> = {
  name: "Ice Punch",
  description: "The target is punched with an icy fist. This may also leave the target frozen.",
  type: Types.Ice,
  category: "Physical",
  pp: 15,
  power: 75,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  effect: {
    type: "Status",
    status: Status.Freeze,
    probability: 0.1,
  },
} as const;

export const ThunderPunch: MoveData<TraditionalBattle> = {
  name: "Thunder Punch",
  description: "The target is punched with an electrified fist. This may also leave the target with paralysis.",
  type: Types.Electric,
  category: "Physical",
  pp: 15,
  power: 75,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  effect: {
    type: "Status",
    status: Status.Paralysis,
    probability: 0.1,
  },
} as const;

export const Scratch: MoveData<TraditionalBattle> = {
  name: "Scratch",
  description: "Hard, pointed, sharp claws rake the target to inflict damage.",
  type: Types.Normal,
  category: "Physical",
  pp: 35,
  power: 40,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
} as const;

export const ViseGrip: MoveData<TraditionalBattle> = {
  name: "Vise Grip",
  description: "The target is gripped and squeezed from both sides to inflict damage.",
  type: Types.Normal,
  category: "Physical",
  pp: 30,
  power: 55,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
} as const;

export const Guillotine: MoveData<TraditionalBattle> = {
  name: "Guillotine",
  description: "A vicious, tearing attack with big pincers. The target faints instantly if this attack hits.",
  type: Types.Normal,
  category: "Physical",
  pp: 5,
  power: 0,
  accuracy: 90,
  target: TC.Adjacent,
  makesContact: true,
  // TODO somehow
} as const;

export const RazorWind: MoveData<TraditionalBattle> = {
  name: "Razor Wind",
  description:
    "In this two-turn attack, blades of wind hit opposing Pokémon on the second turn. Critical hits land more easily.",
  type: Types.Normal,
  category: "Special",
  pp: 10,
  power: 80,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  criticalHitStage: 1,
  // TODO somehow
} as const;

export const SwordsDance: MoveData<TraditionalBattle> = {
  name: "Swords Dance",
  description: "A frenetic dance to uplift the fighting spirit. This sharply raises the user's Attack stat.",
  type: Types.Normal,
  category: "Status",
  pp: 30,
  target: TC.Self,
  makesContact: false,
  effect: {
    type: "StatMod",
    attack: 2,
  },
} as const;

export const Cut: MoveData<TraditionalBattle> = {
  name: "Cut",
  description: "The target is cut with a scythe or claw.",
  type: Types.Normal,
  category: "Physical",
  pp: 30,
  power: 50,
  accuracy: 95,
  target: TC.Adjacent,
  makesContact: true,
} as const;

export const Gust: MoveData<TraditionalBattle> = {
  name: "Gust",
  description: "A gust of wind is whipped up by wings and launched at the target to inflict damage.",
  type: Types.Flying,
  category: "Special",
  pp: 35,
  power: 40,
  accuracy: 100,
  target: TC.Adjacent | TC.NonAdjacent,
  makesContact: false,
  // TODO during Fly, double power
} as const;

export const WingAttack: MoveData<TraditionalBattle> = {
  name: "Wing Attack",
  description: "The target is struck with large, imposing wings spread wide to inflict damage.",
  type: Types.Flying,
  category: "Physical",
  pp: 35,
  power: 60,
  accuracy: 100,
  target: TC.Adjacent | TC.NonAdjacent,
  makesContact: true,
} as const;

export const Whirlwind: MoveData<TraditionalBattle> = {
  name: "Whirlwind",
  description:
    "The target is blown away, and a different Pokémon is dragged out. In the wild, this ends a battle against a single Pokémon.",
  type: Types.Normal,
  category: "Status",
  pp: 20,
  target: TC.Adjacent,
  makesContact: false,
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO somehow
} as const;

export const Fly: MoveData<TraditionalBattle> = {
  name: "Fly",
  description: "The user flies up into the sky and then strikes its target on the next turn.",
  type: Types.Flying,
  category: "Physical",
  pp: 15,
  power: 90,
  accuracy: 95,
  target: TC.Adjacent | TC.NonAdjacent,
  makesContact: true,
  // TODO somehow
} as const;

export const Bind: MoveData<TraditionalBattle> = {
  name: "Bind",
  description:
    "Things such as long bodies or tentacles are used to bind and squeeze the target for four to five turns.",
  type: Types.Normal,
  category: "Physical",
  pp: 20,
  power: 15,
  accuracy: 85,
  target: TC.Adjacent,
  makesContact: true,
  // TODO details
} as const;

export const Slam: MoveData<TraditionalBattle> = {
  name: "Slam",
  description: "The target is slammed with a long tail, vines, or the like to inflict damage.",
  type: Types.Normal,
  category: "Physical",
  pp: 20,
  power: 80,
  accuracy: 75,
  target: TC.Adjacent,
  makesContact: true,
} as const;

export const VineWhip: MoveData<TraditionalBattle> = {
  name: "Vine Whip",
  description: "The target is struck with slender, whiplike vines to inflict damage.",
  type: Types.Grass,
  category: "Physical",
  pp: 25, // max 40
  power: 45,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
} as const;

export const Stomp: MoveData<TraditionalBattle> = {
  name: "Stomp",
  description: "The target is stomped with a big foot. This may also make the target flinch.",
  type: Types.Normal,
  category: "Physical",
  pp: 20,
  power: 65,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  effect: {
    type: "Status",
    status: Status.Flinch,
    probability: 3 / 10,
  },
} as const;

export const DoubleKick: MoveData<TraditionalBattle> = {
  name: "Double Kick",
  description: "The target is quickly kicked twice in succession using both feet.",
  type: Types.Fighting,
  category: "Physical",
  pp: 30,
  power: 30,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  hitAgain: h => h < 2,
} as const;

export const MegaKick: MoveData<TraditionalBattle> = {
  name: "Mega Kick",
  description: "The target is attacked by a kick launched with muscle-packed power.",
  type: Types.Normal,
  category: "Physical",
  pp: 5,
  power: 120,
  accuracy: 75,
  target: TC.Adjacent,
  makesContact: true,
} as const;

export const JumpKick: MoveData<TraditionalBattle> = {
  name: "Jump Kick",
  description: "The user jumps up high, then strikes with a kick. If the kick misses, the user hurts itself.",
  type: Types.Fighting,
  category: "Physical",
  pp: 10,
  power: 100,
  accuracy: 95,
  target: TC.Adjacent,
  makesContact: true,
  crash: t => Math.floor(t.stats.hp.value() / 2),
} as const;

export const RollingKick: MoveData<TraditionalBattle> = {
  name: "Rolling Kick",
  description: "The user lashes out with a quick, spinning kick. This may also make the target flinch.",
  type: Types.Fighting,
  category: "Physical",
  pp: 15,
  power: 60,
  accuracy: 85,
  target: TC.Adjacent,
  makesContact: true,
  effect: {
    type: "Status",
    status: Status.Flinch,
    probability: 3 / 10,
  },
} as const;

export const SandAttack: MoveData<TraditionalBattle> = {
  name: "Sand Attack",
  description: "Sand is hurled in the target's face, reducing the target's accuracy.",
  type: Types.Ground,
  category: "Status",
  pp: 15,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "StatMod",
    accuracy: -1,
  },
} as const;

export const Headbutt: MoveData<TraditionalBattle> = {
  name: "Headbutt",
  description:
    "The user sticks out its head and attacks by charging straight into the target. This may also make the target flinch.",
  type: Types.Normal,
  category: "Physical",
  pp: 15,
  power: 70,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  effect: {
    type: "Status",
    status: Status.Flinch,
    probability: 3 / 10,
  },
} as const;

export const HornAttack: MoveData<TraditionalBattle> = {
  name: "Horn Attack",
  description: "The target is jabbed with a sharply pointed horn to inflict damage.",
  type: Types.Normal,
  category: "Physical",
  pp: 25,
  power: 65,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
} as const;

export const FuryAttack: MoveData<TraditionalBattle> = {
  name: "Fury Attack",
  description: "The target is jabbed repeatedly with a horn or beak two to five times in a row.",
  type: Types.Normal,
  category: "Physical",
  pp: 20,
  power: 15,
  accuracy: 85,
  target: TC.Adjacent,
  makesContact: true,
  hitAgain: (hitsSoFar: number) => {
    if (hitsSoFar === 1) return 1;
    if (hitsSoFar === 2) return 0.65;
    if (hitsSoFar === 3) return 0.3;
    if (hitsSoFar === 4) return 0.15;
    return 0;
  },
};

export const HornDrill: MoveData<TraditionalBattle> = {
  name: "Horn Drill",
  description:
    "The user stabs the target with a horn that rotates like a drill. The target faints instantly if this attack hits.",
  type: Types.Normal,
  category: "Physical",
  pp: 5,
  power: 0,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  // TODO somehow
} as const;

export const Tackle: MoveData<TraditionalBattle> = {
  name: "Tackle",
  description: "A physical attack in which the user charges and slams into the target with its whole body.",
  type: Types.Normal,
  category: "Physical",
  pp: 35, // max 56
  power: 40,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
} as const;

export const BodySlam: MoveData<TraditionalBattle> = {
  name: "Body Slam",
  description:
    "The user drops onto the target with its full body weight. This may also leave the target with paralysis.",
  type: Types.Normal,
  category: "Physical",
  pp: 15,
  power: 85,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  effect: {
    type: "Status",
    status: Status.Paralysis,
    probability: 3 / 10,
  },
} as const;

export const Wrap: MoveData<TraditionalBattle> = {
  name: "Wrap",
  description: "A long body, vines, or the like are used to wrap and squeeze the target for four to five turns.",
  type: Types.Normal,
  category: "Physical",
  pp: 20,
  power: 15,
  accuracy: 90,
  target: TC.Adjacent,
  makesContact: true,
  // TODO functionality
};

export const TakeDown: MoveData<TraditionalBattle> = {
  name: "Take Down",
  description: "A reckless, full-body charge attack for slamming into the target. This also damages the user a little.",
  type: Types.Normal,
  category: "Physical",
  pp: 20, // max 32
  power: 90,
  accuracy: 85,
  target: TC.Adjacent,
  makesContact: true,
  recoil: 1 / 4,
} as const;

export const Thrash: MoveData<TraditionalBattle> = {
  name: "Thrash",
  description: "The user rampages and attacks for two to three turns. The user then becomes confused.",
  type: Types.Normal,
  category: "Physical",
  pp: 10,
  power: 120,
  accuracy: 100,
  target: TC.Self,
  makesContact: true,
  effect: {
    type: "Status",
    status: Status.Thrashing,
  },
} as const;

export const DoubleEdge: MoveData<TraditionalBattle> = {
  name: "Double-Edge",
  description:
    "A reckless, life-risking tackle in which the user rushes the target. This also damages the user quite a lot.",
  type: Types.Normal,
  category: "Physical",
  pp: 15, // max 24
  power: 120,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  recoil: 1 / 4,
} as const;

export const TailWhip: MoveData<TraditionalBattle> = {
  name: "Tail Whip",
  description: "The user wags its tail cutely, making opposing Pokémon less wary and lowering their Defense stats.",
  type: Types.Normal,
  category: "Status",
  pp: 30,
  accuracy: 100,
  target: TC.All | TC.Adjacent | TC.Foe,
  makesContact: false,
  effect: {
    type: "StatMod",
    defense: -1,
  },
} as const;

export const PoisonSting: MoveData<TraditionalBattle> = {
  name: "Poison Sting",
  description: "The user stabs the target with a poisonous stinger. This may also poison the target.",
  type: Types.Poison,
  category: "Physical",
  pp: 35,
  power: 15,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Poison,
    probability: 3 / 10,
  },
} as const;

export const Twineedle: MoveData<TraditionalBattle> = {
  name: "Twineedle",
  description:
    "The user damages the target twice in succession by jabbing it with two spikes. This may also poison the target.",
  type: Types.Bug,
  category: "Physical",
  pp: 20,
  power: 25,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Poison,
    probability: 2 / 10,
  },
} as const;

// Note: this move works differently in Legends: Arceus but I don't care.
export const PinMissle: MoveData<TraditionalBattle> = {
  name: "Pin Missile",
  description: "Sharp spikes are shot at the target in rapid succession. They hit two to five times in a row.",
  type: Types.Bug,
  category: "Physical",
  pp: 20,
  power: 25,
  accuracy: 95,
  target: TC.Adjacent,
  makesContact: false,
  hitAgain: (hitsSoFar: number) => {
    if (hitsSoFar === 1) return 1;
    if (hitsSoFar === 2) return 0.65;
    if (hitsSoFar === 3) return 0.3;
    if (hitsSoFar === 4) return 0.15;
    return 0;
  },
} as const;

export const Leer: MoveData<TraditionalBattle> = {
  name: "Leer",
  description: "The user gives opposing Pokémon an intimidating leer that lowers the Defense stat.",
  type: Types.Normal,
  category: "Status",
  pp: 30,
  accuracy: 100,
  target: TC.All | TC.Adjacent | TC.Foe,
  makesContact: false,
  effect: {
    type: "StatMod",
    defense: -1,
  },
} as const;

export const Bite: MoveData<TraditionalBattle> = {
  name: "Bite",
  description: "The target is bitten with viciously sharp fangs. This may also make the target flinch.",
  type: Types.Dark,
  category: "Physical",
  pp: 25, // max 40
  power: 60,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  effect: {
    type: "Status",
    status: Status.Flinch,
    probability: 3 / 10,
  },
} as const;

export const Growl: MoveData<TraditionalBattle> = {
  name: "Growl",
  description:
    "The user growls in an endearing way, making opposing Pokémon less wary. This lowers their Attack stats.",
  type: Types.Normal,
  category: "Status",
  pp: 40, // max 64
  accuracy: 100,
  target: TC.All | TC.Adjacent | TC.Foe,
  makesContact: false,
  effect: {
    type: "StatMod",
    attack: -1,
  },
} as const;

export const Roar: MoveData<TraditionalBattle> = {
  name: "Roar",
  description:
    "The target is scared off, and a different Pokémon is dragged out. In the wild, this ends a battle against a single opponent.",
  type: Types.Normal,
  category: "Status",
  pp: 20,
  accuracy: 100,
  priority: -6,
  target: TC.Adjacent,
  makesContact: false,
  // effect: {
  //   type: "Status",
  //   status: Status.Roared,
  // },
  effect: [] as MoveEffect<TraditionalBattle>[],
} as const;

export const Sing: MoveData<TraditionalBattle> = {
  name: "Sing",
  description: "A soothing lullaby is sung in a calming voice that puts the target into a deep slumber.",
  type: Types.Normal,
  category: "Status",
  pp: 15,
  accuracy: 55,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Sleep,
  },
} as const;

export const Supersonic: MoveData<TraditionalBattle> = {
  name: "Supersonic",
  description: "The user generates odd sound waves from its body that confuse the target.",
  type: Types.Normal,
  category: "Status",
  pp: 20,
  accuracy: 55,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Confusion,
  },
} as const;

export const SonicBoom: MoveData<TraditionalBattle> = {
  name: "Sonic Boom",
  description: "The target is hit with a destructive shock wave that always inflicts 20 HP damage.",
  type: Types.Normal,
  category: "Special",
  pp: 20,
  power: 20,
  accuracy: 90,
  target: TC.Adjacent,
  makesContact: false,
  // effect: {
  //   type: "Damage",
  //   damage: 20,
  // }
  effect: [] as MoveEffect<TraditionalBattle>[],
} as const;

export const Disable: MoveData<TraditionalBattle> = {
  name: "Disable",
  description: "For four turns, this move prevents the target from using the move it last used.",
  type: Types.Normal,
  category: "Status",
  pp: 20,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Restriction",
    // TODO implement restrictions
  },
} as const;

export const Acid: MoveData<TraditionalBattle> = {
  name: "Acid",
  description: "Opposing Pokémon are attacked with a spray of harsh acid. This may also lower their Sp. Def stats.",
  type: Types.Poison,
  category: "Special",
  pp: 30,
  power: 40,
  accuracy: 100,
  target: TC.All | TC.Adjacent | TC.Foe,
  makesContact: false,
  effect: {
    type: "StatMod",
    specialDefense: -1,
    probability: 1 / 10,
  },
} as const;

export const Ember: MoveData<TraditionalBattle> = {
  name: "Ember",
  description: "The target is attacked with small flames. This may also leave the target with a burn.",
  type: Types.Fire,
  category: "Special",
  pp: 25,
  power: 40,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Burn,
    probability: 1 / 10,
  },
} as const;

export const Flamethrower: MoveData<TraditionalBattle> = {
  name: "Flamethrower",
  description: "The target is scorched with an intense blast of fire. This may also leave the target with a burn.",
  type: Types.Fire,
  category: "Special",
  pp: 15,
  power: 90,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Burn,
    probability: 1 / 10,
  },
} as const;

export const Mist: MoveData<TraditionalBattle> = {
  name: "Mist",
  description:
    "The user cloaks itself and its allies in a white mist that prevents any of their stats from being lowered for five turns.",
  type: Types.Ice,
  category: "Status",
  pp: 30,
  accuracy: 100,
  target: TC.All | TC.Ally | TC.Self,
  makesContact: false,
  // effect: {
  //   type: "Status",
  //   status: Status.Mist,
  // },
  effect: [] as MoveEffect<TraditionalBattle>[],
} as const;

export const WaterGun: MoveData<TraditionalBattle> = {
  name: "Water Gun",
  description: "The target is blasted with a forceful shot of water.",
  type: Types.Water,
  category: "Special",
  pp: 25,
  power: 40,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
} as const;

export const HydroPump: MoveData<TraditionalBattle> = {
  name: "Hydro Pump",
  description: "The target is blasted by a huge volume of water launched under great pressure.",
  type: Types.Water,
  category: "Special",
  pp: 5,
  power: 110,
  accuracy: 80,
  target: TC.Adjacent,
  makesContact: false,
} as const;

export const Surf: MoveData<TraditionalBattle> = {
  name: "Surf",
  description: "The user attacks everything around it by swamping its surroundings with a giant wave.",
  type: Types.Water,
  category: "Special",
  pp: 15,
  power: 90,
  accuracy: 100,
  target: TC.All | TC.Adjacent,
  makesContact: false,
} as const;

export const IceBeam: MoveData<TraditionalBattle> = {
  name: "Ice Beam",
  description: "The target is struck with an icy-cold beam of energy. This may also leave the target frozen.",
  type: Types.Ice,
  category: "Special",
  pp: 10,
  power: 90,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Freeze,
    probability: 1 / 10,
  },
} as const;

export const Blizzard: MoveData<TraditionalBattle> = {
  name: "Blizzard",
  description:
    "A howling blizzard is summoned to strike opposing Pokémon. This may also leave the opposing Pokémon frozen.",
  type: Types.Ice,
  category: "Special",
  pp: 5,
  power: 110,
  accuracy: 70,
  target: TC.All | TC.Adjacent | TC.Foe,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Freeze,
    probability: 1 / 10,
  },
} as const;

export const Psybeam: MoveData<TraditionalBattle> = {
  name: "Psybeam",
  description: "The target is attacked with a peculiar ray. This may also leave the target confused.",
  type: Types.Psychic,
  category: "Special",
  pp: 20,
  power: 65,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Confusion,
    probability: 1 / 10,
  },
} as const;

export const BubbleBeam: MoveData<TraditionalBattle> = {
  name: "Bubble Beam",
  description: "A spray of bubbles is forcefully ejected at the target. This may also lower the target's Speed stat.",
  type: Types.Water,
  category: "Special",
  pp: 20,
  power: 65,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "StatMod",
    speed: -1,
    probability: 1 / 10,
  },
} as const;

export const AuroraBeam: MoveData<TraditionalBattle> = {
  name: "Aurora Beam",
  description: "The target is hit with a rainbow-colored beam. This may also lower the target's Attack stat.",
  type: Types.Ice,
  category: "Special",
  pp: 20,
  power: 65,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "StatMod",
    attack: -1,
    probability: 1 / 10,
  },
} as const;

export const HyperBeam: MoveData<TraditionalBattle> = {
  name: "Hyper Beam",
  description: "The target is attacked with a powerful beam. The user can't move on the next turn.",
  type: Types.Normal,
  category: "Special",
  pp: 5,
  power: 150,
  accuracy: 90,
  target: TC.Adjacent,
  makesContact: false,
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO functionality
} as const;

export const Peck: MoveData<TraditionalBattle> = {
  name: "Peck",
  description: "The target is jabbed with a sharply pointed beak or horn.",
  type: Types.Flying,
  category: "Physical",
  pp: 35,
  power: 35,
  accuracy: 100,
  target: TC.Foe | TC.Ally,
  makesContact: true,
} as const;

export const DrillPeck: MoveData<TraditionalBattle> = {
  name: "Drill Peck",
  description: "A corkscrewing attack that strikes the target with a sharp beak acting as a drill.",
  type: Types.Flying,
  category: "Physical",
  pp: 20,
  power: 80,
  accuracy: 100,
  target: TC.Foe | TC.Ally,
  makesContact: true,
} as const;

export const Submission: MoveData<TraditionalBattle> = {
  name: "Submission",
  description: "The user grabs the target and recklessly dives for the ground. This also damages the user a little.",
  type: Types.Fighting,
  category: "Physical",
  pp: 20,
  power: 80,
  accuracy: 80,
  target: TC.Adjacent,
  makesContact: true,
  recoil: 1 / 4,
} as const;

export const LowKick: MoveData<TraditionalBattle> = {
  name: "Low Kick",
  description:
    "A powerful low kick that makes the target fall over. The heavier the target, the greater the move's power.",
  type: Types.Fighting,
  category: "Physical",
  pp: 20,
  power: 0,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  // TODO somehow
} as const;

export const Counter: MoveData<TraditionalBattle> = {
  name: "Counter",
  description: "A retaliation move that counters any physical attack, inflicting double the damage taken.",
  type: Types.Fighting,
  category: "Physical",
  pp: 20,
  power: 0,
  accuracy: 100,
  priority: -5,
  target: TC.Self,
  makesContact: true,
  // TODO somehow
} as const;

export const SeismicToss: MoveData<TraditionalBattle> = {
  name: "Seismic Toss",
  description: "The target is thrown using the power of gravity. It inflicts damage equal to the user's level.",
  type: Types.Fighting,
  category: "Physical",
  pp: 20,
  power: 0,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  // TODO somehow
} as const;

export const Strength: MoveData<TraditionalBattle> = {
  name: "Strength",
  description: "The target is slugged with a punch thrown at maximum power.",
  type: Types.Normal,
  category: "Physical",
  pp: 15,
  power: 80,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
} as const;

export const Absorb: MoveData<TraditionalBattle> = {
  name: "Absorb",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: Types.Grass,
  category: "Special",
  pp: 20,
  power: 20,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  // effect: {
  //   type: "Heal",
  //   amount: 1 / 2,
  // },
  effect: [] as MoveEffect<TraditionalBattle>[],
} as const;

export const MegaDrain: MoveData<TraditionalBattle> = {
  name: "Mega Drain",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: Types.Grass,
  category: "Special",
  pp: 15,
  power: 40,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  // effect: {
  //   type: "Heal",
  //   amount: 1 / 2,
  // },
  effect: [] as MoveEffect<TraditionalBattle>[],
} as const;

export const LeechSeed: MoveData<TraditionalBattle> = {
  name: "Leech Seed",
  description: "A seed is planted on the target. It steals some HP from the target every turn.",
  type: Types.Grass,
  category: "Status",
  pp: 10, // max 16
  accuracy: 90,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.LeechSeed,
  },
} as const;

export const Growth: MoveData<TraditionalBattle> = {
  name: "Growth",
  description: "The user's body grows all at once, raising the Attack and Sp. Atk stats.",
  type: Types.Normal,
  category: "Status",
  pp: 20, // max 32
  accuracy: 100,
  target: TC.Self,
  makesContact: false,
  effect: {
    type: "StatMod",
    attack: 1,
    specialAttack: 1,
  },
} as const;

export const RazorLeaf: MoveData<TraditionalBattle> = {
  name: "Razor Leaf",
  description: "Sharp-edged leaves are launched to slash at opposing Pokémon. Critical hits land more easily.",
  type: Types.Grass,
  category: "Physical",
  pp: 25, // max 40
  power: 55,
  accuracy: 95,
  target: TC.All | TC.Adjacent | TC.Foe,
  makesContact: false,
  criticalHitStage: 1,
} as const;

export const SolarBeam: MoveData<TraditionalBattle> = {
  name: "Solar Beam",
  description: "In this two-turn attack, the user gathers light, then blasts a bundled beam on the next turn.",
  type: Types.Grass,
  category: "Special",
  pp: 10, // max 16
  power: 120,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  // TODO functionality
} as const;

export const PoisonPowder: MoveData<TraditionalBattle> = {
  name: "Poison Powder",
  description: "The user scatters a cloud of poisonous dust that poisons the target.",
  type: Types.Poison,
  category: "Status",
  pp: 35, // max 56
  accuracy: 75,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Poison,
  },
} as const;

export const StunSpore: MoveData<TraditionalBattle> = {
  name: "Stun Spore",
  description: "The user scatters a cloud of numbing powder that paralyzes the target.",
  type: Types.Grass,
  category: "Status",
  pp: 30, // max 48
  accuracy: 75,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Paralysis,
  },
} as const;

export const SleepPowder: MoveData<TraditionalBattle> = {
  name: "Sleep Powder",
  description: "The user scatters a big cloud of sleep-inducing dust around the target.",
  type: Types.Grass,
  category: "Status",
  pp: 15, // max 24
  accuracy: 75,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Sleep,
  },
} as const;

export const PetalDance: MoveData<TraditionalBattle> = {
  name: "Petal Dance",
  description: "The user attacks the target with sharp petals that land on the target.",
  type: Types.Grass,
  category: "Physical",
  pp: 10, // max 16
  power: 120,
  accuracy: 100,
  target: TC.Self,
  makesContact: true,
  // TODO functionality
} as const;

export const StringShot: MoveData<TraditionalBattle> = {
  name: "String Shot",
  description: "Opposing Pokémon are bound with silk blown from the user's mouth that harshly lowers the Speed stat.",
  type: Types.Bug,
  category: "Status",
  pp: 40, // max 64
  accuracy: 95,
  target: TC.All | TC.Adjacent | TC.Foe,
  makesContact: false,
  effect: {
    type: "StatMod",
    speed: -2,
  },
} as const;

export const DragonRage: MoveData<TraditionalBattle> = {
  name: "Dragon Rage",
  description: "This attack hits the target with a shock wave of pure rage. This attack always inflicts 40 HP damage.",
  type: Types.Dragon,
  category: "Physical",
  pp: 10, // max 16
  power: 0,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  // effect: {
  //   type: "Damage",
  //   damage: 40,
  // },
} as const;

export const FireSpin: MoveData<TraditionalBattle> = {
  name: "Fire Spin",
  description: "The target becomes trapped within a fierce vortex of fire that rages for four to five turns.",
  type: Types.Fire,
  category: "Special",
  pp: 15, // max 24
  power: 35,
  accuracy: 85,
  target: TC.Adjacent,
  makesContact: false,
  // TODO functionality
} as const;

export const ThunderShock: MoveData<TraditionalBattle> = {
  name: "Thunder Shock",
  description:
    "A jolt of electricity crashes down on the target to inflict damage. This may also leave the target with paralysis.",
  type: Types.Electric,
  category: "Special",
  pp: 30, // max 48
  power: 40,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Paralysis,
    probability: 1 / 10,
  },
} as const;

export const Thunderbolt: MoveData<TraditionalBattle> = {
  name: "Thunderbolt",
  description: "A strong electric blast crashes down on the target. This may also leave the target with paralysis.",
  type: Types.Electric,
  category: "Special",
  pp: 15, // max 24
  power: 90,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Paralysis,
    probability: 1 / 10,
  },
} as const;

export const ThunderWave: MoveData<TraditionalBattle> = {
  name: "Thunder Wave",
  description: "The user launches a weak jolt of electricity that paralyzes the target.",
  type: Types.Electric,
  category: "Status",
  pp: 20, // max 32
  accuracy: 90,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Paralysis,
  },
} as const;

export const Thunder: MoveData<TraditionalBattle> = {
  name: "Thunder",
  description:
    "A wicked thunderbolt is dropped on the target to inflict damage. This may also leave the target with paralysis.",
  type: Types.Electric,
  category: "Physical",
  pp: 10, // max 16
  power: 110,
  accuracy: 70,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Paralysis,
    probability: 1 / 10,
  },
} as const;

export const RockThrow: MoveData<TraditionalBattle> = {
  name: "Rock Throw",
  description: "The user picks up and throws a small rock at the target to attack.",
  type: Types.Rock,
  category: "Physical",
  pp: 15, // max 24
  power: 50,
  accuracy: 90,
  target: TC.Adjacent,
  makesContact: false,
} as const;

export const Earthquake: MoveData<TraditionalBattle> = {
  name: "Earthquake",
  description: "The user sets off an earthquake that strikes every Pokémon around it.",
  type: Types.Ground,
  category: "Physical",
  pp: 10, // max 16
  power: 100,
  accuracy: 100,
  target: TC.All | TC.Adjacent,
  makesContact: false,
} as const;

export const Fissure: MoveData<TraditionalBattle> = {
  name: "Fissure",
  description:
    "The user opens up a fissure in the ground and drops the target in. The target faints instantly if this attack hits.",
  type: Types.Ground,
  category: "Physical",
  pp: 5, // max 8
  power: 0,
  accuracy: 30,
  target: TC.Adjacent,
  makesContact: false,
  // effect: {
  //   type: "Faint",
  // },
} as const;

export const Dig: MoveData<TraditionalBattle> = {
  name: "Dig",
  description: "The user burrows into the ground, then attacks on the next turn.",
  type: Types.Ground,
  category: "Physical",
  pp: 10, // max 16
  power: 80,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  effect: {
    type: "Status",
    status: Status.SemiInvulnerableTurn,
  },
  // TODO functionality
} as const;

export const Toxic: MoveData<TraditionalBattle> = {
  name: "Toxic",
  description: "A move that leaves the target badly poisoned. Its poison damage worsens every turn.",
  type: Types.Poison,
  category: "Status",
  pp: 10, // max 16
  accuracy: 90,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.BadlyPoisoned,
  },
} as const;

export const Confusion: MoveData<TraditionalBattle> = {
  name: "Confusion",
  description: "The target is hit by a weak telekinetic force. This may also confuse the target.",
  type: Types.Psychic,
  category: "Special",
  pp: 25, // max 40
  power: 50,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Confusion,
    probability: 1 / 10,
  },
} as const;

export const Psychic: MoveData<TraditionalBattle> = {
  name: "Psychic",
  description: "The target is hit by a strong telekinetic force. This may also lower the target's Sp. Def stat.",
  type: Types.Psychic,
  category: "Special",
  pp: 10, // max 16
  power: 90,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "StatMod",
    specialDefense: -1,
    probability: 1 / 10,
  },
} as const;

export const Hypnosis: MoveData<TraditionalBattle> = {
  name: "Hypnosis",
  description: "The user employs hypnotic suggestion to make the target fall into a deep sleep.",
  type: Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  accuracy: 60,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Sleep,
    probability: 1 / 10,
  },
} as const;

export const Meditate: MoveData<TraditionalBattle> = {
  name: "Meditate",
  description: "The user meditates to awaken the power deep within its body and raise its Attack stat.",
  type: Types.Psychic,
  category: "Status",
  pp: 40, // max 64
  accuracy: 100,
  target: TC.Self,
  makesContact: false,
  effect: {
    type: "StatMod",
    attack: 1,
  },
} as const;

export const Agility: MoveData<TraditionalBattle> = {
  name: "Agility",
  description: "The user relaxes and lightens its body to move faster. This sharply raises the Speed stat.",
  type: Types.Psychic,
  category: "Status",
  pp: 30, // max 48
  accuracy: 100,
  target: TC.Self,
  makesContact: false,
  effect: {
    type: "StatMod",
    speed: 2,
  },
} as const;

export const QuickAttack: MoveData<TraditionalBattle> = {
  name: "Quick Attack",
  description: "The user lunges at the target at a speed that makes it almost invisible. This move always goes first.",
  type: Types.Normal,
  category: "Physical",
  pp: 30, // max 48
  power: 40,
  accuracy: 100,
  priority: 1,
  target: TC.Adjacent,
  makesContact: true,
} as const;

export const Rage: MoveData<TraditionalBattle> = {
  name: "Rage",
  description:
    "As long as this move is in use, the power of rage raises the Attack stat each time the user is hit in battle.",
  type: Types.Normal,
  category: "Physical",
  pp: 20, // max 32
  power: 20,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  // TODO functionality
} as const;

export const Teleport: MoveData<TraditionalBattle> = {
  name: "Teleport",
  description:
    "The user switches places with another party Pokémon. It may also be used to warp to the last Pokémon Center visited. If a wild Pokémon uses this move, it flees.",
  type: Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  accuracy: 100,
  priority: -6,
  target: TC.Self,
  makesContact: false,
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO functionality
} as const;

export const NightShade: MoveData<TraditionalBattle> = {
  name: "Night Shade",
  description: "The user makes the target see a frightening mirage. It inflicts damage equal to the user's level.",
  type: Types.Ghost,
  category: "Special",
  pp: 15, // max 24
  power: 0,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO functionality
} as const;

export const Mimic: MoveData<TraditionalBattle> = {
  name: "Mimic",
  description:
    "The user copies the target's last move. The move can be used during battle until the Pokémon is switched out.",
  type: Types.Normal,
  category: "Status",
  pp: 10, // max 16
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  // effect: {
  //   type: "Mimic",
  // },
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO functionality
} as const;

// why isn't this a status move apdabiouaboduiboiuafb
export const Screech: MoveData<TraditionalBattle> = {
  name: "Screech",
  description: "An earsplitting screech harshly lowers the target's Defense stat.",
  type: Types.Normal,
  category: "Special",
  pp: 40, // max 64
  power: 0,
  accuracy: 85,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "StatMod",
    defense: -2,
  },
} as const;

export const DoubleTeam: MoveData<TraditionalBattle> = {
  name: "Double Team",
  description: "By moving rapidly, the user makes illusory copies of itself to raise its evasiveness.",
  type: Types.Normal,
  category: "Status",
  pp: 15, // max 24
  accuracy: 100,
  target: TC.Self,
  makesContact: false,
  effect: {
    type: "StatMod",
    evasion: 1,
  },
} as const;

export const Recover: MoveData<TraditionalBattle> = {
  name: "Recover",
  description: "Restoring its own cells, the user restores its own HP by half of its max HP.",
  type: Types.Normal,
  category: "Status",
  pp: 10, // max 16
  accuracy: 100,
  target: TC.Self,
  makesContact: false,
  // effect: {
  //   type: "Heal",
  //   amount: "half",
  // },
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO functionality
} as const;

export const Harden: MoveData<TraditionalBattle> = {
  name: "Harden",
  description: "The user stiffens all the muscles in its body to raise its Defense stat.",
  type: Types.Normal,
  category: "Status",
  pp: 30, // max 48
  accuracy: 100,
  target: TC.Self,
  makesContact: false,
  effect: {
    type: "StatMod",
    defense: 1,
  },
} as const;

export const Minimize: MoveData<TraditionalBattle> = {
  name: "Minimize",
  description: "The user compresses its body to make itself look smaller, which sharply raises its evasiveness.",
  type: Types.Normal,
  category: "Status",
  pp: 10, // max 16
  accuracy: 100,
  target: TC.Self,
  makesContact: false,
  effect: [
    {
      type: "Status",
      status: Status.Minimize,
    },
    {
      type: "StatMod",
      evasion: 2,
    },
  ] as MoveEffect<TraditionalBattle>[],
} as const;

export const Smokescreen: MoveData<TraditionalBattle> = {
  name: "Smokescreen",
  description: "The user releases an obscuring cloud of smoke or ink. This lowers the target's accuracy.",
  type: Types.Normal,
  category: "Status",
  pp: 20, // max 32
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "StatMod",
    accuracy: -1,
  },
} as const;

export const ConfuseRay: MoveData<TraditionalBattle> = {
  name: "Confuse Ray",
  description: "The target is exposed to a sinister ray that triggers confusion.",
  type: Types.Ghost,
  category: "Status",
  pp: 10, // max 16
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Confusion,
  },
} as const;

export const Withdraw: MoveData<TraditionalBattle> = {
  name: "Withdraw",
  description: "The user withdraws its body into its hard shell, raising its Defense stat.",
  type: Types.Water,
  category: "Status",
  pp: 40, // max 64
  accuracy: 100,
  target: TC.Self,
  makesContact: false,
  effect: {
    type: "StatMod",
    defense: 1,
  },
} as const;

export const DefenseCurl: MoveData<TraditionalBattle> = {
  name: "Defense Curl",
  description: "The user curls up to conceal weak spots and raise its Defense stat.",
  type: Types.Normal,
  category: "Status",
  pp: 40, // max 64
  accuracy: 100,
  target: TC.Self,
  makesContact: false,
  effect: {
    type: "StatMod",
    defense: 1,
  },
  // TODO functionality
} as const;

export const Barrier: MoveData<TraditionalBattle> = {
  name: "Barrier",
  description: "The user throws up a sturdy wall that sharply raises its Defense stat.",
  type: Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  accuracy: 100,
  target: TC.Self,
  makesContact: false,
  effect: {
    type: "StatMod",
    defense: 2,
  },
} as const;

export const LightScreen: MoveData<TraditionalBattle> = {
  name: "Light Screen",
  description: "A wondrous wall of light is put up to reduce damage from special attacks for five turns.",
  type: Types.Psychic,
  category: "Status",
  pp: 30, // max 48
  accuracy: 100,
  target: TC.All | TC.Self | TC.Ally,
  makesContact: false,
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO functionality
} as const;

export const Haze: MoveData<TraditionalBattle> = {
  name: "Haze",
  description: "The user creates a haze that eliminates every stat change among all the Pokémon engaged in battle.",
  type: Types.Ice,
  category: "Status",
  pp: 30, // max 48
  accuracy: 100,
  target: TC.All,
  makesContact: false,
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO functionality
} as const;

export const Reflect: MoveData<TraditionalBattle> = {
  name: "Reflect",
  description: "A wondrous wall of light is put up to reduce damage from physical attacks for five turns.",
  type: Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  accuracy: 100,
  target: TC.All | TC.Self | TC.Ally,
  makesContact: false,
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO functionality
} as const;

export const FocusEnergy: MoveData<TraditionalBattle> = {
  name: "Focus Energy",
  description: "The user takes a deep breath and focuses so that critical hits land more easily.",
  type: Types.Normal,
  category: "Status",
  pp: 30, // max 48
  accuracy: 100,
  target: TC.Self,
  makesContact: false,
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO functionality
} as const;

export const Bide: MoveData<TraditionalBattle> = {
  name: "Bide",
  description: "The user endures attacks for two turns, then strikes back to cause double the damage taken.",
  type: Types.Normal,
  category: "Physical",
  pp: 10, // max 16
  power: 0,
  accuracy: 100,
  priority: 1,
  target: TC.Self,
  makesContact: true,
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO functionality
} as const;

export const Metronone: MoveData<TraditionalBattle> = {
  name: "Metronome",
  description: "The user waggles a finger and stimulates its brain into randomly using nearly any move.",
  type: Types.Normal,
  category: "Status",
  pp: 10, // max 16
  accuracy: 100,
  target: TC.Self,
  makesContact: false,
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO functionality
} as const;

export const MirrorMove: MoveData<TraditionalBattle> = {
  name: "Mirror Move",
  description: "The user counters the target by mimicking the target's last move.",
  type: Types.Flying,
  category: "Status",
  pp: 20, // max 32
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO functionality
};
// 120	Self-Destruct	Normal	Physical	5	200*	100%	I
// 121	Egg Bomb	Normal	Physical	10	100	75%	I
// 122	Lick	Ghost	Physical	30	30*	100%	I
// 123	Smog	Poison	Special	20	30*	70%	I
// 124	Sludge	Poison	Special	20	65	100%	I
// 125	Bone Club	Ground	Physical	20	65	85%	I
// 126	Fire Blast	Fire	Special	5	110*	85%	I
// 127	Waterfall	Water	Physical	15	80	100%	I
// 128	Clamp	Water	Physical	15*	35	85%*	I
// 129	Swift	Normal	Special	20	60	—	I
// 130	Skull Bash	Normal	Physical	10*	130*	100%	I
// 131	Spike Cannon	Normal	Physical	15	20	100%	I
// 132	Constrict	Normal	Physical	35	10	100%	I
// 133	Amnesia	Psychic	Status	20	—	—	I
// 134	Kinesis	Psychic	Status	15	—	80%	I
// 135	Soft-Boiled	Normal	Status	10	—	—	I
// 136	High Jump Kick	Fighting	Physical	10*	130*	90%	I
// 137	Glare	Normal	Status	30	—	100%*	I
// 138	Dream Eater	Psychic	Special	15	100	100%	I
// 139	Poison Gas	Poison	Status	40	—	90%*	I
// 140	Barrage	Normal	Physical	20	15	85%	I
// 141	Leech Life	Bug	Physical	10*	80*	100%	I
// 142	Lovely Kiss	Normal	Status	10	—	75%	I
// 143	Sky Attack	Flying	Physical	5	140*	90%	I
// 144	Transform	Normal	Status	10	—	—	I
// 145	Bubble	Water	Special	30	40*	100%	I
// 146	Dizzy Punch	Normal	Physical	10	70	100%	I
// 147	Spore	Grass	Status	15	—	100%	I
// 148	Flash	Normal	Status	20	—	100%*	I
// 149	Psywave	Psychic	Special	15	—	100%*	I
// 150	Splash	Normal	Status	40	—	—	I
// 151	Acid Armor	Poison	Status	20*	—	—	I
// 152	Crabhammer	Water	Physical	10	100*	90%*	I
// 153	Explosion	Normal	Physical	5	250*	100%	I
// 154	Fury Swipes	Normal	Physical	15	18	80%	I
// 155	Bonemerang	Ground	Physical	10	50	90%	I
// 156	Rest	Psychic	Status	10	—	—	I
// 157	Rock Slide	Rock	Physical	10	75	90%	I
// 158	Hyper Fang	Normal	Physical	15	80	90%	I
// 159	Sharpen	Normal	Status	30	—	—	I
// 160	Conversion	Normal	Status	30	—	—	I
// 161	Tri Attack	Normal	Special	10	80	100%	I
// 162	Super Fang	Normal	Physical	10	—	90%	I
export const Slash: MoveData<TraditionalBattle> = {
  name: "Slash",
  description: "The target is attacked with a slash of claws or blades. Critical hits land more easily.",
  type: Types.Normal,
  category: "Physical",
  pp: 20,
  power: 70,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  criticalHitStage: 1,
} as const;

// 164	Substitute	Normal	Status	10	—	—	I
// 165	Struggle	Normal	Physical	1*	50	—*	I
// 166	Sketch	Normal	Status	1	—	—	II
// 167	Triple Kick	Fighting	Physical	10	10	90%	II
// 168	Thief	Dark	Physical	25*	60*	100%	II
// 169	Spider Web	Bug	Status	10	—	—	II
// 170	Mind Reader	Normal	Status	5	—	—*	II
// 171	Nightmare	Ghost	Status	15	—	100%	II
// 172	Flame Wheel	Fire	Physical	25	60	100%	II
// 173	Snore	Normal	Special	15	50*	100%	II
// 174	Curse*	Ghost	Status	10	—	—	II
// 175	Flail	Normal	Physical	15	—	100%	II
// 176	Conversion 2	Normal	Status	30	—	—	II
// 177	Aeroblast	Flying	Special	5	100	95%	II
// 178	Cotton Spore	Grass	Status	40	—	100%*	II
// 179	Reversal	Fighting	Physical	15	—	100%	II
// 180	Spite	Ghost	Status	10	—	100%	II
// 181	Powder Snow	Ice	Special	25	40	100%	II
// 182	Protect	Normal	Status	10	—	—	II
// 183	Mach Punch	Fighting	Physical	30	40	100%	II
// 184	Scary Face	Normal	Status	10	—	100%*	II
// 185	Feint Attack	Dark	Physical	20	60	—	II
// 186	Sweet Kiss*	Fairy	Status	10	—	75%	II
// 187	Belly Drum	Normal	Status	10	—	—	II
// 188	Sludge Bomb	Poison	Special	10	90	100%	II
// 189	Mud-Slap	Ground	Special	10	20	100%	II
// 190	Octazooka	Water	Special	10	65	85%	II
// 191	Spikes	Ground	Status	20	—	—	II
// 192	Zap Cannon	Electric	Special	5	120*	50%	II
// 193	Foresight	Normal	Status	40	—	—*	II
// 194	Destiny Bond	Ghost	Status	5	—	—	II
// 195	Perish Song	Normal	Status	5	—	—	II
// 196	Icy Wind	Ice	Special	15	55	95%	II
// 197	Detect	Fighting	Status	5	—	—	II
// 198	Bone Rush	Ground	Physical	10	25	90%*	II
// 199	Lock-On	Normal	Status	5	—	—*	II
// 200	Outrage	Dragon	Physical	10*	120*	100%	II
export const Sandstorm: MoveData<TraditionalBattle> = {
  name: "Sandstorm",
  description:
    "A five-turn sandstorm is summoned to hurt all combatants except the Rock, Ground, and Steel types. It raises the Sp. Def stat of Rock types.",
  type: Types.Rock,
  category: "Status",
  pp: 10,
  accuracy: 0,
  target: TC.All,
  makesContact: false,
  effect: {
    type: "Weather",
    weather: "Sandstorm",
  },
  // effect: {
  //   duration: 5,
  //   onStart: (battle: Battle, caster: Pokemon, target: Pokemon) => {
  //     battle.addPseudoWeather(PW.Sandstorm);
  //   }
  // }
  // TODO functionality
} as const;
// 202	Giga Drain	Grass	Special	10*	75*	100%	II
// 203	Endure	Normal	Status	10	—	—	II
// 204	Charm*	Fairy	Status	20	—	100%	II
// 205	Rollout	Rock	Physical	20	30	90%	II
// 206	False Swipe	Normal	Physical	40	40	100%	II
// 207	Swagger	Normal	Status	15	—	85%*	II
// 208	Milk Drink	Normal	Status	10	—	—	II
// 209	Spark	Electric	Physical	20	65	100%	II
// 210	Fury Cutter	Bug	Physical	20	40*	95%	II
// 211	Steel Wing	Steel	Physical	25	70	90%	II
// 212	Mean Look	Normal	Status	5	—	—	II
// 213	Attract	Normal	Status	15	—	100%	II
// 214	Sleep Talk	Normal	Status	10	—	—	II
// 215	Heal Bell	Normal	Status	5	—	—	II
// 216	Return	Normal	Physical	20	—	100%	II
// 217	Present	Normal	Physical	15	—	90%	II
// 218	Frustration	Normal	Physical	20	—	100%	II
// 219	Safeguard	Normal	Status	25	—	—	II
// 220	Pain Split	Normal	Status	20	—	—*	II
// 221	Sacred Fire	Fire	Physical	5	100	95%	II
// 222	Magnitude	Ground	Physical	30	—	100%	II
// 223	Dynamic Punch	Fighting	Physical	5	100	50%	II
// 224	Megahorn	Bug	Physical	10	120	85%	II
export const DragonBreath: MoveData<TraditionalBattle> = {
  name: "Dragon Breath",
  description: "The user exhales a mighty gust that inflicts damage. This may also leave the target with paralysis.",
  type: Types.Dragon,
  category: "Special",
  pp: 20,
  power: 60,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: {
    type: "Status",
    status: Status.Paralysis,
    probability: 3 / 10,
  },
} as const;
// 226	Baton Pass	Normal	Status	40	—	—	II
// 227	Encore	Normal	Status	5	—	100%	II
// 228	Pursuit	Dark	Physical	20	40	100%	II
// 229	Rapid Spin	Normal	Physical	40	50*	100%	II
export const SweetScent: MoveData<TraditionalBattle> = {
  name: "Sweet Scent",
  description: "A sweet scent that harshly lowers opposing Pokémon's evasiveness.",
  type: Types.Normal,
  category: "Status",
  pp: 20, // max 32
  accuracy: 100,
  target: TC.Adjacent | TC.Foe,
  makesContact: false,
  effect: {
    type: "StatMod",
    evasion: -2,
  },
} as const;
// 231	Iron Tail	Steel	Physical	15	100	75%	II
// 232	Metal Claw	Steel	Physical	35	50	95%	II
// 233	Vital Throw	Fighting	Physical	10	70	—	II
// 234	Morning Sun	Normal	Status	5	—	—	II
export const Synthesis: MoveData<TraditionalBattle> = {
  name: "Synthesis",
  description: "The user restores its own HP. The amount of HP regained varies with the weather.",
  type: Types.Grass,
  category: "Status",
  pp: 5, // max 8
  accuracy: 100,
  target: TC.Self,
  makesContact: false,
  effect: [] as MoveEffect<TraditionalBattle>[],
  // effect: {
  //   type: "Heal",
  //   amount: (battle: Battle, user: Pokemon) => {
  //     const weather = battle.getWeather();
  //     if (weather === Weather.Sunny) {
  //       return user.maxHP / 4;
  //     } else if (weather === Weather.Rain) {
  //       return user.maxHP / 8;
  //     }
  //     return 0;
  //   }
  // }
  // TODO functionality
} as const;

// 236	Moonlight*	Fairy	Status	5	—	—	II
// 237	Hidden Power	Normal	Special	15	60*	100%	II
// 238	Cross Chop	Fighting	Physical	5	100	80%	II
// 239	Twister	Dragon	Special	20	40	100%	II
// 240	Rain Dance	Water	Status	5	—	—	II
// 241	Sunny Day	Fire	Status	5	—	—	II
export const Crunch: MoveData<TraditionalBattle> = {
  name: "Crunch",
  description: "The user crunches up the target with sharp fangs. This may also lower the target's Defense stat.",
  type: Types.Dark,
  category: "Physical",
  pp: 15, // max 24
  power: 80,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
  effect: {
    type: "StatMod",
    defense: -1,
    probability: 2 / 10,
  },
} as const;
// 243	Mirror Coat	Psychic	Special	20	—	100%	II
// 244	Psych Up	Normal	Status	10	—	—	II
// 245	Extreme Speed	Normal	Physical	5	80	100%	II
// 246	Ancient Power	Rock	Special	5	60	100%	II
// 247	Shadow Ball	Ghost	Special	15	80	100%	II
// 248	Future Sight	Psychic	Special	10*	120*	100%*	II
// 249	Rock Smash	Fighting	Physical	15	40*	100%	II
// 250	Whirlpool	Water	Special	15	35*	85%*	II
// 251	Beat Up	Dark	Physical	10	—*	100%	II
// 252	Fake Out	Normal	Physical	10	40	100%	III
// 253	Uproar	Normal	Special	10	90*	100%	III
// 254	Stockpile	Normal	Status	20*	—	—	III
// 255	Spit Up	Normal	Special	10	—	100%	III
// 256	Swallow	Normal	Status	10	—	—	III
// 257	Heat Wave	Fire	Special	10	95*	90%	III
// 258	Hail	Ice	Status	10	—	—	III
// 259	Torment	Dark	Status	15	—	100%	III
// 260	Flatter	Dark	Status	15	—	100%	III
// 261	Will-O-Wisp	Fire	Status	15	—	85%*	III
// 262	Memento	Dark	Status	10	—	100%	III
// 263	Facade	Normal	Physical	20	70	100%	III
// 264	Focus Punch	Fighting	Physical	20	150	100%	III
// 265	Smelling Salts	Normal	Physical	10	70*	100%	III
// 266	Follow Me	Normal	Status	20	—	—	III
// 267	Nature Power	Normal	Status	20	—	—	III
// 268	Charge	Electric	Status	20	—	—	III
// 269	Taunt	Dark	Status	20	—	100%	III
// 270	Helping Hand	Normal	Status	20	—	—	III
// 271	Trick	Psychic	Status	10	—	100%	III
// 272	Role Play	Psychic	Status	10	—	—	III
// 273	Wish	Normal	Status	10	—	—	III
// 274	Assist	Normal	Status	20	—	—	III
// 275	Ingrain	Grass	Status	20	—	—	III
// 276	Superpower	Fighting	Physical	5	120	100%	III
// 277	Magic Coat	Psychic	Status	15	—	—	III
// 278	Recycle	Normal	Status	10	—	—	III
// 279	Revenge	Fighting	Physical	10	60	100%	III
// 280	Brick Break	Fighting	Physical	15	75	100%	III
// 281	Yawn	Normal	Status	10	—	—	III
// 282	Knock Off	Dark	Physical	20	65*	100%	III
// 283	Endeavor	Normal	Physical	5	—	100%	III
// 284	Eruption	Fire	Special	5	150	100%	III
// 285	Skill Swap	Psychic	Status	10	—	—	III
// 286	Imprison	Psychic	Status	10	—	—	III
// 287	Refresh	Normal	Status	20	—	—	III
// 288	Grudge	Ghost	Status	5	—	—	III
// 289	Snatch	Dark	Status	10	—	—	III
// 290	Secret Power	Normal	Physical	20	70	100%	III
// 291	Dive	Water	Physical	10	80*	100%	III
// 292	Arm Thrust	Fighting	Physical	20	15	100%	III
// 293	Camouflage	Normal	Status	20	—	—	III
// 294	Tail Glow	Bug	Status	20	—	—	III
// 295	Luster Purge	Psychic	Special	5	70	100%	III
// 296	Mist Ball	Psychic	Special	5	70	100%	III
// 297	Feather Dance	Flying	Status	15	—	100%	III
// 298	Teeter Dance	Normal	Status	20	—	100%	III
// 299	Blaze Kick	Fire	Physical	10	85	90%	III
// 300	Mud Sport	Ground	Status	15	—	—	III
// 301	Ice Ball	Ice	Physical	20	30	90%	III
// 302	Needle Arm	Grass	Physical	15	60	100%	III
// 303	Slack Off	Normal	Status	10	—	—	III
// 304	Hyper Voice	Normal	Special	10	90	100%	III
// 305	Poison Fang	Poison	Physical	15	50	100%	III
// 306	Crush Claw	Normal	Physical	10	75	95%	III
// 307	Blast Burn	Fire	Special	5	150	90%	III
// 308	Hydro Cannon	Water	Special	5	150	90%	III
// 309	Meteor Mash	Steel	Physical	10	90*	90%*	III
// 310	Astonish	Ghost	Physical	15	30	100%	III
// 311	Weather Ball	Normal	Special	10	50	100%	III
// 312	Aromatherapy	Grass	Status	5	—	—	III
// 313	Fake Tears	Dark	Status	20	—	100%	III
// 314	Air Cutter	Flying	Special	25	60*	95%	III
// 315	Overheat	Fire	Special	5	130*	90%	III
// 316	Odor Sleuth	Normal	Status	40	—	—*	III
// 317	Rock Tomb	Rock	Physical	15*	60*	95%*	III
// 318	Silver Wind	Bug	Special	5	60	100%	III
// 319	Metal Sound	Steel	Status	40	—	85%	III
// 320	Grass Whistle	Grass	Status	15	—	55%	III
// 321	Tickle	Normal	Status	20	—	100%	III
// 322	Cosmic Power	Psychic	Status	20	—	—	III
// 323	Water Spout	Water	Special	5	150	100%	III
// 324	Signal Beam	Bug	Special	15	75	100%	III
// 325	Shadow Punch	Ghost	Physical	20	60	—	III
// 326	Extrasensory	Psychic	Special	20*	80	100%	III
// 327	Sky Uppercut	Fighting	Physical	15	85	90%	III
export const SandTomb: MoveData<TraditionalBattle> = {
  name: "Sand Tomb",
  description: "The user traps the target inside a harshly raging sandstorm for four to five turns.",
  type: Types.Ground,
  category: "Physical",
  pp: 15, // max 24
  power: 35,
  accuracy: 85,
  target: TC.Adjacent,
  makesContact: false,
  // TODO functionality
} as const;
// 329	Sheer Cold	Ice	Special	5	—	30%	III
// 330	Muddy Water	Water	Special	10	90*	85%	III
// 331	Bullet Seed	Grass	Physical	30	25*	100%	III
// 332	Aerial Ace	Flying	Physical	20	60	—	III
// 333	Icicle Spear	Ice	Physical	30	25*	100%	III
// 334	Iron Defense	Steel	Status	15	—	—	III
// 335	Block	Normal	Status	5	—	—	III
// 336	Howl	Normal	Status	40	—	—	III
export const DragonClaw: MoveData<TraditionalBattle> = {
  name: "Dragon Claw",
  description: "The user slashes the target with huge sharp claws.",
  type: Types.Dragon,
  category: "Physical",
  pp: 15,
  power: 80,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: true,
} as const;

// 338	Frenzy Plant	Grass	Special	5	150	90%	III
// 339	Bulk Up	Fighting	Status	20	—	—	III
// 340	Bounce	Flying	Physical	5	85	85%	III
// 341	Mud Shot	Ground	Special	15	55	95%	III
// 342	Poison Tail	Poison	Physical	25	50	100%	III
// 343	Covet	Normal	Physical	25*	60*	100%	III
// 344	Volt Tackle	Electric	Physical	15	120	100%	III
// 345	Magical Leaf	Grass	Special	20	60	—	III
// 346	Water Sport	Water	Status	15	—	—	III
// 347	Calm Mind	Psychic	Status	20	—	—	III
// 348	Leaf Blade	Grass	Physical	15	90*	100%	III
// 349	Dragon Dance	Dragon	Status	20	—	—	III
// 350	Rock Blast	Rock	Physical	10	25	90%*	III
// 351	Shock Wave	Electric	Special	20	60	—	III
// 352	Water Pulse	Water	Special	20	60	100%	III
// 353	Doom Desire	Steel	Special	5	140*	100%*	III
// 354	Psycho Boost	Psychic	Special	5	140	90%	III
// 355	Roost	Flying	Status	10	—	—	IV
// 356	Gravity	Psychic	Status	5	—	—	IV
// 357	Miracle Eye	Psychic	Status	40	—	—	IV
// 358	Wake-Up Slap	Fighting	Physical	10	70*	100%	IV
// 359	Hammer Arm	Fighting	Physical	10	100	90%	IV
// 360	Gyro Ball	Steel	Physical	5	—	100%	IV
// 361	Healing Wish	Psychic	Status	10	—	—	IV
// 362	Brine	Water	Special	10	65	100%	IV
// 363	Natural Gift	Normal	Physical	15	—	100%	IV
// 364	Feint	Normal	Physical	10	30*	100%	IV
// 365	Pluck	Flying	Physical	20	60	100%	IV
// 366	Tailwind	Flying	Status	15*	—	—	IV
// 367	Acupressure	Normal	Status	30	—	—	IV
// 368	Metal Burst	Steel	Physical	10	—	100%	IV
// 369	U-turn	Bug	Physical	20	70	100%	IV
// 370	Close Combat	Fighting	Physical	5	120	100%	IV
// 371	Payback	Dark	Physical	10	50	100%	IV
// 372	Assurance	Dark	Physical	10	60*	100%	IV
// 373	Embargo	Dark	Status	15	—	100%	IV
// 374	Fling	Dark	Physical	10	—	100%	IV
// 375	Psycho Shift	Psychic	Status	10	—	100%*	IV
// 376	Trump Card	Normal	Special	5	—	—	IV
// 377	Heal Block	Psychic	Status	15	—	100%	IV
// 378	Wring Out	Normal	Special	5	—	100%	IV
// 379	Power Trick	Psychic	Status	10	—	—	IV
// 380	Gastro Acid	Poison	Status	10	—	100%	IV
// 381	Lucky Chant	Normal	Status	30	—	—	IV
// 382	Me First	Normal	Status	20	—	—	IV
// 383	Copycat	Normal	Status	20	—	—	IV
// 384	Power Swap	Psychic	Status	10	—	—	IV
// 385	Guard Swap	Psychic	Status	10	—	—	IV
// 386	Punishment	Dark	Physical	5	—	100%	IV
// 387	Last Resort	Normal	Physical	5	140*	100%	IV
export const WorrySeed: MoveData<TraditionalBattle> = {
  name: "Worry Seed",
  description:
    "A seed that causes worry is planted on the target. It prevents sleep by making the target's Ability Insomnia.",
  type: Types.Grass,
  category: "Status",
  pp: 10, // max 16
  priority: 0,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
  effect: [] as MoveEffect<TraditionalBattle>[],
  // TODO functionality
} as const;
// 389	Sucker Punch	Dark	Physical	5	70*	100%	IV
// 390	Toxic Spikes	Poison	Status	20	—	—	IV
// 391	Heart Swap	Psychic	Status	10	—	—	IV
// 392	Aqua Ring	Water	Status	20	—	—	IV
// 393	Magnet Rise	Electric	Status	10	—	—	IV
// 394	Flare Blitz	Fire	Physical	15	120	100%	IV
// 395	Force Palm	Fighting	Physical	10	60	100%	IV
// 396	Aura Sphere	Fighting	Special	20	80*	—	IV
// 397	Rock Polish	Rock	Status	20	—	—	IV
// 398	Poison Jab	Poison	Physical	20	80	100%	IV
// 399	Dark Pulse	Dark	Special	15	80	100%	IV
// 400	Night Slash	Dark	Physical	15	70	100%	IV
// 401	Aqua Tail	Water	Physical	10	90	90%	IV
export const SeedBomb: MoveData<TraditionalBattle> = {
  name: "Seed Bomb",
  description: "The user slams a barrage of hard-shelled seeds down on the target from above.",
  type: Types.Grass,
  category: "Physical",
  pp: 15, // max 24
  power: 80,
  accuracy: 100,
  target: TC.Adjacent,
  makesContact: false,
} as const;
// 403	Air Slash	Flying	Special	15*	75	95%	IV
// 404	X-Scissor	Bug	Physical	15	80	100%	IV
// 405	Bug Buzz	Bug	Special	10	90	100%	IV
// 406	Dragon Pulse	Dragon	Special	10	85*	100%	IV
export const DragonRush: MoveData<TraditionalBattle> = {
  name: "Dragon Rush",
  description:
    "The user tackles the target while exhibiting overwhelming menace. This may also make the target flinch.",
  type: Types.Dragon,
  category: "Physical",
  pp: 10, // max 16
  power: 100,
  accuracy: 75,
  target: TC.Adjacent,
  makesContact: true,
  // TODO functionality
} as const;
// 408	Power Gem	Rock	Special	20	80*	100%	IV
// 409	Drain Punch	Fighting	Physical	10*	75*	100%	IV
// 410	Vacuum Wave	Fighting	Special	30	40	100%	IV
// 411	Focus Blast	Fighting	Special	5	120	70%	IV
// 412	Energy Ball	Grass	Special	10	90*	100%	IV
// 413	Brave Bird	Flying	Physical	15	120	100%	IV
// 414	Earth Power	Ground	Special	10	90	100%	IV
// 415	Switcheroo	Dark	Status	10	—	100%	IV
// 416	Giga Impact	Normal	Physical	5	150	90%	IV
// 417	Nasty Plot	Dark	Status	20	—	—	IV
// 418	Bullet Punch	Steel	Physical	30	40	100%	IV
// 419	Avalanche	Ice	Physical	10	60	100%	IV
// 420	Ice Shard	Ice	Physical	30	40	100%	IV
// 421	Shadow Claw	Ghost	Physical	15	70	100%	IV
// 422	Thunder Fang	Electric	Physical	15	65	95%	IV
// 423	Ice Fang	Ice	Physical	15	65	95%	IV
// 424	Fire Fang	Fire	Physical	15	65	95%	IV
// 425	Shadow Sneak	Ghost	Physical	30	40	100%	IV
// 426	Mud Bomb	Ground	Special	10	65	85%	IV
// 427	Psycho Cut	Psychic	Physical	20	70	100%	IV
// 428	Zen Headbutt	Psychic	Physical	15	80	90%	IV
// 429	Mirror Shot	Steel	Special	10	65	85%	IV
// 430	Flash Cannon	Steel	Special	10	80	100%	IV
// 431	Rock Climb	Normal	Physical	20	90	85%	IV
// 432	Defog	Flying	Status	15	—	—	IV
// 433	Trick Room	Psychic	Status	5	—	—	IV
// 434	Draco Meteor	Dragon	Special	5	130*	90%	IV
// 435	Discharge	Electric	Special	15	80	100%	IV
// 436	Lava Plume	Fire	Special	15	80	100%	IV
// 437	Leaf Storm	Grass	Special	5	130*	90%	IV
// 438	Power Whip	Grass	Physical	10	120	85%	IV
// 439	Rock Wrecker	Rock	Physical	5	150	90%	IV
// 440	Cross Poison	Poison	Physical	20	70	100%	IV
// 441	Gunk Shot	Poison	Physical	5	120	80%*	IV
// 442	Iron Head	Steel	Physical	15	80	100%	IV
// 443	Magnet Bomb	Steel	Physical	20	60	—	IV
// 444	Stone Edge	Rock	Physical	5	100	80%	IV
// 445	Captivate	Normal	Status	20	—	100%	IV
// 446	Stealth Rock	Rock	Status	20	—	—	IV
// 447	Grass Knot	Grass	Special	20	—	100%	IV
// 448	Chatter	Flying	Special	20	65*	100%	IV
// 449	Judgment	Normal	Special	10	100	100%	IV
// 450	Bug Bite	Bug	Physical	20	60	100%	IV
// 451	Charge Beam	Electric	Special	10	50	90%	IV
// 452	Wood Hammer	Grass	Physical	15	120	100%	IV
// 453	Aqua Jet	Water	Physical	20	40	100%	IV
// 454	Attack Order	Bug	Physical	15	90	100%	IV
// 455	Defend Order	Bug	Status	10	—	—	IV
// 456	Heal Order	Bug	Status	10	—	—	IV
// 457	Head Smash	Rock	Physical	5	150	80%	IV
// 458	Double Hit	Normal	Physical	10	35	90%	IV
// 459	Roar of Time	Dragon	Special	5	150	90%	IV
// 460	Spacial Rend	Dragon	Special	5	100	95%	IV
// 461	Lunar Dance	Psychic	Status	10	—	—	IV
// 462	Crush Grip	Normal	Physical	5	—	100%	IV
// 463	Magma Storm	Fire	Special	5	100*	75%*	IV
// 464	Dark Void	Dark	Status	10	—	50%*	IV
// 465	Seed Flare	Grass	Special	5	120	85%	IV
// 466	Ominous Wind	Ghost	Special	5	60	100%	IV
// 467	Shadow Force	Ghost	Physical	5	120	100%	IV
// 468	Hone Claws	Dark	Status	15	—	—	V
// 469	Wide Guard	Rock	Status	10	—	—	V
// 470	Guard Split	Psychic	Status	10	—	—	V
// 471	Power Split	Psychic	Status	10	—	—	V
// 472	Wonder Room	Psychic	Status	10	—	—	V
// 473	Psyshock	Psychic	Special	10	80	100%	V
// 474	Venoshock	Poison	Special	10	65	100%	V
// 475	Autotomize	Steel	Status	15	—	—	V
// 476	Rage Powder	Bug	Status	20	—	—	V
// 477	Telekinesis	Psychic	Status	15	—	—	V
// 478	Magic Room	Psychic	Status	10	—	—	V
// 479	Smack Down	Rock	Physical	15	50	100%	V
// 480	Storm Throw	Fighting	Physical	10	60*	100%	V
// 481	Flame Burst	Fire	Special	15	70	100%	V
// 482	Sludge Wave	Poison	Special	10	95	100%	V
// 483	Quiver Dance	Bug	Status	20	—	—	V
// 484	Heavy Slam	Steel	Physical	10	—	100%	V
// 485	Synchronoise	Psychic	Special	10*	120*	100%	V
// 486	Electro Ball	Electric	Special	10	—	100%	V
// 487	Soak	Water	Status	20	—	100%	V
// 488	Flame Charge	Fire	Physical	20	50	100%	V
// 489	Coil	Poison	Status	20	—	—	V
// 490	Low Sweep	Fighting	Physical	20	65*	100%	V
// 491	Acid Spray	Poison	Special	20	40	100%	V
// 492	Foul Play	Dark	Physical	15	95	100%	V
// 493	Simple Beam	Normal	Status	15	—	100%	V
// 494	Entrainment	Normal	Status	15	—	100%	V
// 495	After You	Normal	Status	15	—	—	V
// 496	Round	Normal	Special	15	60	100%	V
// 497	Echoed Voice	Normal	Special	15	40	100%	V
// 498	Chip Away	Normal	Physical	20	70	100%	V
// 499	Clear Smog	Poison	Special	15	50	—	V
// 500	Stored Power	Psychic	Special	10	20	100%	V
// 501	Quick Guard	Fighting	Status	15	—	—	V
// 502	Ally Switch	Psychic	Status	15	—	—	V
// 503	Scald	Water	Special	15	80	100%	V
// 504	Shell Smash	Normal	Status	15	—	—	V
// 505	Heal Pulse	Psychic	Status	10	—	—	V
// 506	Hex	Ghost	Special	10	65*	100%	V
// 507	Sky Drop	Flying	Physical	10	60	100%	V
// 508	Shift Gear	Steel	Status	10	—	—	V
// 509	Circle Throw	Fighting	Physical	10	60	90%	V
// 510	Incinerate	Fire	Special	15	60*	100%	V
// 511	Quash	Dark	Status	15	—	100%	V
// 512	Acrobatics	Flying	Physical	15	55	100%	V
// 513	Reflect Type	Normal	Status	15	—	—	V
// 514	Retaliate	Normal	Physical	5	70	100%	V
// 515	Final Gambit	Fighting	Special	5	—	100%	V
// 516	Bestow	Normal	Status	15	—	—	V
// 517	Inferno	Fire	Special	5	100	50%	V
// 518	Water Pledge	Water	Special	10	80*	100%	V
// 519	Fire Pledge	Fire	Special	10	80*	100%	V
// 520	Grass Pledge	Grass	Special	10	80*	100%	V
// 521	Volt Switch	Electric	Special	20	70	100%	V
// 522	Struggle Bug	Bug	Special	20	50*	100%	V
export const Bulldoze: MoveData<TraditionalBattle> = {
  name: "Bulldoze",
  description:
    "The user tramples its target into the ground, dealing damage. This also lowers the target's action speed.",
  type: Types.Ground,
  category: "Physical",
  pp: 20,
  power: 60,
  accuracy: 100,
  target: TC.All | TC.Adjacent,
  makesContact: false,
  effect: {
    type: "StatMod",
    speed: -1,
  },
} as const;

// 524	Frost Breath	Ice	Special	10	60*	90%	V
// 525	Dragon Tail	Dragon	Physical	10	60	90%	V
// 526	Work Up	Normal	Status	30	—	—	V
// 527	Electroweb	Electric	Special	15	55	95%	V
// 528	Wild Charge	Electric	Physical	15	90	100%	V
// 529	Drill Run	Ground	Physical	10	80	95%	V
export const DualChop: MoveData<TraditionalBattle> = {
  name: "Dual Chop",
  description: "The user attacks its target by hitting it with brutal strikes. The target is hit twice in a row.",
  type: Types.Dragon,
  category: "Physical",
  pp: 15, // max 24
  power: 80,
  accuracy: 90,
  target: TC.Adjacent,
  makesContact: true,
  // TODO multihit
} as const;
// 531	Heart Stamp	Psychic	Physical	25	60	100%	V
// 532	Horn Leech	Grass	Physical	10	75	100%	V
// 533	Sacred Sword	Fighting	Physical	15*	90	100%	V
// 534	Razor Shell	Water	Physical	10	75	95%	V
// 535	Heat Crash	Fire	Physical	10	—	100%	V
// 536	Leaf Tornado	Grass	Special	10	65	90%	V
// 537	Steamroller	Bug	Physical	20	65	100%	V
// 538	Cotton Guard	Grass	Status	10	—	—	V
// 539	Night Daze	Dark	Special	10	85	95%	V
// 540	Psystrike	Psychic	Special	10	100	100%	V
// 541	Tail Slap	Normal	Physical	10	25	85%	V
// 542	Hurricane	Flying	Special	10	110*	70%	V
// 543	Head Charge	Normal	Physical	15	120	100%	V
// 544	Gear Grind	Steel	Physical	15	50	85%	V
// 545	Searing Shot	Fire	Special	5	100	100%	V
// 546	Techno Blast	Normal	Special	5	120*	100%	V
// 547	Relic Song	Normal	Special	10	75	100%	V
// 548	Secret Sword	Fighting	Special	10	85	100%	V
// 549	Glaciate	Ice	Special	10	65	95%	V
// 550	Bolt Strike	Electric	Physical	5	130	85%	V
// 551	Blue Flare	Fire	Special	5	130	85%	V
// 552	Fiery Dance	Fire	Special	10	80	100%	V
// 553	Freeze Shock	Ice	Physical	5	140	90%	V
// 554	Ice Burn	Ice	Special	5	140	90%	V
// 555	Snarl	Dark	Special	15	55	95%	V
// 556	Icicle Crash	Ice	Physical	10	85	90%	V
// 557	V-create	Fire	Physical	5	180	95%	V
// 558	Fusion Flare	Fire	Special	5	100	100%	V
// 559	Fusion Bolt	Electric	Physical	5	100	100%	V
// 560	Flying Press	Fighting	Physical	10	100*	95%	VI
// 561	Mat Block	Fighting	Status	10	—	—	VI
// 562	Belch	Poison	Special	10	120	90%	VI
// 563	Rototiller	Ground	Status	10	—	—	VI
// 564	Sticky Web	Bug	Status	20	—	—	VI
// 565	Fell Stinger	Bug	Physical	25	50*	100%	VI
// 566	Phantom Force	Ghost	Physical	10	90	100%	VI
// 567	Trick-or-Treat	Ghost	Status	20	—	100%	VI
// 568	Noble Roar	Normal	Status	30	—	100%	VI
// 569	Ion Deluge	Electric	Status	25	—	—	VI
// 570	Parabolic Charge	Electric	Special	20	65*	100%	VI
// 571	Forest's Curse	Grass	Status	20	—	100%	VI
// 572	Petal Blizzard	Grass	Physical	15	90	100%	VI
// 573	Freeze-Dry	Ice	Special	20	70	100%	VI
// 574	Disarming Voice	Fairy	Special	15	40	—	VI
// 575	Parting Shot	Dark	Status	20	—	100%	VI
// 576	Topsy-Turvy	Dark	Status	20	—	—*	VI
// 577	Draining Kiss	Fairy	Special	10	50	100%	VI
// 578	Crafty Shield	Fairy	Status	10	—	—	VI
// 579	Flower Shield	Fairy	Status	10	—	—	VI
// 580	Grassy Terrain	Grass	Status	10	—	—	VI
// 581	Misty Terrain	Fairy	Status	10	—	—	VI
// 582	Electrify	Electric	Status	20	—	—	VI
// 583	Play Rough	Fairy	Physical	10	90	90%	VI
// 584	Fairy Wind	Fairy	Special	30	40	100%	VI
// 585	Moonblast	Fairy	Special	15	95	100%	VI
// 586	Boomburst	Normal	Special	10	140	100%	VI
// 587	Fairy Lock	Fairy	Status	10	—	—	VI
// 588	King's Shield	Steel	Status	10	—	—	VI
// 589	Play Nice	Normal	Status	20	—	—	VI
// 590	Confide	Normal	Status	20	—	—	VI
// 591	Diamond Storm	Rock	Physical	5	100	95%	VI
// 592	Steam Eruption	Water	Special	5	110	95%	VI
// 593	Hyperspace Hole	Psychic	Special	5	80	—	VI
// 594	Water Shuriken*	Water	Special	20	15	100%	VI
// 595	Mystical Fire	Fire	Special	10	75*	100%	VI
// 596	Spiky Shield	Grass	Status	10	—	—	VI
// 597	Aromatic Mist	Fairy	Status	20	—	—	VI
// 598	Eerie Impulse	Electric	Status	15	—	100%	VI
// 599	Venom Drench	Poison	Status	20	—	100%	VI
// 600	Powder	Bug	Status	20	—	100%	VI
// 601	Geomancy	Fairy	Status	10	—	—	VI
// 602	Magnetic Flux	Electric	Status	20	—	—	VI
// 603	Happy Hour	Normal	Status	30	—	—	VI
// 604	Electric Terrain	Electric	Status	10	—	—	VI
// 605	Dazzling Gleam	Fairy	Special	10	80	100%	VI
// 606	Celebrate	Normal	Status	40	—	—	VI
// 607	Hold Hands	Normal	Status	40	—	—	VI
// 608	Baby-Doll Eyes	Fairy	Status	30	—	100%	VI
// 609	Nuzzle	Electric	Physical	20	20	100%	VI
// 610	Hold Back	Normal	Physical	40	40	100%	VI
// 611	Infestation	Bug	Special	20	20	100%	VI
// 612	Power-Up Punch	Fighting	Physical	20	40	100%	VI
// 613	Oblivion Wing	Flying	Special	10	80	100%	VI
// 614	Thousand Arrows	Ground	Physical	10	90	100%	VI
// 615	Thousand Waves	Ground	Physical	10	90	100%	VI
// 616	Land's Wrath	Ground	Physical	10	90	100%	VI
// 617	Light of Ruin	Fairy	Special	5	140	90%	VI
// 618	Origin Pulse	Water	Special	10	110	85%	VI*
// 619	Precipice Blades	Ground	Physical	10	120	85%	VI*
// 620	Dragon Ascent	Flying	Physical	5	120	100%	VI*
// 621	Hyperspace Fury	Dark	Physical	5	100	—	VI*
// 622	Breakneck Blitz	Normal	Physical	1	—	—	VII
// 623	Breakneck Blitz	Normal	Special	1	—	—	VII
// 624	All-Out Pummeling	Fighting	Physical	1	—	—	VII
// 625	All-Out Pummeling	Fighting	Special	1	—	—	VII
// 626	Supersonic Skystrike	Flying	Physical	1	—	—	VII
// 627	Supersonic Skystrike	Flying	Special	1	—	—	VII
// 628	Acid Downpour	Poison	Physical	1	—	—	VII
// 629	Acid Downpour	Poison	Special	1	—	—	VII
// 630	Tectonic Rage	Ground	Physical	1	—	—	VII
// 631	Tectonic Rage	Ground	Special	1	—	—	VII
// 632	Continental Crush	Rock	Physical	1	—	—	VII
// 633	Continental Crush	Rock	Special	1	—	—	VII
// 634	Savage Spin-Out	Bug	Physical	1	—	—	VII
// 635	Savage Spin-Out	Bug	Special	1	—	—	VII
// 636	Never-Ending Nightmare	Ghost	Physical	1	—	—	VII
// 637	Never-Ending Nightmare	Ghost	Special	1	—	—	VII
// 638	Corkscrew Crash	Steel	Physical	1	—	—	VII
// 639	Corkscrew Crash	Steel	Special	1	—	—	VII
// 640	Inferno Overdrive	Fire	Physical	1	—	—	VII
// 641	Inferno Overdrive	Fire	Special	1	—	—	VII
// 642	Hydro Vortex	Water	Physical	1	—	—	VII
// 643	Hydro Vortex	Water	Special	1	—	—	VII
// 644	Bloom Doom	Grass	Physical	1	—	—	VII
// 645	Bloom Doom	Grass	Special	1	—	—	VII
// 646	Gigavolt Havoc	Electric	Physical	1	—	—	VII
// 647	Gigavolt Havoc	Electric	Special	1	—	—	VII
// 648	Shattered Psyche	Psychic	Physical	1	—	—	VII
// 649	Shattered Psyche	Psychic	Special	1	—	—	VII
// 650	Subzero Slammer	Ice	Physical	1	—	—	VII
// 651	Subzero Slammer	Ice	Special	1	—	—	VII
// 652	Devastating Drake	Dragon	Physical	1	—	—	VII
// 653	Devastating Drake	Dragon	Special	1	—	—	VII
// 654	Black Hole Eclipse	Dark	Physical	1	—	—	VII
// 655	Black Hole Eclipse	Dark	Special	1	—	—	VII
// 656	Twinkle Tackle	Fairy	Physical	1	—	—	VII
// 657	Twinkle Tackle	Fairy	Special	1	—	—	VII
// 658	Catastropika	Electric	Physical	1	210	—	VII
// 659	Shore Up	Ground	Status	10	—	—	VII
// 660	First Impression	Bug	Physical	10	90	100%	VII
// 661	Baneful Bunker	Poison	Status	10	—	—	VII
// 662	Spirit Shackle	Ghost	Physical	10	80	100%	VII
// 663	Darkest Lariat	Dark	Physical	10	85	100%	VII
// 664	Sparkling Aria	Water	Special	10	90	100%	VII
// 665	Ice Hammer	Ice	Physical	10	100	90%	VII
// 666	Floral Healing	Fairy	Status	10	—	—	VII
// 667	High Horsepower	Ground	Physical	10	95	95%	VII
// 668	Strength Sap	Grass	Status	10	—	100%	VII
// 669	Solar Blade	Grass	Physical	10	125	100%	VII
// 670	Leafage	Grass	Physical	40	40	100%	VII
// 671	Spotlight	Normal	Status	15	—	—	VII
// 672	Toxic Thread	Poison	Status	20	—	100%	VII
// 673	Laser Focus	Normal	Status	30	—	—	VII
// 674	Gear Up	Steel	Status	20	—	—	VII
// 675	Throat Chop	Dark	Physical	15	80	100%	VII
// 676	Pollen Puff	Bug	Special	15	90	100%	VII
// 677	Anchor Shot	Steel	Physical	20	80	100%	VII
// 678	Psychic Terrain	Psychic	Status	10	—	—	VII
// 679	Lunge	Bug	Physical	15	80	100%	VII
// 680	Fire Lash	Fire	Physical	15	80	100%	VII
// 681	Power Trip	Dark	Physical	10	20	100%	VII
// 682	Burn Up	Fire	Special	5	130	100%	VII
// 683	Speed Swap	Psychic	Status	10	—	—	VII
// 684	Smart Strike	Steel	Physical	10	70	—	VII
// 685	Purify	Poison	Status	20	—	—	VII
// 686	Revelation Dance	Normal	Special	15	90	100%	VII
// 687	Core Enforcer	Dragon	Special	10	100	100%	VII
// 688	Trop Kick	Grass	Physical	15	70	100%	VII
// 689	Instruct	Psychic	Status	15	—	—	VII
// 690	Beak Blast	Flying	Physical	15	100	100%	VII
// 691	Clanging Scales	Dragon	Special	5	110	100%	VII
// 692	Dragon Hammer	Dragon	Physical	15	90	100%	VII
// 693	Brutal Swing	Dark	Physical	20	60	100%	VII
// 694	Aurora Veil	Ice	Status	20	—	—	VII
// 695	Sinister Arrow Raid	Ghost	Physical	1	180	—	VII
// 696	Malicious Moonsault	Dark	Physical	1	180	—	VII
// 697	Oceanic Operetta	Water	Special	1	195	—	VII
// 698	Guardian of Alola	Fairy	Special	1	—	—	VII
// 699	Soul-Stealing 7-Star Strike	Ghost	Physical	1	195	—	VII
// 700	Stoked Sparksurfer	Electric	Special	1	175	—	VII
// 701	Pulverizing Pancake	Normal	Physical	1	210	—	VII
// 702	Extreme Evoboost	Normal	Status	1	—	—	VII
// 703	Genesis Supernova	Psychic	Special	1	185	—	VII
// 704	Shell Trap	Fire	Special	5	150	100%	VII
// 705	Fleur Cannon	Fairy	Special	5	130	90%	VII
// 706	Psychic Fangs	Psychic	Physical	10	85	100%	VII
// 707	Stomping Tantrum	Ground	Physical	10	75	100%	VII
// 708	Shadow Bone	Ghost	Physical	10	85	100%	VII
// 709	Accelerock	Rock	Physical	20	40	100%	VII
// 710	Liquidation	Water	Physical	10	85	100%	VII
// 711	Prismatic Laser	Psychic	Special	10	160	100%	VII
// 712	Spectral Thief	Ghost	Physical	10	90	100%	VII
// 713	Sunsteel Strike	Steel	Physical	5	100	100%	VII
// 714	Moongeist Beam	Ghost	Special	5	100	100%	VII
// 715	Tearful Look	Normal	Status	20	—	—	VII
// 716	Zing Zap	Electric	Physical	10	80	100%	VII
// 717	Nature's Madness	Fairy	Special	10	—	90%	VII
// 718	Multi-Attack	Normal	Physical	10	120*	100%	VII
// 719	10,000,000 Volt Thunderbolt	Electric	Special	1	195	—	VII
// 720	Mind Blown	Fire	Special	5	150	100%	VII*
// 721	Plasma Fists	Electric	Physical	15	100	100%	VII*
// 722	Photon Geyser	Psychic	Special	5	100	100%	VII*
// 723	Light That Burns the Sky	Psychic	Special	1	200	—	VII*
// 724	Searing Sunraze Smash	Steel	Physical	1	200	—	VII*
// 725	Menacing Moonraze Maelstrom	Ghost	Special	1	200	—	VII*
// 726	Let's Snuggle Forever	Fairy	Physical	1	190	—	VII*
// 727	Splintered Stormshards	Rock	Physical	1	190	—	VII*
// 728	Clangorous Soulblaze	Dragon	Special	1	185	—	VII*
// 729	Zippy Zap	Electric	Physical	10*	80*	100%	VII*
// 730	Splishy Splash	Water	Special	15	90	100%	VII*
// 731	Floaty Fall	Flying	Physical	15	90	95%	VII*
// 732	Pika Papow	Electric	Special	20	—	—	VII*
// 733	Bouncy Bubble	Water	Special	20*	60*	100%	VII*
// 734	Buzzy Buzz	Electric	Special	20*	60*	100%	VII*
// 735	Sizzly Slide	Fire	Physical	20*	60*	100%	VII*
// 736	Glitzy Glow	Psychic	Special	15	80*	95%*	VII*
// 737	Baddy Bad	Dark	Special	15	80*	95%*	VII*
// 738	Sappy Seed	Grass	Physical	10*	100*	90%*	VII*
// 739	Freezy Frost	Ice	Special	10*	100*	90%*	VII*
// 740	Sparkly Swirl	Fairy	Special	5*	120*	85%*	VII*
// 741	Veevee Volley	Normal	Physical	20	—	—	VII*
// 742	Double Iron Bash	Steel	Physical	5	60	100%	VII*
// 743	Max Guard	Normal	Status	10	—	—	VIII
// 744	Dynamax Cannon	Dragon	Special	5	100	100%	VIII
// 745	Snipe Shot	Water	Special	15	80	100%	VIII
// 746	Jaw Lock	Dark	Physical	10	80	100%	VIII
// 747	Stuff Cheeks	Normal	Status	10	—	—	VIII
// 748	No Retreat	Fighting	Status	5	—	—	VIII
// 749	Tar Shot	Rock	Status	15	—	100%	VIII
// 750	Magic Powder	Psychic	Status	20	—	100%	VIII
// 751	Dragon Darts	Dragon	Physical	10	50	100%	VIII
// 752	Teatime	Normal	Status	10	—	—	VIII
// 753	Octolock	Fighting	Status	15	—	100%	VIII
// 754	Bolt Beak	Electric	Physical	10	85	100%	VIII
// 755	Fishious Rend	Water	Physical	10	85	100%	VIII
// 756	Court Change	Normal	Status	10	—	100%	VIII
// 757	Max Flare	Fire	???	10	—	—	VIII
// 758	Max Flutterby	Bug	???	10	—	—	VIII
// 759	Max Lightning	Electric	???	10	—	—	VIII
// 760	Max Strike	Normal	???	10	—	—	VIII
// 761	Max Knuckle	Fighting	???	10	—	—	VIII
// 762	Max Phantasm	Ghost	???	10	—	—	VIII
// 763	Max Hailstorm	Ice	???	10	—	—	VIII
// 764	Max Ooze	Poison	???	10	—	—	VIII
// 765	Max Geyser	Water	???	10	—	—	VIII
// 766	Max Airstream	Flying	???	10	—	—	VIII
// 767	Max Starfall	Fairy	???	10	—	—	VIII
// 768	Max Wyrmwind	Dragon	???	10	—	—	VIII
// 769	Max Mindstorm	Psychic	???	10	—	—	VIII
// 770	Max Rockfall	Rock	???	10	—	—	VIII
// 771	Max Quake	Ground	???	10	—	—	VIII
// 772	Max Darkness	Dark	???	10	—	—	VIII
// 773	Max Overgrowth	Grass	???	10	—	—	VIII
// 774	Max Steelspike	Steel	???	10	—	—	VIII
// 775	Clangorous Soul	Dragon	Status	5	—	—	VIII
// 776	Body Press	Fighting	Physical	10	80	100%	VIII
// 777	Decorate	Fairy	Status	15	—	—	VIII
// 778	Drum Beating	Grass	Physical	10	80	100%	VIII
// 779	Snap Trap	Grass	Physical	15	35	100%	VIII
// 780	Pyro Ball	Fire	Physical	5	120	90%	VIII
// 781	Behemoth Blade	Steel	Physical	5	100	100%	VIII
// 782	Behemoth Bash	Steel	Physical	5	100	100%	VIII
// 783	Aura Wheel	Electric	Physical	10	110	100%	VIII
// 784	Breaking Swipe	Dragon	Physical	15	60	100%	VIII
// 785	Branch Poke	Grass	Physical	40	40	100%	VIII
// 786	Overdrive	Electric	Special	10	80	100%	VIII
// 787	Apple Acid	Grass	Special	10	80	100%	VIII
// 788	Grav Apple	Grass	Physical	10	80	100%	VIII
// 789	Spirit Break	Fairy	Physical	15	75	100%	VIII
// 790	Strange Steam	Fairy	Special	10	90	95%	VIII
// 791	Life Dew	Water	Status	10	—	—	VIII
// 792	Obstruct	Dark	Status	10	—	100%	VIII
// 793	False Surrender	Dark	Physical	10	80	—	VIII
// 794	Meteor Assault	Fighting	Physical	5	150	100%	VIII
// 795	Eternabeam	Dragon	Special	5	160	90%	VIII
// 796	Steel Beam	Steel	Special	5	140	95%	VIII
// 797	Expanding Force	Psychic	Special	10	80	100%	VIII
// 798	Steel Roller	Steel	Physical	5	130	100%	VIII
// 799	Scale Shot	Dragon	Physical	20	25	90%	VIII
// 800	Meteor Beam	Rock	Special	10	120	90%	VIII
// 801	Shell Side Arm	Poison	Special	10	90	100%	VIII
// 802	Misty Explosion	Fairy	Special	5	100	100%	VIII
// 803	Grassy Glide	Grass	Physical	20	70	100%	VIII
// 804	Rising Voltage	Electric	Special	20	70	100%	VIII
// 805	Terrain Pulse	Normal	Special	10	50	100%	VIII
// 806	Skitter Smack	Bug	Physical	10	70	90%	VIII
// 807	Burning Jealousy	Fire	Special	5	70	100%	VIII
// 808	Lash Out	Dark	Physical	5	75	100%	VIII
// 809	Poltergeist	Ghost	Physical	5	110	90%	VIII
// 810	Corrosive Gas	Poison	Status	40	—	100%	VIII
// 811	Coaching	Fighting	Status	10	—	—	VIII
// 812	Flip Turn	Water	Physical	20	60	100%	VIII
// 813	Triple Axel	Ice	Physical	10	20	90%	VIII
// 814	Dual Wingbeat	Flying	Physical	10	40	90%	VIII
// 815	Scorching Sands	Ground	Special	10	70	100%	VIII
// 816	Jungle Healing	Grass	Status	10	—	—	VIII
// 817	Wicked Blow	Dark	Physical	5	80	100%	VIII
// 818	Surging Strikes	Water	Physical	5	25	100%	VIII
// 819	Thunder Cage	Electric	Special	15	80	90%	VIII
// 820	Dragon Energy	Dragon	Special	5	150	100%	VIII
// 821	Freezing Glare	Psychic	Special	10	90	100%	VIII
// 822	Fiery Wrath	Dark	Special	10	90	100%	VIII
// 823	Thunderous Kick	Fighting	Physical	10	90	100%	VIII
// 824	Glacial Lance	Ice	Physical	5	130	100%	VIII
// 825	Astral Barrage	Ghost	Special	5	120	100%	VIII
// 826	Eerie Spell	Psychic	Special	5	80	100%	VIII
// 827	Dire Claw	Poison	Physical	15	60	100	VIII
// 828	Psyshield Bash	Psychic	Physical	10	70	90	VIII
// 829	Power Shift	Normal	Status	10	—	—	VIII
// 830	Stone Axe	Rock	Physical	15	65	90	VIII
// 831	Springtide Storm	Fairy	Special	5	95	80	VIII
// 832	Mystical Power	Psychic	Special	10	70	90	VIII
// 833	Raging Fury	Fire	Physical	10	90	85	VIII
// 834	Wave Crash	Water	Physical	10	75	100	VIII
// 835	Chloroblast	Grass	Special	5	120	95	VIII
// 836	Mountain Gale	Ice	Physical	5	100	85	VIII
// 837	Victory Dance	Fighting	Status	10	—	—	VIII
// 838	Headlong Rush	Ground	Physical	5	100	100	VIII
// 839	Barb Barrage	Poison	Physical	15	60	100	VIII
// 840	Esper Wing	Psychic	Special	10	75	90	VIII
// 841	Bitter Malice	Ghost	Special	15	60	100	VIII
// 842	Shelter	Steel	Status	10	—	—	VIII
// 843	Triple Arrows	Fighting	Physical	15	50	100	VIII
// 844	Infernal Parade	Ghost	Special	15	60	100	VIII
// 845	Ceaseless Edge	Dark	Physical	15	65	90	VIII
// 846	Bleakwind Storm	Flying	Special	5	95	80	VIII
// 847	Wildbolt Storm	Electric	Special	5	95	80	VIII
// 848	Sandsear Storm	Ground	Special	5	95	80	VIII
// 849	Lunar Blessing	Psychic	Status	10	—	—	VIII
// 850	Take Heart	Psychic	Status	10	—	—	VIII
