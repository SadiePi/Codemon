import { ReadyAction } from "./index.ts";
import C, { Codemon, Move } from "./index.ts";
import { ActionTarget } from "../core/battle.ts";
import { Battle } from "./index.ts";

// https://bulbapedia.bulbagarden.net/wiki/List_of_moves
// TODOs: multi-turn moves, payday, move restrictions, mist, type specific hits or misses, type changing
export const Pound: Move = {
  name: "Pound",
  description: "The target is physically pounded with a long tail, a foreleg, or the like.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 35,
  target: "Any Adjacent",
  makesContact: true,

  power: 40,
};

export const KarateChop: Move = {
  name: "Karate Chop",
  description: "The target is attacked with a sharp chop. Critical hits land more easily.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 25,
  target: "Any Adjacent",
  makesContact: true,
  criticalHitStage: 1,

  power: 50,
};

export const DoubleSlap: Move = {
  name: "Double Slap",
  description: "The target is slapped repeatedly, back and forth, two to five times in a row.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 10,
  target: "Any Adjacent",
  makesContact: true,

  accuracy: 85,
  power: 15,
};

export const CometPunch: Move = {
  name: "Comet Punch",
  description: "The target is hit with a flurry of punches that strike two to five times in a row.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  target: "Any Adjacent",
  makesContact: true,
  // useAgain: (uses: number) => {
  //   if (hitsSoFar === 1) return true;
  //   if (hitsSoFar === 2) return Math.random() < 0.65;
  //   if (hitsSoFar === 3) return Math.random() < 0.3;
  //   if (hitsSoFar === 4) return Math.random() < 0.15;
  //   return false;
  // },

  power: 18,
  accuracy: 85,
};

export const MegaPunch: Move = {
  name: "Mega Punch",
  description: "The target is slugged by a punch thrown with muscle-packed power.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  power: 80,
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
};

export const PayDay: Move = {
  name: "Pay Day",
  description: "Numerous coins are hurled at the target to inflict damage. Money is earned after the battle.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  power: 40,
  target: "Any Adjacent",
  makesContact: false,
  // TODO somehow
};

export const FirePunch: Move = {
  name: "Fire Punch",
  description: "The target is punched with a fiery fist. This may also leave the target with a burn.",
  type: C.Types.Fire,
  category: "Physical",
  pp: 15,
  power: 75,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Burn, 1 / 10],
};

export const IcePunch: Move = {
  name: "Ice Punch",
  description: "The target is punched with an icy fist. This may also leave the target frozen.",
  type: C.Types.Ice,
  category: "Physical",
  pp: 15,
  power: 75,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Freeze, 1 / 10],
};

export const ThunderPunch: Move = {
  name: "Thunder Punch",
  description: "The target is punched with an electrified fist. This may also leave the target with paralysis.",
  type: C.Types.Electric,
  category: "Physical",
  pp: 15,
  power: 75,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Paralysis, 1 / 10],
};

export const Scratch: Move = {
  name: "Scratch",
  description: "Hard, pointed, sharp claws rake the target to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 35,
  power: 40,
  target: "Any Adjacent",
  makesContact: true,
};

export const ViseGrip: Move = {
  name: "Vise Grip",
  description: "The target is gripped and squeezed from both sides to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 30,
  power: 55,
  target: "Any Adjacent",
  makesContact: true,
};

export const Guillotine: Move = {
  name: "Guillotine",
  description: "A vicious, tearing attack with big pincers. The target faints instantly if this attack hits.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 5,
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: true,
  faint: true,
};

export const RazorWind: Move = {
  name: "Razor Wind",
  description:
    "In this two-turn attack, blades of wind hit opposing Pokémon on the second turn. Critical hits land more easily.",
  type: C.Types.Normal,
  category: "Special",
  pp: 10,
  power: 80,
  target: "Any Adjacent",
  makesContact: false,
  criticalHitStage: 1,
  // TODO somehow
};

export const SwordsDance: Move = {
  name: "Swords Dance",
  description: "A frenetic dance to uplift the fighting spirit. This sharply raises the user's Attack stat.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30,
  target: "Self",
  makesContact: false,
  stage: { attack: 2 },
};

export const Cut: Move = {
  name: "Cut",
  description: "The target is cut with a scythe or claw.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 30,
  power: 50,
  accuracy: 95,
  target: "Any Adjacent",
  makesContact: true,
};

export const Gust: Move = {
  name: "Gust",
  description: "A gust of wind is whipped up by wings and launched at the target to inflict damage.",
  type: C.Types.Flying,
  category: "Special",
  pp: 35,
  power: 40,
  target: "Any",
  makesContact: false,
  // TODO during Fly, double power
};

export const WingAttack: Move = {
  name: "Wing Attack",
  description: "The target is struck with large, imposing wings spread wide to inflict damage.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 35,
  power: 60,
  target: "Any",
  makesContact: true,
};

export const Whirlwind: Move = {
  name: "Whirlwind",
  description:
    "The target is blown away, and a different Pokémon is dragged out. In the wild, this ends a battle against a single Pokémon.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20,
  target: "Any Adjacent",
  makesContact: false,
  eject: true,
};

export const Fly: Move = {
  name: "Fly",
  description: "The user flies up into the sky and then strikes its target on the next turn.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 15,
  power: 90,
  accuracy: 95,
  target: "Any",
  makesContact: true,
  // TODO somehow
};

export const Bind: Move = {
  name: "Bind",
  description:
    "Things such as long bodies or tentacles are used to bind and squeeze the target for four to five turns.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  power: 15,
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
  // TODO details
};

export const Slam: Move = {
  name: "Slam",
  description: "The target is slammed with a long tail, vines, or the like to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  power: 80,
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: true,
};

export const VineWhip: Move = {
  name: "Vine Whip",
  description: "The target is struck with slender, whiplike vines to inflict damage.",
  type: C.Types.Grass,
  category: "Physical",
  pp: 25, // max 40
  power: 45,
  target: "Any Adjacent",
  makesContact: true,
};

export const Stomp: Move = {
  name: "Stomp",
  description: "The target is stomped with a big foot. This may also make the target flinch.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  power: 65,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Flinch, 3 / 10],
};

export const DoubleKick: Move = {
  name: "Double Kick",
  description: "The target is quickly kicked twice in succession using both feet.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 30,
  power: 30,
  target: "Any Adjacent",
  makesContact: true,
  // hitAgain: h => h < 2,
};

export const MegaKick: Move = {
  name: "Mega Kick",
  description: "The target is attacked by a kick launched with muscle-packed power.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 5,
  power: 120,
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: true,
};

export const JumpKick: Move = {
  name: "Jump Kick",
  description: "The user jumps up high, then strikes with a kick. If the kick misses, the user hurts itself.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 10,
  power: 100,
  accuracy: 95,
  target: "Any Adjacent",
  makesContact: true,
  crash: {
    hp: action => Math.floor(action.source instanceof Codemon ? action.source.stats.hp.value() / 2 : 0),
  },
};

export const RollingKick: Move = {
  name: "Rolling Kick",
  description: "The user lashes out with a quick, spinning kick. This may also make the target flinch.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 15,
  power: 60,
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Flinch, 3 / 10],
};

export const SandAttack: Move = {
  name: "Sand Attack",
  description: "Sand is hurled in the target's face, reducing the target's accuracy.",
  type: C.Types.Ground,
  category: "Status",
  pp: 15,
  target: "Any Adjacent",
  makesContact: false,
  stage: { accuracy: -1 },
};

export const Headbutt: Move = {
  name: "Headbutt",
  description:
    "The user sticks out its head and attacks by charging straight into the target. This may also make the target flinch.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  power: 70,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Flinch, 3 / 10],
};

export const HornAttack: Move = {
  name: "Horn Attack",
  description: "The target is jabbed with a sharply pointed horn to inflict damage.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 25,
  power: 65,
  target: "Any Adjacent",
  makesContact: true,
};

export const FuryAttack: Move = {
  name: "Fury Attack",
  description: "The target is jabbed repeatedly with a horn or beak two to five times in a row.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  power: 15,
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
  // hitAgain: (hitsSoFar: number) => {
  //   if (hitsSoFar === 1) return 1;
  //   if (hitsSoFar === 2) return 0.65;
  //   if (hitsSoFar === 3) return 0.3;
  //   if (hitsSoFar === 4) return 0.15;
  //   return 0;
  // },
};

export const HornDrill: Move = {
  name: "Horn Drill",
  description:
    "The user stabs the target with a horn that rotates like a drill. The target faints instantly if this attack hits.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 5,
  target: "Any Adjacent",
  makesContact: true,
  faint: true,
};

export const Tackle: Move = {
  name: "Tackle",
  description: "A physical attack in which the user charges and slams into the target with its whole body.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 35, // max 56
  power: 40,
  target: "Any Adjacent",
  makesContact: true,
};

export const BodySlam: Move = {
  name: "Body Slam",
  description:
    "The user drops onto the target with its full body weight. This may also leave the target with paralysis.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  power: 85,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Paralysis, 3 / 10],
};

export const Wrap: Move = {
  name: "Wrap",
  description: "A long body, vines, or the like are used to wrap and squeeze the target for four to five turns.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20,
  power: 15,
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: true,
  // TODO functionality
};

export const TakeDown: Move = {
  name: "Take Down",
  description: "A reckless, full-body charge attack for slamming into the target. This also damages the user a little.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20, // max 32
  power: 90,
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: true,
  // recoil: 1 / 4,
};

export const Thrash: Move = {
  name: "Thrash",
  description: "The user rampages and attacks for two to three turns. The user then becomes confused.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 10,
  power: 120,
  target: "Self",
  makesContact: true,
  status: C.Statuses.Thrashing,
};

export const DoubleEdge: Move = {
  name: "Double-Edge",
  description:
    "A reckless, life-risking tackle in which the user rushes the target. This also damages the user quite a lot.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15, // max 24
  power: 120,
  target: "Any Adjacent",
  makesContact: true,
  // recoil: 1 / 4,
};

export const TailWhip: Move = {
  name: "Tail Whip",
  description: "The user wags its tail cutely, making opposing Pokémon less wary and lowering their Defense stats.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30,
  target: "Every Adjacent Foe",
  makesContact: false,
  stage: { defense: -1 },
};

