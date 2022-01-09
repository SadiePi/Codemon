import { Type, INIT } from "../core/type.ts"

// Apparently there isn't a better way to do this in Typescript
let Normal: Type = INIT
let Fighting: Type = INIT
let Flying: Type = INIT
let Poison: Type = INIT
let Ground: Type = INIT
let Rock: Type = INIT
let Bug: Type = INIT
let Ghost: Type = INIT
let Steel: Type = INIT
let Fire: Type = INIT
let Water: Type = INIT
let Grass: Type = INIT
let Electric: Type = INIT
let Psychic: Type = INIT
let Ice: Type = INIT
let Dragon: Type = INIT
let Dark: Type = INIT
let Fairy: Type = INIT

Normal = {
  weaknesses: [Fighting],
  resistances: [],
  immunities: [Ghost],
}

Fighting = {
  weaknesses: [Flying, Psychic, Fairy],
  resistances: [Rock, Bug],
  immunities: [],
}

Flying = {
  weaknesses: [Rock, Electric, Ice],
  resistances: [Fighting, Bug, Grass],
  immunities: [Ground],
}

Poison = {
  weaknesses: [Ground, Psychic],
  resistances: [Fighting, Poison, Bug, Grass, Fairy],
  immunities: [],
}

Ground = {
  weaknesses: [Water, Grass, Ice],
  resistances: [Poison, Rock],
  immunities: [Electric],
}

Rock = {
  weaknesses: [Fighting, Ground, Steel, Water, Grass],
  resistances: [Normal, Flying, Poison, Fire],
  immunities: [],
}

Bug = {
  weaknesses: [Flying, Rock, Fire],
  resistances: [Fighting, Ground, Grass],
  immunities: [],
}

Ghost = {
  weaknesses: [Ghost, Dark],
  resistances: [Poison, Bug],
  immunities: [Normal, Fighting],
}

Steel = {
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
}

Fire = {
  weaknesses: [Ground, Rock, Water],
  resistances: [Bug, Steel, Fire, Grass, Ice, Fairy],
  immunities: [],
}

Water = {
  weaknesses: [Grass, Electric],
  resistances: [Steel, Fire, Water],
  immunities: [],
}

Grass = {
  weaknesses: [Flying, Poison, Bug, Fire, Ice],
  resistances: [Ground, Water, Grass, Electric],
  immunities: [],
}

Electric = {
  weaknesses: [Ground],
  resistances: [Flying, Steel, Electric],
  immunities: [],
}

Psychic = {
  weaknesses: [Bug, Ghost, Dark],
  resistances: [Fighting, Psychic],
  immunities: [],
}

Ice = {
  weaknesses: [Fighting, Rock, Steel, Fire],
  resistances: [Ice],
  immunities: [],
}

Dragon = {
  weaknesses: [Ice, Dragon, Fairy],
  resistances: [Fire, Water, Grass, Electric],
  immunities: [],
}

Dark = {
  weaknesses: [Fighting, Bug, Fairy],
  resistances: [Ghost, Dark],
  immunities: [Psychic],
}

Fairy = {
  weaknesses: [Poison, Steel],
  resistances: [Fighting, Bug, Dark],
  immunities: [Dragon],
}

export default {
  INIT,
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
}
