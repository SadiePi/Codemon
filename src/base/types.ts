import { Type, INIT } from "../core/type.ts";

// Apparently there isn't a better way to do this in Typescript
let Normal: Type = INIT;
let Fighting: Type = INIT;
let Flying: Type = INIT;
let Poison: Type = INIT;
let Ground: Type = INIT;
let Rock: Type = INIT;
let Bug: Type = INIT;
let Ghost: Type = INIT;
let Steel: Type = INIT;
let Fire: Type = INIT;
let Water: Type = INIT;
let Grass: Type = INIT;
let Electric: Type = INIT;
let Psychic: Type = INIT;
let Ice: Type = INIT;
let Dragon: Type = INIT;
let Dark: Type = INIT;
let Fairy: Type = INIT;

Normal = {
  name: "Normal",
  weaknesses: [Fighting],
  resistances: [],
  immunities: [Ghost],
};

Fighting = {
  name: "Fighting",
  weaknesses: [Flying, Psychic, Fairy],
  resistances: [Rock, Bug],
  immunities: [],
};

Flying = {
  name: "Flying",
  weaknesses: [Rock, Electric, Ice],
  resistances: [Fighting, Bug, Grass],
  immunities: [Ground],
};

Poison = {
  name: "Poison",
  weaknesses: [Ground, Psychic],
  resistances: [Fighting, Poison, Bug, Grass, Fairy],
  immunities: [],
};

Ground = {
  name: "Ground",
  weaknesses: [Water, Grass, Ice],
  resistances: [Poison, Rock],
  immunities: [Electric],
};

Rock = {
  name: "Rock",
  weaknesses: [Fighting, Ground, Steel, Water, Grass],
  resistances: [Normal, Flying, Poison, Fire],
  immunities: [],
};

Bug = {
  name: "Bug",
  weaknesses: [Flying, Rock, Fire],
  resistances: [Fighting, Ground, Grass],
  immunities: [],
};

Ghost = {
  name: "Ghost",
  weaknesses: [Ghost, Dark],
  resistances: [Poison, Bug],
  immunities: [Normal, Fighting],
};

Steel = {
  name: "Steel",
  weaknesses: [Fighting, Ground, Fire],
  resistances: [
    Normal,
    Flying,
    Rock,
    Bug,
    Steel,
    Grass,
    Psychic,
    Ice,
    Dragon,
    Fairy,
  ], // jfc
  immunities: [Poison],
};

Fire = {
  name: "Fire",
  weaknesses: [Ground, Rock, Water],
  resistances: [Bug, Steel, Fire, Grass, Ice, Fairy],
  immunities: [],
};

Water = {
  name: "Water",
  weaknesses: [Grass, Electric],
  resistances: [Steel, Fire, Water],
  immunities: [],
};

Grass = {
  name: "Grass",
  weaknesses: [Flying, Poison, Bug, Fire, Ice],
  resistances: [Ground, Water, Grass, Electric],
  immunities: [],
};

Electric = {
  name: "Electric",
  weaknesses: [Ground],
  resistances: [Flying, Steel, Electric],
  immunities: [],
};

Psychic = {
  name: "Psychic",
  weaknesses: [Bug, Ghost, Dark],
  resistances: [Fighting, Psychic],
  immunities: [],
};

Ice = {
  name: "Ice",
  weaknesses: [Fighting, Rock, Steel, Fire],
  resistances: [Ice],
  immunities: [],
};

Dragon = {
  name: "Dragon",
  weaknesses: [Ice, Dragon, Fairy],
  resistances: [Fire, Water, Grass, Electric],
  immunities: [],
};

Dark = {
  name: "Dark",
  weaknesses: [Fighting, Bug, Fairy],
  resistances: [Ghost, Dark],
  immunities: [Psychic],
};

Fairy = {
  name: "Fairy",
  weaknesses: [Poison, Steel],
  resistances: [Fighting, Bug, Dark],
  immunities: [Dragon],
};

export default {
  Normal,
  Fighting,
  Flying,
  Poison,
  Ground,
  Rock,
  Bug,
  Ghost,
  Steel,
  Fire,
  Water,
  Grass,
  Electric,
  Psychic,
  Ice,
  Dragon,
  Dark,
  Fairy,
};