export const PoisonSting: Move = {
  name: "Poison Sting",
  description: "The user stabs the target with a poisonous stinger. This may also poison the target.",
  type: C.Types.Poison,
  category: "Physical",
  pp: 35,
  power: 15,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Poison, 3 / 10],
};

export const Twineedle: Move = {
  name: "Twineedle",
  description:
    "The user damages the target twice in succession by jabbing it with two spikes. This may also poison the target.",
  type: C.Types.Bug,
  category: "Physical",
  pp: 20,
  power: 25,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Poison, 2 / 10],
};

export const PinMissle: Move = {
  name: "Pin Missile",
  description: "Sharp spikes are shot at the target in rapid succession. They hit two to five times in a row.",
  type: C.Types.Bug,
  category: "Physical",
  pp: 20,
  power: 25,
  accuracy: 95,
  target: "Any Adjacent",
  makesContact: false,
  // hitAgain: (hitsSoFar: number) => {
  //   if (hitsSoFar === 1) return 1;
  //   if (hitsSoFar === 2) return 0.65;
  //   if (hitsSoFar === 3) return 0.3;
  //   if (hitsSoFar === 4) return 0.15;
  //   return 0;
  // },
};

export const Leer: Move = {
  name: "Leer",
  description: "The user gives opposing Pokémon an intimidating leer that lowers the Defense stat.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30,
  target: "Every Adjacent Foe",
  makesContact: false,
  stage: { defense: -1 },
};

export const Bite: Move = {
  name: "Bite",
  description: "The target is bitten with viciously sharp fangs. This may also make the target flinch.",
  type: C.Types.Dark,
  category: "Physical",
  pp: 25, // max 40
  power: 60,
  target: "Any Adjacent",
  makesContact: true,
  status: [C.Statuses.Flinch, 3 / 10],
};

export const Growl: Move = {
  name: "Growl",
  description:
    "The user growls in an endearing way, making opposing Pokémon less wary. This lowers their Attack stats.",
  type: C.Types.Normal,
  category: "Status",
  pp: 40, // max 64
  target: "Every Adjacent Foe",
  makesContact: false,
  stage: { attack: -1 },
};

export const Roar: Move = {
  name: "Roar",
  description:
    "The target is scared off, and a different Pokémon is dragged out. In the wild, this ends a battle against a single opponent.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20,
  priority: -6,
  target: "Any Adjacent",
  makesContact: false,
  eject: true,
};

export const Sing: Move = {
  name: "Sing",
  description: "A soothing lullaby is sung in a calming voice that puts the target into a deep slumber.",
  type: C.Types.Normal,
  category: "Status",
  pp: 15,
  accuracy: 55,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Sleep,
};

export const Supersonic: Move = {
  name: "Supersonic",
  description: "The user generates odd sound waves from its body that confuse the target.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20,
  accuracy: 55,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Confusion,
};

export const SonicBoom: Move = {
  name: "Sonic Boom",
  description: "The target is hit with a destructive shock wave that always inflicts 20 HP damage.",
  type: C.Types.Normal,
  category: "Special",
  pp: 20,
  power: 20,
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
  hp: -20,
};

export const Disable: Move = {
  name: "Disable",
  description: "For four turns, this move prevents the target from using the move it last used.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20,
  target: "Any Adjacent",
  makesContact: false,
  restrict: null, // TODO
};

export const Acid: Move = {
  name: "Acid",
  description: "Opposing Pokémon are attacked with a spray of harsh acid. This may also lower their Sp. Def stats.",
  type: C.Types.Poison,
  category: "Special",
  pp: 30,
  power: 40,
  target: "Every Adjacent Foe",
  makesContact: false,
  stage: { specialDefense: -1 },
};

export const Ember: Move = {
  name: "Ember",
  description: "The target is attacked with small flames. This may also leave the target with a burn.",
  type: C.Types.Fire,
  category: "Special",
  pp: 25,
  power: 40,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Burn, 1 / 10],
};

export const Flamethrower: Move = {
  name: "Flamethrower",
  description: "The target is scorched with an intense blast of fire. This may also leave the target with a burn.",
  type: C.Types.Fire,
  category: "Special",
  pp: 15,
  power: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Burn, 1 / 10],
};

export const Mist: Move = {
  name: "Mist",
  description:
    "The user cloaks itself and its allies in a white mist that prevents any of their stats from being lowered for five turns.",
  type: C.Types.Ice,
  category: "Status",
  pp: 30,
  target: "Team",
  makesContact: false,
  // status: C.Statuses.Mist,
};

export const WaterGun: Move = {
  name: "Water Gun",
  description: "The target is blasted with a forceful shot of water.",
  type: C.Types.Water,
  category: "Special",
  pp: 25,
  power: 40,
  target: "Any Adjacent",
  makesContact: false,
};

export const HydroPump: Move = {
  name: "Hydro Pump",
  description: "The target is blasted by a huge volume of water launched under great pressure.",
  type: C.Types.Water,
  category: "Special",
  pp: 5,
  power: 110,
  accuracy: 80,
  target: "Any Adjacent",
  makesContact: false,
};

export const Surf: Move = {
  name: "Surf",
  description: "The user attacks everything around it by swamping its surroundings with a giant wave.",
  type: C.Types.Water,
  category: "Special",
  pp: 15,
  power: 90,
  target: "Every Adjacent",
  makesContact: false,
};

export const IceBeam: Move = {
  name: "Ice Beam",
  description: "The target is struck with an icy-cold beam of energy. This may also leave the target frozen.",
  type: C.Types.Ice,
  category: "Special",
  pp: 10,
  power: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Freeze, 1 / 10],
};

export const Blizzard: Move = {
  name: "Blizzard",
  description:
    "A howling blizzard is summoned to strike opposing Pokémon. This may also leave the opposing Pokémon frozen.",
  type: C.Types.Ice,
  category: "Special",
  pp: 5,
  power: 110,
  accuracy: 70,
  target: "Every Adjacent Foe",
  makesContact: false,
  status: [C.Statuses.Freeze, 1 / 10],
};

export const Psybeam: Move = {
  name: "Psybeam",
  description: "The target is attacked with a peculiar ray. This may also leave the target confused.",
  type: C.Types.Psychic,
  category: "Special",
  pp: 20,
  power: 65,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Confusion, 1 / 10],
};

export const BubbleBeam: Move = {
  name: "Bubble Beam",
  description: "A spray of bubbles is forcefully ejected at the target. This may also lower the target's Speed stat.",
  type: C.Types.Water,
  category: "Special",
  pp: 20,
  power: 65,
  target: "Any Adjacent",
  makesContact: false,
  stage: [{ speed: -1 }, 1 / 10],
};

export const AuroraBeam: Move = {
  name: "Aurora Beam",
  description: "The target is hit with a rainbow-colored beam. This may also lower the target's Attack stat.",
  type: C.Types.Ice,
  category: "Special",
  pp: 20,
  power: 65,
  target: "Any Adjacent",
  makesContact: false,
  stage: [{ attack: -1 }, 1 / 10],
};

export const HyperBeam: Move = {
  name: "Hyper Beam",
  description: "The target is attacked with a powerful beam. The user can't move on the next turn.",
  type: C.Types.Normal,
  category: "Special",
  pp: 5,
  power: 150,
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
  // TODO functionality
};

export const Peck: Move = {
  name: "Peck",
  description: "The target is jabbed with a sharply pointed beak or horn.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 35,
  power: 35,
  target: "Any",
  makesContact: true,
};

export const DrillPeck: Move = {
  name: "Drill Peck",
  description: "A corkscrewing attack that strikes the target with a sharp beak acting as a drill.",
  type: C.Types.Flying,
  category: "Physical",
  pp: 20,
  power: 80,
  target: "Any",
  makesContact: true,
};

export const Submission: Move = {
  name: "Submission",
  description: "The user grabs the target and recklessly dives for the ground. This also damages the user a little.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 20,
  power: 80,
  accuracy: 80,
  target: "Any Adjacent",
  makesContact: true,
  // recoil: 1 / 4,
};

export const LowKick: Move = {
  name: "Low Kick",
  description:
    "A powerful low kick that makes the target fall over. The heavier the target, the greater the move's power.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 20,
  /*power: (_action, target, _battle) => {
    const w = target.species.weight;
    if (w < 10) return 20;
    if (w < 25) return 40;
    if (w < 50) return 60;
    if (w < ) return 80;
    if (w < ) return ;
    return ;
  },*/
  target: "Any Adjacent",
  makesContact: true,
};

export const Counter: Move = {
  name: "Counter",
  description: "A retaliation move that counters any physical attack, inflicting double the damage taken.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 20,
  priority: -5,
  target: "Self",
  makesContact: true,
  // TODO somehow, probably a special actionSource
};

export const SeismicToss: Move = {
  name: "Seismic Toss",
  description: "The target is thrown using the power of gravity. It inflicts damage equal to the user's level.",
  type: C.Types.Fighting,
  category: "Physical",
  pp: 20,
  target: "Any Adjacent",
  makesContact: true,
  // TODO somehow
};

export const Strength: Move = {
  name: "Strength",
  description: "The target is slugged with a punch thrown at maximum power.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 15,
  power: 80,
  target: "Any Adjacent",
  makesContact: true,
};

export const Absorb: Move = {
  name: "Absorb",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: C.Types.Grass,
  category: "Special",
  pp: 20,
  power: 20,
  target: "Any Adjacent",
  makesContact: false,
  leech: 1 / 2,
};

export const MegaDrain: Move = {
  name: "Mega Drain",
  description: "A nutrient-draining attack. The user's HP is restored by half the damage taken by the target.",
  type: C.Types.Grass,
  category: "Special",
  pp: 15,
  power: 40,
  target: "Any Adjacent",
  makesContact: false,
  leech: 1 / 2,
};

export const LeechSeed: Move = {
  name: "Leech Seed",
  description: "A seed is planted on the target. It steals some HP from the target every turn.",
  type: C.Types.Grass,
  category: "Status",
  pp: 10, // max 16
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.LeechSeed,
};

export const Growth: Move = {
  name: "Growth",
  description: "The user's body grows all at once, raising the Attack and Sp. Atk stats.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: "Self",
  makesContact: false,
  stage: { attack: 1, specialAttack: 1 },
};

export const RazorLeaf: Move = {
  name: "Razor Leaf",
  description: "Sharp-edged leaves are launched to slash at opposing Pokémon. Critical hits land more easily.",
  type: C.Types.Grass,
  category: "Physical",
  pp: 25, // max 40
  power: 55,
  accuracy: 95,
  target: "Every Adjacent Foe",
  makesContact: false,
  criticalHitStage: 1,
};

