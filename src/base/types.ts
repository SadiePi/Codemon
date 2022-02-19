import { Type } from "../core/index.ts";

// Apparently there isn't a better way to do this in Typescript
// TODO: Make an automated system for doing this

export let Normal: Type = {} as Type;
export let Fighting: Type = {} as Type;
export let Flying: Type = {} as Type;
export let Poison: Type = {} as Type;
export let Ground: Type = {} as Type;
export let Rock: Type = {} as Type;
export let Bug: Type = {} as Type;
export let Ghost: Type = {} as Type;
export let Steel: Type = {} as Type;
export let Fire: Type = {} as Type;
export let Water: Type = {} as Type;
export let Grass: Type = {} as Type;
export let Electric: Type = {} as Type;
export let Psychic: Type = {} as Type;
export let Ice: Type = {} as Type;
export let Dragon: Type = {} as Type;
export let Dark: Type = {} as Type;
export let Fairy: Type = {} as Type;

Normal.name = "Normal";
Normal.weaknesses = [Fighting];
Normal.resistances = [];
Normal.immunities = [Ghost];

Fighting.name = "Fighting";
Fighting.weaknesses = [Flying, Psychic, Fairy];
Fighting.resistances = [Rock, Bug];
Fighting.immunities = [];

Flying.name = "Flying";
Flying.weaknesses = [Rock, Electric, Ice];
Flying.resistances = [Fighting, Bug, Grass];
Flying.immunities = [Ground];

Poison.name = "Poison";
Poison.weaknesses = [Ground, Psychic];
Poison.resistances = [Fighting, Poison, Bug, Grass, Fairy];
Poison.immunities = [];

Ground.name = "Ground";
Ground.weaknesses = [Water, Grass, Ice];
Ground.resistances = [Poison, Rock];
Ground.immunities = [Electric];

Rock.name = "Rock";
Rock.weaknesses = [Fighting, Ground, Steel, Water, Grass];
Rock.resistances = [Normal, Flying, Poison, Fire];
Rock.immunities = [];

Bug.name = "Bug";
Bug.weaknesses = [Flying, Rock, Fire];
Bug.resistances = [Fighting, Ground, Grass];
Bug.immunities = [];

Ghost.name = "Ghost";
Ghost.weaknesses = [Ghost, Dark];
Ghost.resistances = [Poison, Bug];
Ghost.immunities = [Normal, Fighting];

Steel.name = "Steel";
Steel.weaknesses = [Fighting, Ground, Fire];
Steel.resistances = [
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
]; // jfc
Steel.immunities = [Poison];

Fire.name = "Fire";
Fire.weaknesses = [Ground, Rock, Water];
Fire.resistances = [Bug, Steel, Fire, Grass, Ice, Fairy];
Fire.immunities = [];

Water.name = "Water";
Water.weaknesses = [Grass, Electric];
Water.resistances = [Steel, Fire, Water];
Water.immunities = [];

Grass.name = "Grass";
Grass.weaknesses = [Flying, Poison, Bug, Fire, Ice];
Grass.resistances = [Ground, Water, Grass, Electric];
Grass.immunities = [];

Electric.name = "Electric";
Electric.weaknesses = [Ground];
Electric.resistances = [Flying, Steel, Electric];
Electric.immunities = [];

Psychic.name = "Psychic";
Psychic.weaknesses = [Bug, Ghost, Dark];
Psychic.resistances = [Fighting, Psychic];
Psychic.immunities = [];

Ice.name = "Ice";
Ice.weaknesses = [Fighting, Rock, Steel, Fire];
Ice.resistances = [Ice];
Ice.immunities = [];

Dragon.name = "Dragon";
Dragon.weaknesses = [Ice, Dragon, Fairy];
Dragon.resistances = [Fire, Water, Grass, Electric];
Dragon.immunities = [];

Dark.name = "Dark";
Dark.weaknesses = [Fighting, Bug, Fairy];
Dark.resistances = [Ghost, Dark];
Dark.immunities = [Psychic];

Fairy.name = "Fairy";
Fairy.weaknesses = [Poison, Steel];
Fairy.resistances = [Fighting, Bug, Dark];
Fairy.immunities = [Dragon];

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