export const SolarBeam: Move = {
  name: "Solar Beam",
  description: "In this two-turn attack, the user gathers light, then blasts a bundled beam on the next turn.",
  type: C.Types.Grass,
  category: "Special",
  pp: 10, // max 16
  power: 120,
  target: "Any Adjacent",
  makesContact: false,
  // TODO functionality
};

export const PoisonPowder: Move = {
  name: "Poison Powder",
  description: "The user scatters a cloud of poisonous dust that poisons the target.",
  type: C.Types.Poison,
  category: "Status",
  pp: 35, // max 56
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Poison,
};

export const StunSpore: Move = {
  name: "Stun Spore",
  description: "The user scatters a cloud of numbing powder that paralyzes the target.",
  type: C.Types.Grass,
  category: "Status",
  pp: 30, // max 48
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Paralysis,
};

export const SleepPowder: Move = {
  name: "Sleep Powder",
  description: "The user scatters a big cloud of sleep-inducing dust around the target.",
  type: C.Types.Grass,
  category: "Status",
  pp: 15, // max 24
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Sleep,
};

export const PetalDance: Move = {
  name: "Petal Dance",
  description: "The user attacks the target with sharp petals that land on the target.",
  type: C.Types.Grass,
  category: "Physical",
  pp: 10, // max 16
  power: 120,
  target: "Random Adjacent Foe",
  makesContact: true,
  // TODO functionality
};

export const StringShot: Move = {
  name: "String Shot",
  description: "Opposing Pokémon are bound with silk blown from the user's mouth that harshly lowers the Speed stat.",
  type: C.Types.Bug,
  category: "Status",
  pp: 40, // max 64
  accuracy: 95,
  target: "Every Adjacent Foe",
  makesContact: false,
  stage: { speed: -2 },
};

export const DragonRage: Move = {
  name: "Dragon Rage",
  description: "This attack hits the target with a shock wave of pure rage. This attack always inflicts 40 HP damage.",
  type: C.Types.Dragon,
  category: "Physical",
  pp: 10, // max 16
  target: "Any Adjacent",
  makesContact: false,
  hp: -40,
};

export const FireSpin: Move = {
  name: "Fire Spin",
  description: "The target becomes trapped within a fierce vortex of fire that rages for four to five turns.",
  type: C.Types.Fire,
  category: "Special",
  pp: 15, // max 24
  power: 35,
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: false,
  // TODO functionality
};

export const ThunderShock: Move = {
  name: "Thunder Shock",
  description:
    "A jolt of electricity crashes down on the target to inflict damage. This may also leave the target with paralysis.",
  type: C.Types.Electric,
  category: "Special",
  pp: 30, // max 48
  power: 40,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Paralysis, 1 / 10],
};

export const Thunderbolt: Move = {
  name: "Thunderbolt",
  description: "A strong electric blast crashes down on the target. This may also leave the target with paralysis.",
  type: C.Types.Electric,
  category: "Special",
  pp: 15, // max 24
  power: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Paralysis, 1 / 10],
};

export const ThunderWave: Move = {
  name: "Thunder Wave",
  description: "The user launches a weak jolt of electricity that paralyzes the target.",
  type: C.Types.Electric,
  category: "Status",
  pp: 20, // max 32
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Paralysis,
};

export const Thunder: Move = {
  name: "Thunder",
  description:
    "A wicked thunderbolt is dropped on the target to inflict damage. This may also leave the target with paralysis.",
  type: C.Types.Electric,
  category: "Physical",
  pp: 10, // max 16
  power: 110,
  accuracy: 70,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Paralysis, 1 / 10],
};

export const RockThrow: Move = {
  name: "Rock Throw",
  description: "The user picks up and throws a small rock at the target to attack.",
  type: C.Types.Rock,
  category: "Physical",
  target: "Any Adjacent",
  makesContact: false,
  pp: 15, // max 24
  power: 50,
  accuracy: 90,
};

export const Earthquake: Move = {
  name: "Earthquake",
  description: "The user sets off an earthquake that strikes every Pokémon around it.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 10, // max 16
  power: 100,
  target: "Every Adjacent",
  makesContact: false,
};

export const Fissure: Move = {
  name: "Fissure",
  description:
    "The user opens up a fissure in the ground and drops the target in. The target faints instantly if this attack hits.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 5, // max 8
  accuracy: 30,
  target: "Any Adjacent",
  makesContact: false,
  faint: true,
};

export const Dig: Move = {
  name: "Dig",
  description: "The user burrows into the ground, then attacks on the next turn.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 10, // max 16
  power: 80,
  target: "Any Adjacent",
  makesContact: true,
  status: C.Statuses.SemiInvulnerableTurn,
  // TODO functionality
};

export const Toxic: Move = {
  name: "Toxic",
  description: "A move that leaves the target badly poisoned. Its poison damage worsens every turn.",
  type: C.Types.Poison,
  category: "Status",
  pp: 10, // max 16
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.BadlyPoisoned,
};

export const Confusion: Move = {
  name: "Confusion",
  description: "The target is hit by a weak telekinetic force. This may also confuse the target.",
  type: C.Types.Psychic,
  category: "Special",
  pp: 25, // max 40
  power: 50,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Confusion, 1 / 10],
};

export const Psychic: Move = {
  name: "Psychic",
  description: "The target is hit by a strong telekinetic force. This may also lower the target's Sp. Def stat.",
  type: C.Types.Psychic,
  category: "Special",
  pp: 10, // max 16
  power: 90,
  target: "Any Adjacent",
  makesContact: false,
  stage: [{ specialDefense: -1 }, 1 / 10],
};

export const Hypnosis: Move = {
  name: "Hypnosis",
  description: "The user employs hypnotic suggestion to make the target fall into a deep sleep.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  accuracy: 60,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Sleep,
};

export const Meditate: Move = {
  name: "Meditate",
  description: "The user meditates to awaken the power deep within its body and raise its Attack stat.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
  stage: { attack: 1 },
};

export const Agility: Move = {
  name: "Agility",
  description: "The user relaxes and lightens its body to move faster. This sharply raises the Speed stat.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 30, // max 48
  target: "Self",
  makesContact: false,
  stage: { speed: 2 },
};

export const QuickAttack: Move = {
  name: "Quick Attack",
  description: "The user lunges at the target at a speed that makes it almost invisible. This move always goes first.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 30, // max 48
  power: 40,
  priority: 1,
  target: "Any Adjacent",
  makesContact: true,
};

export const Rage: Move = {
  name: "Rage",
  description:
    "As long as this move is in use, the power of rage raises the Attack stat each time the user is hit in battle.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 20, // max 32
  power: 20,
  target: "Any Adjacent",
  makesContact: true,
  // TODO functionality
};

export const Teleport: Move = {
  name: "Teleport",
  description:
    "The user switches places with another party Pokémon. It may also be used to warp to the last Pokémon Center visited. If a wild Pokémon uses this move, it flees.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  priority: -6,
  target: "Self",
  makesContact: false,
  eject: true,
  // TODO functionality
};

export const NightShade: Move = {
  name: "Night Shade",
  description: "The user makes the target see a frightening mirage. It inflicts damage equal to the user's level.",
  type: C.Types.Ghost,
  category: "Special",
  pp: 15, // max 24
  target: "Any Adjacent",
  makesContact: false,
  hp: action => (action.source instanceof Codemon ? action.source.experience.level : 0),
  // TODO functionality
};

export const Mimic: Move = {
  name: "Mimic",
  description:
    "The user copies the target's last move. The move can be used during battle until the Pokémon is switched out.",
  type: C.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: "Any Adjacent",
  makesContact: false,
  // TODO functionality
};

// why isn't this a status move apdabiouaboduiboiuafb
export const Screech: Move = {
  name: "Screech",
  description: "An earsplitting screech harshly lowers the target's Defense stat.",
  type: C.Types.Normal,
  category: "Special",
  pp: 40, // max 64
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: false,
  stage: { defense: -2 },
};

export const DoubleTeam: Move = {
  name: "Double Team",
  description: "By moving rapidly, the user makes illusory copies of itself to raise its evasiveness.",
  type: C.Types.Normal,
  category: "Status",
  pp: 15, // max 24
  target: "Self",
  makesContact: false,
  stage: { evasion: 1 },
};

export const Recover: Move = {
  name: "Recover",
  description: "Restoring its own cells, the user restores its own HP by half of its max HP.",
  type: C.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: "Self",
  makesContact: false,
  // effect: {
  //   type: "Heal",
  //   amount: "half",
  // },
  hp: action => (action.source instanceof Codemon ? action.source.stats.hp.max / 2 : 0),
  // TODO functionality
};

export const Harden: Move = {
  name: "Harden",
  description: "The user stiffens all the muscles in its body to raise its Defense stat.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30, // max 48
  target: "Self",
  makesContact: false,
  stage: { defense: 1 },
};

export const Minimize: Move = {
  name: "Minimize",
  description: "The user compresses its body to make itself look smaller, which sharply raises its evasiveness.",
  type: C.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: "Self",
  makesContact: false,
  stage: { evasion: 2 },
  status: C.Statuses.Minimize,
};

export const Smokescreen: Move = {
  name: "Smokescreen",
  description: "The user releases an obscuring cloud of smoke or ink. This lowers the target's accuracy.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: "Any Adjacent",
  makesContact: false,
  stage: { accuracy: -1 },
};

export const ConfuseRay: Move = {
  name: "Confuse Ray",
  description: "The target is exposed to a sinister ray that triggers confusion.",
  type: C.Types.Ghost,
  category: "Status",
  pp: 10, // max 16
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Confusion,
};

export const Withdraw: Move = {
  name: "Withdraw",
  description: "The user withdraws its body into its hard shell, raising its Defense stat.",
  type: C.Types.Water,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
  stage: { defense: 1 },
};

export const DefenseCurl: Move = {
  name: "Defense Curl",
  description: "The user curls up to conceal weak spots and raise its Defense stat.",
  type: C.Types.Normal,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
  stage: { defense: 1 },
  // TODO functionality
};

export const Barrier: Move = {
  name: "Barrier",
  description: "The user throws up a sturdy wall that sharply raises its Defense stat.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  target: "Self",
  makesContact: false,
  stage: { defense: 2 },
};

export const LightScreen: Move = {
  name: "Light Screen",
  description: "A wondrous wall of light is put up to reduce damage from special attacks for five turns.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 30, // max 48
  target: "Team",
  makesContact: false,
  // TODO functionality
};

export const Haze: Move = {
  name: "Haze",
  description: "The user creates a haze that eliminates every stat change among all the Pokémon engaged in battle.",
  type: C.Types.Ice,
  category: "Status",
  pp: 30, // max 48
  target: "All",
  makesContact: false,
  // TODO functionality
};

export const Reflect: Move = {
  name: "Reflect",
  description: "A wondrous wall of light is put up to reduce damage from physical attacks for five turns.",
  type: C.Types.Psychic,
  category: "Status",
  pp: 20, // max 32
  target: "Team",
  makesContact: false,
  // TODO functionality
};

export const FocusEnergy: Move = {
  name: "Focus Energy",
  description: "The user takes a deep breath and focuses so that critical hits land more easily.",
  type: C.Types.Normal,
  category: "Status",
  pp: 30, // max 48
  target: "Self",
  makesContact: false,
  // TODO functionality
};

export const Bide: Move = {
  name: "Bide",
  description: "The user endures attacks for two turns, then strikes back to cause double the damage taken.",
  type: C.Types.Normal,
  category: "Physical",
  pp: 10, // max 16
  priority: 1,
  target: "Self",
  makesContact: true,
  // TODO functionality
};

export const Metronone: Move = {
  name: "Metronome",
  description: "The user waggles a finger and stimulates its brain into randomly using nearly any move.",
  type: C.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: "Self",
  makesContact: false,
  // TODO functionality
};

export const MirrorMove: Move = {
  name: "Mirror Move",
  description: "The user counters the target by mimicking the target's last move.",
  type: C.Types.Flying,
  category: "Status",
  pp: 20, // max 32
  target: "Any Adjacent",
  makesContact: false,
  // TODO functionality
};

export const SelfDesctuct: Move = {
  name: "Self-Destruct",
  description: "The user attacks everything around it by causing an explosion. The user faints upon using this move.",
  type: C.Types.Normal,
  target: "Every Adjacent",
  category: "Physical",
  pp: 5, // max 8
  power: 200,
  makesContact: false,
  recoil: { faint: true },
};

export const EggBomb: Move = {
  name: "Egg Bomb",
  description: "A large egg is hurled at the target with maximum force to inflict damage.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10, // max 16
  power: 100,
  accuracy: 75,
  makesContact: false,
};

export const Lick: Move = {
  name: "Lick",
  description: "The target is licked with a long tongue, causing damage. It may also leave the target with paralysis.",
  type: C.Types.Ghost,
  target: "Any Adjacent",
  category: "Physical",
  pp: 30,
  power: 30,
  makesContact: true,
  status: [C.Statuses.Paralysis, 3 / 10],
};
// below are SV descriptions, above are SwSh descriptions (or the most recent usable version)
export const Smog: Move = {
  name: "Smog",
  description: "The target is attacked with a discharge of filthy gases. This may also poison the target.",
  type: C.Types.Poison,
  target: "Any Adjacent",
  category: "Special",
  pp: 20,
  power: 30,
  accuracy: 70,
  makesContact: false,
  status: [C.Statuses.Poison, 4 / 10],
};

export const Sludge: Move = {
  name: "Sludge",
  description: "Unsanitary sludge is hurled at the target. This may also poison the target.",
  type: C.Types.Poison,
  target: "Any Adjacent",
  category: "Special",
  pp: 20,
  power: 65,
  makesContact: false,
  status: [C.Statuses.Poison, 3 / 10],
};

export const BoneClub: Move = {
  name: "Bone Club",
  description: "The user clubs the target with a bone. This may also make the target flinch.",
  type: C.Types.Ground,
  target: "Any Adjacent",
  category: "Physical",
  pp: 20,
  power: 65,
  accuracy: 85,
  makesContact: false,
  status: [C.Statuses.Flinch, 1 / 10],
};
export const FireBlast: Move = {
  name: "Fire Blast",
  description:
    "The target is attacked with an intense blast of all-consuming fire. This may also leave the target with a burn.",
  type: C.Types.Fire,
  target: "Any Adjacent",
  category: "Special",
  pp: 5,
  power: 110,
  accuracy: 85,
  makesContact: false,
  status: [C.Statuses.Burn, 1 / 10],
};

export const Waterfall: Move = {
  name: "Waterfall",
  description: "The user charges at the target and may make it flinch.",
  type: C.Types.Water,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  power: 80,
  makesContact: true,
  status: [C.Statuses.Flinch, 2 / 10],
};

export const Clamp: Move = {
  name: "Clamp",
  description: "The target is clamped and squeezed by the user's very thick and sturdy shell for four to five turns.",
  type: C.Types.Water,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 35,
  accuracy: 85,
  makesContact: true,
  // TODO functionality
};

export const Swift: Move = {
  name: "Swift",
  description: "Star-shaped rays are shot at the opposing Pokémon. This attack never misses.",
  type: C.Types.Normal,
  target: "Every Adjacent Foe",
  category: "Special",
  pp: 20,
  power: 60,
  makesContact: false,
  // TODO functionality
};

export const SkullBash: Move = {
  name: "Skull Bash",
  description:
    "The user tucks in its head to raise its Defense in the first turn, then rams the target on the next turn.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 130,
  makesContact: true,
  stage: { defense: 1 },
  // TODO functionality
};

export const SpikeCannon: Move = {
  name: "Spike Cannon",
  description: "Sharp spikes are shot at the target in rapid succession. Two to five times in a row.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  power: 20,
  makesContact: false,
  // TODO functionality
};

export const Constrict: Move = {
  name: "Constrict",
  description:
    "The target is attacked with long, creeping tentacles, vines, or the like. This may also lower the target's Speed stat.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 35,
  power: 10,
  makesContact: true,
  stage: [{ speed: -1 }, 1 / 10],
};

export const Amnesia: Move = {
  name: "Amnesia",
  description:
    "The user temporarily empties its mind to forget its concerns. This sharply raises the user's Sp. Def stat.",
  type: C.Types.Psychic,
  target: "Self",
  category: "Status",
  pp: 20,
  makesContact: false,
  stage: { specialDefense: 2 },
};

export const Kinesis: Move = {
  name: "Kinesis",
  description: "The user distracts the target by bending a spoon. This lowers the target's accuracy.",
  type: C.Types.Psychic,
  target: "Any Adjacent",
  category: "Status",
  pp: 15,
  accuracy: 80,
  makesContact: false,
  stage: { accuracy: -1 },
};

export const SoftBoiled: Move = {
  name: "Soft-Boiled",
  description: "The user restores its own HP by up to half of its max HP.",
  type: C.Types.Normal,
  target: "Self",
  category: "Status",
  pp: 5,
  makesContact: false,
  hp: action => (action.source instanceof Codemon ? action.source.stats.hp.max / 2 : 0),
};

export const HighJumpKick: Move = {
  name: "High Jump Kick",
  description:
    "The target is attacked with a knee kick from a jump. If this move misses, the user takes damage instead.",
  type: C.Types.Fighting,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 130,
  accuracy: 90,
  makesContact: true,
  crash: { hp: action => (action.source instanceof Codemon ? action.source.stats.hp.max / 2 : 0) },
};

export const Glare: Move = {
  name: "Glare",
  description: "The user intimidates the target with the pattern on its belly to cause paralysis.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 30,
  makesContact: false,
  status: C.Statuses.Paralysis,
  // TODO hit ghosts
};

export const DreamEater: Move = {
  name: "Dream Eater",
  description:
    "The user eats the dreams of a sleeping target. The user's HP is restored by up to half the damage taken by the target.",
  type: C.Types.Psychic,
  target: "Any Adjacent",
  category: "Special",
  pp: 15,
  power: 100,
  makesContact: false,
  leech: 1 / 2,
  // TODO only works on sleeping targets
};

export const PoisonGas: Move = {
  name: "Poison Gas",
  description: "A cloud of poison gas is sprayed in the face of opposing Pokémon, poisoning those it hits.",
  type: C.Types.Poison,
  target: "Every Adjacent Foe",
  category: "Status",
  pp: 40,
  accuracy: 90,
  makesContact: false,
  status: C.Statuses.Poison,
};

export const Barrage: Move = {
  name: "Barrage",
  description: "Round objects are hurled at the target to strike two to five times in a row.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 20,
  power: 15,
  accuracy: 85,
  makesContact: false,
  // TODO functionality
};

export const LeechLife: Move = {
  name: "Leech Life",
  description:
    "The user drains the target's blood. The user's HP is restored by up to half the damage taken by the target.",
  type: C.Types.Bug,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 80,
  makesContact: true,
  leech: 1 / 2,
};

export const LovelyKiss: Move = {
  name: "Lovely Kiss",
  description:
    "With a scary face, the user tries to force a kiss on the target. If it succeeds, the target falls asleep.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 10,
  accuracy: 75,
  makesContact: false,
  status: C.Statuses.Sleep,
};

export const SkyAttack: Move = {
  name: "Sky Attack",
  description: "A second-turn attack move where critical hits land more easily. This may also make the target flinch.",
  type: C.Types.Flying,
  target: "Any",
  category: "Physical",
  pp: 5,
  power: 140,
  accuracy: 90,
  makesContact: true,
  status: [C.Statuses.Flinch, 1 / 3],
  // TODO functionality
};

export const Transform: Move = {
  name: "Transform",
  description: "The user transforms into a copy of the target right down to having the same move set.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 10,
  makesContact: false,
  // TODO fml
};

export const Bubble: Move = {
  name: "Bubble",
  description: "A spray of countless bubbles is jetted at the opposing Pokémon. This may also lower their Speed stat.",
  type: C.Types.Water,
  target: "Every Adjacent Foe",
  category: "Special",
  pp: 30,
  power: 40,
  makesContact: false,
  stage: [{ speed: -1 }, 1 / 10],
};

export const DizzyPunch: Move = {
  name: "Dizzy Punch",
  description: "The target is hit with rhythmically launched punches. This may also leave the target confused.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 70,
  makesContact: true,
  status: [C.Statuses.Confusion, 1 / 5],
};

export const Spore: Move = {
  name: "Spore",
  description: "The user scatters bursts of spores that induce sleep.",
  type: C.Types.Grass,
  target: "Any Adjacent",
  category: "Status",
  pp: 15,
  makesContact: false,
  status: C.Statuses.Sleep,
  // TODO miss on grass types
};

export const Flash: Move = {
  name: "Flash",
  description: "The user flashes a bright light that cuts the target's accuracy.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 20,
  makesContact: false,
  stage: { accuracy: -1 },
};
export const Psywave: Move = {
  name: "Psywave",
  description: "The target is attacked with an odd psychic wave. The attack varies in intensity.",
  type: C.Types.Psychic,
  target: "Any Adjacent",
  category: "Special",
  pp: 15,
  makesContact: false,
  hp: action =>
    action.source instanceof Codemon ? Math.floor((action.source.experience.level * (Math.random() * +50)) / 100) : 0,
};

export const Splash: Move = {
  name: "Splash",
  description: "The user just flops and splashes around to no effect at all.",
  type: C.Types.Normal,
  category: "Status",
  pp: 40, // max 64
  target: "Self",
  makesContact: false,
};

export const AcidArmor: Move = {
  name: "Acid Armor",
  description: "The user alters its cellular structure to liquefy itself, sharply raising its Defense stat.",
  type: C.Types.Poison,
  category: "Status",
  pp: 20,
  target: "Self",
  makesContact: false,
  stage: { defense: 2 },
};

export const Crabhammer: Move = {
  name: "Crabhammer",
  description:
    "The target is hammered with a large pincer. This move has a heightened chance of landing a critical hit.",
  type: C.Types.Water,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 100,
  accuracy: 90,
  makesContact: true,
  criticalHitStage: 1,
};

export const Explosion: Move = {
  name: "Explosion",
  description:
    "The user attacks everything around it by causing a tremendous explosion. The user faints upon using this move.",
  type: C.Types.Normal,
  target: "Every Adjacent",
  category: "Physical",
  pp: 5,
  power: 250,
  makesContact: false,
  recoil: { faint: true },
};

export const FurySwipes: Move = {
  name: "Fury Swipes",
  description: "The target is raked with sharp claws or scythes quickly two to five times in a row.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  power: 18,
  accuracy: 80,
  makesContact: true,
  // TODO functionality
};

export const Bonemerang: Move = {
  name: "Bonemerang",
  description: "The user throws the bone it holds. The bone loops around to hit the target twice—coming and going.",
  type: C.Types.Ground,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  power: 50,
  accuracy: 90,
  makesContact: false,
  // TODO functionality
};

export const Rest: Move = {
  name: "Rest",
  description:
    "The user goes to sleep for two turns. This fully restores the user's HP and heals any status conditions.",
  type: C.Types.Psychic,
  target: "Self",
  category: "Status",
  pp: 5,
  makesContact: false,
  // TODO functionality
};

export const RockSlide: Move = {
  name: "Rock Slide",
  description:
    "Large boulders are hurled at opposing Pokémon to inflict damage. This may also make the opposing Pokémon flinch.",
  type: C.Types.Rock,
  target: "Every Adjacent Foe",
  category: "Physical",
  pp: 10,
  power: 75,
  accuracy: 90,
  makesContact: false,
  status: [C.Statuses.Flinch, 3 / 10],
};

export const HyperFang: Move = {
  name: "Hyper Fang",
  description: "The user bites hard on the target with its sharp front fangs. This may also make the target flinch.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  power: 80,
  accuracy: 90,
  makesContact: true,
  status: [C.Statuses.Flinch, 1 / 10],
};

export const Sharpen: Move = {
  name: "Sharpen",
  description: "The user makes its edges more jagged, which raises its Attack stat.",
  type: C.Types.Normal,
  target: "Self",
  category: "Status",
  pp: 30,
  makesContact: false,
  stage: { attack: 1 },
};

export const Conversion: Move = {
  name: "Conversion",
  description:
    "The user changes its type to become the same type as the move at the top of the list of moves it knows.",
  type: C.Types.Normal,
  target: "Self",
  category: "Status",
  pp: 30,
  makesContact: false,
  // TODO functionality
};
export const TriAttack: Move = {
  name: "Tri Attack",
  description:
    "The user strikes with a simultaneous three-beam attack. This may also burn, freeze, or paralyze the target.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Special",
  pp: 10,
  power: 80,
  makesContact: false,
  // status: [
  //   [C.Statuses.Burn, 1 / 5],
  //   [C.Statuses.Freeze, 1 / 5],
  //   [C.Statuses.Paralyze, 1 / 5],
  // ],
  // TODO functionality
};

export const SuperFang: Move = {
  name: "Super Fang",
  description: "The user chomps hard on the target with its sharp front fangs. This cuts the target's HP in half.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 10,
  accuracy: 90,
  makesContact: true,
  hp: (_, target) => (target instanceof Codemon ? Math.max(Math.floor(target.stats.hp.current / 2)) : 0),
};

export const Slash: Move = {
  name: "Slash",
  description: "The target is attacked with a slash of claws or blades. Critical hits land more easily.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 20,
  power: 70,
  makesContact: true,
  criticalHitStage: 1,
};

export const Substitute: Move = {
  name: "Substitute",
  description:
    "The user creates a substitute for itself using some of its HP. The substitute serves as the user's decoy.",
  type: C.Types.Normal,
  target: "Self",
  category: "Status",
  pp: 10,
  makesContact: false,
  // TODO sheesh
};

export const Struggle: Move = {
  name: "Struggle",
  description: "This attack is used in desperation only if the user has no PP. It also damages the user a little.",
  type: C.Types.Normal,
  category: "Physical",
  target: "Any Adjacent",
  pp: 1,
  power: 50,
  makesContact: true,
  // recoil: {  },
};
export const Sketch: Move = {} as Move;
export const TripleKick: Move = {} as Move;
export const Thief: Move = {} as Move;
export const SpiderWeb: Move = {} as Move;
export const MindReader: Move = {} as Move;
export const Nightmare: Move = {} as Move;
export const FlameWheel: Move = {} as Move;
export const Snore: Move = {} as Move;
export const Curse: Move = {} as Move;
export const Flail: Move = {} as Move;
export const Conversion2: Move = {} as Move;
export const Aeroblast: Move = {} as Move;
export const CottonSpore: Move = {} as Move;
export const Reversal: Move = {} as Move;
export const Spite: Move = {} as Move;
export const PowderSnow: Move = {} as Move;
export const Protect: Move = {} as Move;
export const MachPunch: Move = {} as Move;
export const ScaryFace: Move = {} as Move;
export const FeintAttack: Move = {} as Move;
export const SweetKiss: Move = {} as Move;
export const BellyDrum: Move = {} as Move;
export const SludgeBomb: Move = {} as Move;
export const MudSlap: Move = {} as Move;
export const Octazooka: Move = {} as Move;
export const Spikes: Move = {} as Move;
export const ZapCannon: Move = {} as Move;
export const Foresight: Move = {} as Move;
export const DestinyBond: Move = {} as Move;
export const PerishSong: Move = {} as Move;
export const IcyWind: Move = {} as Move;
export const Detect: Move = {} as Move;
export const BoneRush: Move = {} as Move;
export const LockOn: Move = {} as Move;
export const Outrage: Move = {} as Move;
export const Sandstorm: Move = {
  name: "Sandstorm",
  description:
    "A five-turn sandstorm is summoned to hurt all combatants except the Rock, Ground, and Steel C.Types. It raises the Sp. Def stat of Rock C.Types.",
  type: C.Types.Rock,
  category: "Status",
  pp: 10,
  accuracy: 0,
  target: "All",
  makesContact: false,
  // weather: Weather.Sandstorm,
  // TODO functionality
};
export const GigaDrain: Move = {} as Move;
export const Endure: Move = {} as Move;
export const Charm: Move = {} as Move;
export const Rollout: Move = {} as Move;
export const FalseSwipe: Move = {} as Move;
export const Swagger: Move = {} as Move;
export const MilkDrink: Move = {} as Move;
export const Spark: Move = {} as Move;
export const FuryCutter: Move = {} as Move;
export const SteelWing: Move = {} as Move;
export const MeanLook: Move = {} as Move;
export const Attract: Move = {} as Move;
export const SleepTalk: Move = {} as Move;
export const HealBell: Move = {} as Move;
export const Return: Move = {} as Move;
export const Present: Move = {} as Move;
export const Frustration: Move = {} as Move;
export const Safeguard: Move = {} as Move;
export const PainSplit: Move = {} as Move;
export const SacredFire: Move = {} as Move;
export const Magnitude: Move = {} as Move;
export const DynamicPunch: Move = {} as Move;
export const Megahorn: Move = {} as Move;
export const DragonBreath: Move = {
  name: "Dragon Breath",
  description: "The user exhales a mighty gust that inflicts damage. This may also leave the target with paralysis.",
  type: C.Types.Dragon,
  category: "Special",
  pp: 20,
  power: 60,
  target: "Any Adjacent",
  makesContact: false,
  status: [C.Statuses.Paralysis, 3 / 10],
};
export const BatonPass: Move = {} as Move;
export const Encore: Move = {} as Move;
export const Pursuit: Move = {} as Move;
export const RapidSpin: Move = {} as Move;
export const SweetScent: Move = {
  name: "Sweet Scent",
  description: "A sweet scent that harshly lowers opposing Pokémon's evasiveness.",
  type: C.Types.Normal,
  category: "Status",
  pp: 20, // max 32
  target: "Any Adjacent Foe",
  makesContact: false,
  stage: { evasion: -2 },
};
export const IronTail: Move = {} as Move;
export const MetalClaw: Move = {} as Move;
export const VitalThrow: Move = {} as Move;
export const MorningSun: Move = {} as Move;
export const Synthesis: Move = {
  name: "Synthesis",
  description: "The user restores its own HP. The amount of HP regained varies with the weather.",
  type: C.Types.Grass,
  category: "Status",
  pp: 5, // max 8
  target: "Self",
  makesContact: false,
  hp: (_, target, _battle) => {
    if (target instanceof Codemon) return target.stats.hp.max / 8;
    // const weather = battle.weather;
    // if (weather === Weather.Sunny) return target.maxHp / 2;
    // if (weather === Weather.Rain) return target.maxHp / 4;
  },
  // TODO functionality
};

export const Moonlight: Move = {} as Move;
export const HiddenPower: Move = {} as Move;
export const CrossChop: Move = {} as Move;
export const Twister: Move = {} as Move;
export const RainDance: Move = {} as Move;
export const SunnyDay: Move = {} as Move;
export const Crunch: Move = {
  name: "Crunch",
  description: "The user crunches up the target with sharp fangs. This may also lower the target's Defense stat.",
  type: C.Types.Dark,
  category: "Physical",
  pp: 15, // max 24
  power: 80,
  target: "Any Adjacent",
  makesContact: true,
  stage: [{ defense: -1 }, 2 / 10],
};
export const MirrorCoat: Move = {} as Move;
export const PsychUp: Move = {} as Move;
export const ExtremeSpeed: Move = {} as Move;
export const AncientPower: Move = {} as Move;
export const ShadowBall: Move = {} as Move;
export const FutureSight: Move = {} as Move;
export const RockSmash: Move = {} as Move;
export const Whirlpool: Move = {} as Move;
export const BeatUp: Move = {} as Move;
export const FakeOut: Move = {} as Move;
export const Uproar: Move = {} as Move;
export const Stockpile: Move = {} as Move;
export const SpitUp: Move = {} as Move;
export const Swallow: Move = {} as Move;
export const HeatWave: Move = {} as Move;
export const Hail: Move = {} as Move;
export const Torment: Move = {} as Move;
export const Flatter: Move = {} as Move;
export const WillOWisp: Move = {} as Move;
export const Memento: Move = {} as Move;
export const Facade: Move = {} as Move;
export const FocusPunch: Move = {} as Move;
export const SmellingSalts: Move = {} as Move;
export const FollowMe: Move = {} as Move;
export const NaturePower: Move = {} as Move;
export const Charge: Move = {} as Move;
export const Taunt: Move = {} as Move;
export const HelpingHand: Move = {} as Move;
export const Trick: Move = {} as Move;
export const RolePlay: Move = {} as Move;
export const Wish: Move = {} as Move;
export const Assist: Move = {} as Move;
export const Ingrain: Move = {} as Move;
export const Superpower: Move = {} as Move;
export const MagicCoat: Move = {} as Move;
export const Recycle: Move = {} as Move;
export const Revenge: Move = {} as Move;
export const BrickBreak: Move = {} as Move;
export const Yawn: Move = {} as Move;
export const KnockOff: Move = {} as Move;
export const Endeavor: Move = {} as Move;
export const Eruption: Move = {} as Move;
export const SkillSwap: Move = {} as Move;
export const Imprison: Move = {} as Move;
export const Refresh: Move = {} as Move;
export const Grudge: Move = {} as Move;
export const Snatch: Move = {} as Move;
export const SecretPower: Move = {} as Move;
export const Dive: Move = {} as Move;
export const ArmThrust: Move = {} as Move;
export const Camouflage: Move = {} as Move;
export const TailGlow: Move = {} as Move;
export const LusterPurge: Move = {} as Move;
export const MistBall: Move = {} as Move;
export const FeatherDance: Move = {} as Move;
export const TeeterDance: Move = {} as Move;
export const BlazeKick: Move = {} as Move;
export const MudSport: Move = {} as Move;
export const IceBall: Move = {} as Move;
export const NeedleArm: Move = {} as Move;
export const SlackOff: Move = {} as Move;
export const HyperVoice: Move = {} as Move;
export const PoisonFang: Move = {} as Move;
export const CrushClaw: Move = {} as Move;
export const BlastBurn: Move = {} as Move;
export const HydroCannon: Move = {} as Move;
export const MeteorMash: Move = {} as Move;
export const Astonish: Move = {} as Move;
export const WeatherBall: Move = {} as Move;
export const Aromatherapy: Move = {} as Move;
export const FakeTears: Move = {} as Move;
export const AirCutter: Move = {} as Move;
export const Overheat: Move = {} as Move;
export const OdorSleuth: Move = {} as Move;
export const RockTomb: Move = {} as Move;
export const SilverWind: Move = {} as Move;
export const MetalSound: Move = {} as Move;
export const GrassWhistle: Move = {} as Move;
export const Tickle: Move = {} as Move;
export const CosmicPower: Move = {} as Move;
export const WaterSpout: Move = {} as Move;
export const SignalBeam: Move = {} as Move;
export const ShadowPunch: Move = {} as Move;
export const Extrasensory: Move = {} as Move;
export const SkyUppercut: Move = {} as Move;
export const SandTomb: Move = {
  name: "Sand Tomb",
  description: "The user traps the target inside a harshly raging sandstorm for four to five turns.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 15, // max 24
  power: 35,
  accuracy: 85,
  target: "Any Adjacent",
  makesContact: false,
  // TODO functionality
};
export const SheerCold: Move = {} as Move;
export const MuddyWater: Move = {} as Move;
export const BulletSeed: Move = {} as Move;
export const AerialAce: Move = {} as Move;
export const IcicleSpear: Move = {} as Move;
export const IronDefense: Move = {} as Move;
export const Block: Move = {} as Move;
export const Howl: Move = {} as Move;
export const DragonClaw: Move = {
  name: "Dragon Claw",
  description: "The user slashes the target with huge sharp claws.",
  type: C.Types.Dragon,
  category: "Physical",
  pp: 15,
  power: 80,
  target: "Any Adjacent",
  makesContact: true,
};

export const FrenzyPlant: Move = {} as Move;
export const BulkUp: Move = {} as Move;
export const Bounce: Move = {} as Move;
export const MudShot: Move = {} as Move;
export const PoisonTail: Move = {} as Move;
export const Covet: Move = {} as Move;
export const VoltTackle: Move = {} as Move;
export const MagicalLeaf: Move = {} as Move;
export const WaterSport: Move = {} as Move;
export const CalmMind: Move = {} as Move;
export const LeafBlade: Move = {} as Move;
export const DragonDance: Move = {} as Move;
export const RockBlast: Move = {} as Move;
export const ShockWave: Move = {} as Move;
export const WaterPulse: Move = {} as Move;
export const DoomDesire: Move = {} as Move;
export const PsychoBoost: Move = {} as Move;
export const Roost: Move = {} as Move;
export const Gravity: Move = {} as Move;
export const MiracleEye: Move = {} as Move;
export const WakeUpSlap: Move = {} as Move;
export const HammerArm: Move = {} as Move;
export const GyroBall: Move = {} as Move;
export const HealingWish: Move = {} as Move;
export const Brine: Move = {} as Move;
export const NaturalGift: Move = {} as Move;
export const Feint: Move = {} as Move;
export const Pluck: Move = {} as Move;
export const Tailwind: Move = {} as Move;
export const Acupressure: Move = {} as Move;
export const MetalBurst: Move = {} as Move;
export const Uturn: Move = {} as Move;
export const CloseCombat: Move = {} as Move;
export const Payback: Move = {} as Move;
export const Assurance: Move = {} as Move;
export const Embargo: Move = {} as Move;
export const Fling: Move = {} as Move;
export const PsychoShift: Move = {} as Move;
export const TrumpCard: Move = {} as Move;
export const HealBlock: Move = {} as Move;
export const WringOut: Move = {} as Move;
export const PowerTrick: Move = {} as Move;
export const GastroAcid: Move = {} as Move;
export const LuckyChant: Move = {} as Move;
export const MeFirst: Move = {} as Move;
export const Copycat: Move = {} as Move;
export const PowerSwap: Move = {} as Move;
export const GuardSwap: Move = {} as Move;
export const Punishment: Move = {} as Move;
export const LastResort: Move = {} as Move;
export const WorrySeed: Move = {
  name: "Worry Seed",
  description:
    "A seed that causes worry is planted on the target. It prevents sleep by making the target's Ability Insomnia.",
  type: C.Types.Grass,
  category: "Status",
  pp: 10, // max 16
  priority: 0,
  target: "Any Adjacent",
  makesContact: false,
  // TODO functionality
};
export const SuckerPunch: Move = {} as Move;
export const ToxicSpikes: Move = {} as Move;
export const HeartSwap: Move = {} as Move;
export const AquaRing: Move = {} as Move;
export const MagnetRise: Move = {} as Move;
export const FlareBlitz: Move = {} as Move;
export const ForcePalm: Move = {} as Move;
export const AuraSphere: Move = {} as Move;
export const RockPolish: Move = {} as Move;
export const PoisonJab: Move = {} as Move;
export const DarkPulse: Move = {} as Move;
export const NightSlash: Move = {} as Move;
export const AquaTail: Move = {} as Move;
export const SeedBomb: Move = {
  name: "Seed Bomb",
  description: "The user slams a barrage of hard-shelled seeds down on the target from above.",
  type: C.Types.Grass,
  category: "Physical",
  pp: 15, // max 24
  power: 80,
  target: "Any Adjacent",
  makesContact: false,
};
export const AirSlash: Move = {} as Move;
export const XScissor: Move = {} as Move;
export const BugBuzz: Move = {} as Move;
export const DragonPulse: Move = {} as Move;
export const DragonRush: Move = {
  name: "Dragon Rush",
  description:
    "The user tackles the target while exhibiting overwhelming menace. This may also make the target flinch.",
  type: C.Types.Dragon,
  category: "Physical",
  pp: 10, // max 16
  power: 100,
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: true,
  // TODO functionality
};
export const PowerGem: Move = {} as Move;
export const DrainPunch: Move = {} as Move;
export const VacuumWave: Move = {} as Move;
export const FocusBlast: Move = {} as Move;
export const EnergyBall: Move = {} as Move;
export const BraveBird: Move = {} as Move;
export const EarthPower: Move = {} as Move;
export const Switcheroo: Move = {} as Move;
export const GigaImpact: Move = {} as Move;
export const NastyPlot: Move = {} as Move;
export const BulletPunch: Move = {} as Move;
export const Avalanche: Move = {} as Move;
export const IceShard: Move = {} as Move;
export const ShadowClaw: Move = {} as Move;
export const ThunderFang: Move = {} as Move;
export const IceFang: Move = {} as Move;
export const FireFang: Move = {} as Move;
export const ShadowSneak: Move = {} as Move;
export const MudBomb: Move = {} as Move;
export const PsychoCut: Move = {} as Move;
export const ZenHeadbutt: Move = {} as Move;
export const MirrorShot: Move = {} as Move;
export const FlashCannon: Move = {} as Move;
export const RockClimb: Move = {} as Move;
export const Defog: Move = {} as Move;
export const TrickRoom: Move = {} as Move;
export const DracoMeteor: Move = {} as Move;
export const Discharge: Move = {} as Move;
export const LavaPlume: Move = {} as Move;
export const LeafStorm: Move = {} as Move;
export const PowerWhip: Move = {} as Move;
export const RockWrecker: Move = {} as Move;
export const CrossPoison: Move = {} as Move;
export const GunkShot: Move = {} as Move;
export const IronHead: Move = {} as Move;
export const MagnetBomb: Move = {} as Move;
export const StoneEdge: Move = {} as Move;
export const Captivate: Move = {} as Move;
export const StealthRock: Move = {} as Move;
export const GrassKnot: Move = {} as Move;
export const Chatter: Move = {} as Move;
export const Judgment: Move = {} as Move;
export const BugBite: Move = {} as Move;
export const ChargeBeam: Move = {} as Move;
export const WoodHammer: Move = {} as Move;
export const AquaJet: Move = {} as Move;
export const AttackOrder: Move = {} as Move;
export const DefendOrder: Move = {} as Move;
export const HealOrder: Move = {} as Move;
export const HeadSmash: Move = {} as Move;
export const DoubleHit: Move = {} as Move;
export const RoarofTime: Move = {} as Move;
export const SpacialRend: Move = {} as Move;
export const LunarDance: Move = {} as Move;
export const CrushGrip: Move = {} as Move;
export const MagmaStorm: Move = {} as Move;
export const DarkVoid: Move = {} as Move;
export const SeedFlare: Move = {} as Move;
export const OminousWind: Move = {} as Move;
export const ShadowForce: Move = {} as Move;
export const HoneClaws: Move = {} as Move;
export const WideGuard: Move = {} as Move;
export const GuardSplit: Move = {} as Move;
export const PowerSplit: Move = {} as Move;
export const WonderRoom: Move = {} as Move;
export const Psyshock: Move = {} as Move;
export const Venoshock: Move = {} as Move;
export const Autotomize: Move = {} as Move;
export const RagePowder: Move = {} as Move;
export const Telekinesis: Move = {} as Move;
export const MagicRoom: Move = {} as Move;
export const SmackDown: Move = {} as Move;
export const StormThrow: Move = {} as Move;
export const FlameBurst: Move = {} as Move;
export const SludgeWave: Move = {} as Move;
export const QuiverDance: Move = {} as Move;
export const HeavySlam: Move = {} as Move;
export const Synchronoise: Move = {} as Move;
export const ElectroBall: Move = {} as Move;
export const Soak: Move = {} as Move;
export const FlameCharge: Move = {} as Move;
export const Coil: Move = {} as Move;
export const LowSweep: Move = {} as Move;
export const AcidSpray: Move = {} as Move;
export const FoulPlay: Move = {} as Move;
export const SimpleBeam: Move = {} as Move;
export const Entrainment: Move = {} as Move;
export const AfterYou: Move = {} as Move;
export const Round: Move = {} as Move;
export const EchoedVoice: Move = {} as Move;
export const ChipAway: Move = {} as Move;
export const ClearSmog: Move = {} as Move;
export const StoredPower: Move = {} as Move;
export const QuickGuard: Move = {} as Move;
export const AllySwitch: Move = {} as Move;
export const Scald: Move = {} as Move;
export const ShellSmash: Move = {} as Move;
export const HealPulse: Move = {} as Move;
export const Hex: Move = {} as Move;
export const SkyDrop: Move = {} as Move;
export const ShiftGear: Move = {} as Move;
export const CircleThrow: Move = {} as Move;
export const Incinerate: Move = {} as Move;
export const Quash: Move = {} as Move;
export const Acrobatics: Move = {} as Move;
export const ReflectType: Move = {} as Move;
export const Retaliate: Move = {} as Move;
export const FinalGambit: Move = {} as Move;
export const Bestow: Move = {} as Move;
export const Inferno: Move = {} as Move;
export const WaterPledge: Move = {} as Move;
export const FirePledge: Move = {} as Move;
export const GrassPledge: Move = {} as Move;
export const VoltSwitch: Move = {} as Move;
export const StruggleBug: Move = {} as Move;
export const Bulldoze: Move = {
  name: "Bulldoze",
  description:
    "The user tramples its target into the ground, dealing damage. This also lowers the target's action speed.",
  type: C.Types.Ground,
  category: "Physical",
  pp: 20,
  power: 60,
  target: "Every Adjacent",
  makesContact: false,
  stage: { speed: -1 },
};

export const FrostBreath: Move = {} as Move;
export const DragonTail: Move = {} as Move;
export const WorkUp: Move = {} as Move;
export const Electroweb: Move = {} as Move;
export const WildCharge: Move = {} as Move;
export const DrillRun: Move = {} as Move;
export const DualChop: Move = {
  name: "Dual Chop",
  description: "The user attacks its target by hitting it with brutal strikes. The target is hit twice in a row.",
  type: C.Types.Dragon,
  category: "Physical",
  pp: 15, // max 24
  power: 80,
  accuracy: 90,
  target: "Any Adjacent",
  makesContact: true,
  // TODO multihit
};
export const HeartStamp: Move = {} as Move;
export const HornLeech: Move = {} as Move;
export const SacredSword: Move = {} as Move;
export const RazorShell: Move = {} as Move;
export const HeatCrash: Move = {} as Move;
export const LeafTornado: Move = {} as Move;
export const Steamroller: Move = {} as Move;
export const CottonGuard: Move = {} as Move;
export const NightDaze: Move = {} as Move;
export const Psystrike: Move = {} as Move;
export const TailSlap: Move = {} as Move;
export const Hurricane: Move = {} as Move;
export const HeadCharge: Move = {} as Move;
export const GearGrind: Move = {} as Move;
export const SearingShot: Move = {} as Move;
export const TechnoBlast: Move = {} as Move;
export const RelicSong: Move = {} as Move;
export const SecretSword: Move = {} as Move;
export const Glaciate: Move = {} as Move;
export const BoltStrike: Move = {} as Move;
export const BlueFlare: Move = {} as Move;
export const FieryDance: Move = {} as Move;
export const FreezeShock: Move = {} as Move;
export const IceBurn: Move = {} as Move;
export const Snarl: Move = {} as Move;
export const IcicleCrash: Move = {} as Move;
export const Vcreate: Move = {} as Move;
export const FusionFlare: Move = {} as Move;
export const FusionBolt: Move = {} as Move;
export const FlyingPress: Move = {} as Move;
export const MatBlock: Move = {} as Move;
export const Belch: Move = {} as Move;
export const Rototiller: Move = {} as Move;
export const StickyWeb: Move = {} as Move;
export const FellStinger: Move = {} as Move;
export const PhantomForce: Move = {} as Move;
export const TrickorTreat: Move = {} as Move;
export const NobleRoar: Move = {} as Move;
export const IonDeluge: Move = {} as Move;
export const ParabolicCharge: Move = {} as Move;
export const ForestsCurse: Move = {} as Move;
export const PetalBlizzard: Move = {} as Move;
export const FreezeDry: Move = {} as Move;
export const DisarmingVoice: Move = {} as Move;
export const PartingShot: Move = {} as Move;
export const TopsyTurvy: Move = {} as Move;
export const DrainingKiss: Move = {} as Move;
export const CraftyShield: Move = {} as Move;
export const FlowerShield: Move = {} as Move;
export const GrassyTerrain: Move = {} as Move;
export const MistyTerrain: Move = {} as Move;
export const Electrify: Move = {} as Move;
export const PlayRough: Move = {} as Move;
export const FairyWind: Move = {} as Move;
export const Moonblast: Move = {} as Move;
export const Boomburst: Move = {} as Move;
export const FairyLock: Move = {} as Move;
export const KingsShield: Move = {} as Move;
export const PlayNice: Move = {} as Move;
export const Confide: Move = {} as Move;
export const DiamondStorm: Move = {} as Move;
export const SteamEruption: Move = {} as Move;
export const HyperspaceHole: Move = {} as Move;
export const WaterShuriken: Move = {} as Move;
export const MysticalFire: Move = {} as Move;
export const SpikyShield: Move = {} as Move;
export const AromaticMist: Move = {} as Move;
export const EerieImpulse: Move = {} as Move;
export const VenomDrench: Move = {} as Move;
export const Powder: Move = {} as Move;
export const Geomancy: Move = {} as Move;
export const MagneticFlux: Move = {} as Move;
export const HappyHour: Move = {} as Move;
export const ElectricTerrain: Move = {} as Move;
export const DazzlingGleam: Move = {} as Move;
export const Celebrate: Move = {} as Move;
export const HoldHands: Move = {} as Move;
export const BabyDollEyes: Move = {} as Move;
export const Nuzzle: Move = {} as Move;
export const HoldBack: Move = {} as Move;
export const Infestation: Move = {} as Move;
export const PowerUpPunch: Move = {} as Move;
export const OblivionWing: Move = {} as Move;
export const ThousandArrows: Move = {} as Move;
export const ThousandWaves: Move = {} as Move;
export const LandsWrath: Move = {} as Move;
export const LightofRuin: Move = {} as Move;
export const OriginPulse: Move = {} as Move;
export const PrecipiceBlades: Move = {} as Move;
export const DragonAscent: Move = {} as Move;
export const HyperspaceFury: Move = {} as Move;
/*
these are strange z moves so ignore them for now. it shouldn't be a problem
export const BreakneckBlitz: Move = {}  as Move;
// export const BreakneckBlitz: Move = {}  as Move;
export const AllOutPummeling: Move = {}  as Move;
// export const AllOutPummeling: Move = {}  as Move;
export const SupersonicSkystrike: Move = {}  as Move;
// export const SupersonicSkystrike: Move = {}  as Move;
export const AcidDownpour: Move = {}  as Move;
// export const AcidDownpour: Move = {}  as Move;
export const TectonicRage: Move = {}  as Move;
// export const TectonicRage: Move = {}  as Move;
export const ContinentalCrush: Move = {}  as Move;
// export const ContinentalCrush: Move = {}  as Move;
export const SavageSpinOut: Move = {}  as Move;
// export const SavageSpinOut: Move = {}  as Move;
export const NeverEndingNightmare: Move = {}  as Move;
// export const NeverEndingNightmare: Move = {}  as Move;
export const CorkscrewCrash: Move = {}  as Move;
// export const CorkscrewCrash: Move = {}  as Move;
export const InfernoOverdrive: Move = {}  as Move;
// export const InfernoOverdrive: Move = {}  as Move;
export const HydroVortex: Move = {}  as Move;
// export const HydroVortex: Move = {}  as Move;
export const BloomDoom: Move = {}  as Move;
// export const BloomDoom: Move = {}  as Move;
export const GigavoltHavoc: Move = {}  as Move;
// export const GigavoltHavoc: Move = {}  as Move;
export const ShatteredPsyche: Move = {}  as Move;
// export const ShatteredPsyche: Move = {}  as Move;
export const SubzeroSlammer: Move = {}  as Move;
// export const SubzeroSlammer: Move = {}  as Move;
export const DevastatingDrake: Move = {}  as Move;
// export const DevastatingDrake: Move = {}  as Move;
export const BlackHoleEclipse: Move = {}  as Move;
// export const BlackHoleEclipse: Move = {}  as Move;
export const TwinkleTackle: Move = {}  as Move;
// export const TwinkleTackle: Move = {}  as Move;
export const Catastropika: Move = {} as Move;
*/
export const ShoreUp: Move = {} as Move;
export const FirstImpression: Move = {} as Move;
export const BanefulBunker: Move = {} as Move;
export const SpiritShackle: Move = {} as Move;
export const DarkestLariat: Move = {} as Move;
export const SparklingAria: Move = {} as Move;
export const IceHammer: Move = {} as Move;
export const FloralHealing: Move = {} as Move;
export const HighHorsepower: Move = {} as Move;
export const StrengthSap: Move = {} as Move;
export const SolarBlade: Move = {} as Move;
export const Leafage: Move = {} as Move;
export const Spotlight: Move = {} as Move;
export const ToxicThread: Move = {} as Move;
export const LaserFocus: Move = {} as Move;
export const GearUp: Move = {} as Move;
export const ThroatChop: Move = {} as Move;
export const PollenPuff: Move = {} as Move;
export const AnchorShot: Move = {} as Move;
export const PsychicTerrain: Move = {} as Move;
export const Lunge: Move = {} as Move;
export const FireLash: Move = {} as Move;
export const PowerTrip: Move = {} as Move;
export const BurnUp: Move = {} as Move;
export const SpeedSwap: Move = {} as Move;
export const SmartStrike: Move = {} as Move;
export const Purify: Move = {} as Move;
export const RevelationDance: Move = {} as Move;
export const CoreEnforcer: Move = {} as Move;
export const TropKick: Move = {} as Move;
export const Instruct: Move = {} as Move;
export const BeakBlast: Move = {} as Move;
export const ClangingScales: Move = {} as Move;
export const DragonHammer: Move = {} as Move;
export const BrutalSwing: Move = {} as Move;
export const AuroraVeil: Move = {} as Move;
export const SinisterArrowRaid: Move = {} as Move;
export const MaliciousMoonsault: Move = {} as Move;
export const OceanicOperetta: Move = {} as Move;
export const GuardianofAlola: Move = {} as Move;
export const SoulStealing7StarStrike: Move = {} as Move;
export const StokedSparksurfer: Move = {} as Move;
export const PulverizingPancake: Move = {} as Move;
export const ExtremeEvoboost: Move = {} as Move;
export const GenesisSupernova: Move = {} as Move;
export const ShellTrap: Move = {} as Move;
export const FleurCannon: Move = {} as Move;
export const PsychicFangs: Move = {} as Move;
export const StompingTantrum: Move = {} as Move;
export const ShadowBone: Move = {} as Move;
export const Accelerock: Move = {} as Move;
export const Liquidation: Move = {} as Move;
export const PrismaticLaser: Move = {} as Move;
export const SpectralThief: Move = {} as Move;
export const SunsteelStrike: Move = {} as Move;
export const MoongeistBeam: Move = {} as Move;
export const TearfulLook: Move = {} as Move;
export const ZingZap: Move = {} as Move;
export const NaturesMadness: Move = {} as Move;
export const MultiAttack: Move = {} as Move;
export const TenKVoltThunderbolt: Move = {} as Move;
export const MindBlown: Move = {} as Move;
export const PlasmaFists: Move = {} as Move;
export const PhotonGeyser: Move = {} as Move;
export const LightThatBurnstheSky: Move = {} as Move;
export const SearingSunrazeSmash: Move = {} as Move;
export const MenacingMoonrazeMaelstrom: Move = {} as Move;
export const LetsSnuggleForever: Move = {} as Move;
export const SplinteredStormshards: Move = {} as Move;
export const ClangorousSoulblaze: Move = {} as Move;
export const ZippyZap: Move = {} as Move;
export const SplishySplash: Move = {} as Move;
export const FloatyFall: Move = {} as Move;
export const PikaPapow: Move = {} as Move;
export const BouncyBubble: Move = {} as Move;
export const BuzzyBuzz: Move = {} as Move;
export const SizzlySlide: Move = {} as Move;
export const GlitzyGlow: Move = {} as Move;
export const BaddyBad: Move = {} as Move;
export const SappySeed: Move = {} as Move;
export const FreezyFrost: Move = {} as Move;
export const SparklySwirl: Move = {} as Move;
export const VeeveeVolley: Move = {} as Move;
export const DoubleIronBash: Move = {} as Move;
export const MaxGuard: Move = {} as Move;
export const DynamaxCannon: Move = {} as Move;
export const SnipeShot: Move = {} as Move;
export const JawLock: Move = {} as Move;
export const StuffCheeks: Move = {} as Move;
export const NoRetreat: Move = {} as Move;
export const TarShot: Move = {} as Move;
export const MagicPowder: Move = {} as Move;
export const DragonDarts: Move = {} as Move;
export const Teatime: Move = {} as Move;
export const Octolock: Move = {} as Move;
export const BoltBeak: Move = {} as Move;
export const FishiousRend: Move = {} as Move;
export const CourtChange: Move = {} as Move;
export const MaxFlare: Move = {} as Move;
export const MaxFlutterby: Move = {} as Move;
export const MaxLightning: Move = {} as Move;
export const MaxStrike: Move = {} as Move;
export const MaxKnuckle: Move = {} as Move;
export const MaxPhantasm: Move = {} as Move;
export const MaxHailstorm: Move = {} as Move;
export const MaxOoze: Move = {} as Move;
export const MaxGeyser: Move = {} as Move;
export const MaxAirstream: Move = {} as Move;
export const MaxStarfall: Move = {} as Move;
export const MaxWyrmwind: Move = {} as Move;
export const MaxMindstorm: Move = {} as Move;
export const MaxRockfall: Move = {} as Move;
export const MaxQuake: Move = {} as Move;
export const MaxDarkness: Move = {} as Move;
export const MaxOvergrowth: Move = {} as Move;
export const MaxSteelspike: Move = {} as Move;
export const ClangorousSoul: Move = {} as Move;
export const BodyPress: Move = {} as Move;
export const Decorate: Move = {} as Move;
export const DrumBeating: Move = {} as Move;
export const SnapTrap: Move = {} as Move;
export const PyroBall: Move = {} as Move;
export const BehemothBlade: Move = {} as Move;
export const BehemothBash: Move = {} as Move;
export const AuraWheel: Move = {} as Move;
export const BreakingSwipe: Move = {} as Move;
export const BranchPoke: Move = {} as Move;
export const Overdrive: Move = {} as Move;
export const AppleAcid: Move = {} as Move;
export const GravApple: Move = {} as Move;
export const SpiritBreak: Move = {} as Move;
export const StrangeSteam: Move = {} as Move;
export const LifeDew: Move = {} as Move;
export const Obstruct: Move = {} as Move;
export const FalseSurrender: Move = {} as Move;
export const MeteorAssault: Move = {} as Move;
export const Eternabeam: Move = {} as Move;
export const SteelBeam: Move = {} as Move;
export const ExpandingForce: Move = {} as Move;
export const SteelRoller: Move = {} as Move;
export const ScaleShot: Move = {} as Move;
export const MeteorBeam: Move = {} as Move;
export const ShellSideArm: Move = {} as Move;
export const MistyExplosion: Move = {} as Move;
export const GrassyGlide: Move = {} as Move;
export const RisingVoltage: Move = {} as Move;
export const TerrainPulse: Move = {} as Move;
export const SkitterSmack: Move = {} as Move;
export const BurningJealousy: Move = {} as Move;
export const LashOut: Move = {} as Move;
export const Poltergeist: Move = {} as Move;
export const CorrosiveGas: Move = {} as Move;
export const Coaching: Move = {} as Move;
export const FlipTurn: Move = {} as Move;
export const TripleAxel: Move = {} as Move;
export const DualWingbeat: Move = {} as Move;
export const ScorchingSands: Move = {} as Move;
export const JungleHealing: Move = {} as Move;
export const WickedBlow: Move = {} as Move;
export const SurgingStrikes: Move = {} as Move;
export const ThunderCage: Move = {} as Move;
export const DragonEnergy: Move = {} as Move;
export const FreezingGlare: Move = {} as Move;
export const FieryWrath: Move = {} as Move;
export const ThunderousKick: Move = {} as Move;
export const GlacialLance: Move = {} as Move;
export const AstralBarrage: Move = {} as Move;
export const EerieSpell: Move = {} as Move;
export const DireClaw: Move = {} as Move;
export const PsyshieldBash: Move = {} as Move;
export const PowerShift: Move = {} as Move;
export const StoneAxe: Move = {} as Move;
export const SpringtideStorm: Move = {} as Move;
export const MysticalPower: Move = {} as Move;
export const RagingFury: Move = {} as Move;
export const WaveCrash: Move = {} as Move;
export const Chloroblast: Move = {} as Move;
export const MountainGale: Move = {} as Move;
export const VictoryDance: Move = {} as Move;
export const HeadlongRush: Move = {} as Move;
export const BarbBarrage: Move = {} as Move;
export const EsperWing: Move = {} as Move;
export const BitterMalice: Move = {} as Move;
export const Shelter: Move = {} as Move;
export const TripleArrows: Move = {} as Move;
export const InfernalParade: Move = {} as Move;
export const CeaselessEdge: Move = {} as Move;
export const BleakwindStorm: Move = {} as Move;
export const WildboltStorm: Move = {} as Move;
export const SandsearStorm: Move = {} as Move;
export const LunarBlessing: Move = {} as Move;
export const TakeHeart: Move = {} as Move;
