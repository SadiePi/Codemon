import { Type, TypeNone } from "../index.ts";

// Apparently there isn't a better way to do this in Typescript
export let TypeNormal: Type = TypeNone;
export let TypeFighting: Type = TypeNone;
export let TypeFlying: Type = TypeNone; 
export let TypePoison: Type = TypeNone;
export let TypeGround: Type = TypeNone;
export let TypeRock: Type = TypeNone;
export let TypeBug: Type = TypeNone;
export let TypeGhost: Type = TypeNone;
export let TypeSteel: Type = TypeNone;
export let TypeFire: Type = TypeNone;
export let TypeWater: Type = TypeNone;
export let TypeGrass: Type = TypeNone;
export let TypeElectric: Type = TypeNone;
export let TypePsychic: Type = TypeNone;
export let TypeIce: Type = TypeNone;
export let TypeDragon: Type = TypeNone;
export let TypeDark: Type = TypeNone;
export let TypeFairy: Type = TypeNone;

TypeNormal = {
  weaknesses: [TypeFighting],
  resistances: [],
  immunities: [TypeGhost],
};

TypeFighting = {
  weaknesses: [TypeFlying, TypePsychic, TypeFairy],
  resistances: [TypeRock, TypeBug],
  immunities: [],
};

TypeFlying = {
  weaknesses: [TypeRock, TypeElectric, TypeIce],
  resistances: [TypeFighting, TypeBug, TypeGrass],
  immunities: [TypeGround],
};

TypePoison = {
  weaknesses: [TypeGround, TypePsychic],
  resistances: [TypeFighting, TypePoison, TypeBug, TypeGrass, TypeFairy],
  immunities: [],
};

TypeGround = {
  weaknesses: [TypeWater, TypeGrass, TypeIce],
  resistances: [TypePoison, TypeRock],
  immunities: [TypeElectric],
};

TypeRock = {
  weaknesses: [TypeFighting, TypeGround, TypeSteel, TypeWater, TypeGrass],
  resistances: [TypeNormal, TypeFlying, TypePoison, TypeFire],
  immunities: [],
};

TypeBug = {
  weaknesses: [TypeFlying, TypeRock, TypeFire],
  resistances: [TypeFighting, TypeGround, TypeGrass],
  immunities: [],
};

TypeGhost = {
  weaknesses: [TypeGhost, TypeDark],
  resistances: [TypePoison, TypeBug],
  immunities: [TypeNormal, TypeFighting],
};

TypeSteel = {
  weaknesses: [TypeFighting, TypeGround, TypeFire],
  resistances: [
    TypeNormal,
    TypeFlying,
    TypeRock,
    TypeBug,
    TypeSteel,
    TypeGrass,
    TypePsychic,
    TypeIce,
    TypeDragon,
    TypeFairy,
  ], // jfc
  immunities: [TypePoison],
};

TypeFire = {
  weaknesses: [TypeGround, TypeRock, TypeWater],
  resistances: [TypeBug, TypeSteel, TypeFire, TypeGrass, TypeIce, TypeFairy],
  immunities: [],
};

TypeWater = {
    weaknesses: [TypeGrass, TypeElectric],
    resistances: [TypeSteel,TypeFire,TypeWater],
    immunities: []
};

TypeGrass = {
  weaknesses: [TypeFlying, TypePoison, TypeBug, TypeFire, TypeIce],
  resistances: [TypeGround, TypeWater, TypeGrass, TypeElectric],
  immunities: [],
};

TypeElectric = {
  weaknesses: [TypeGround],
  resistances: [TypeFlying, TypeSteel, TypeElectric],
  immunities: [],
};

TypePsychic = {
    weaknesses: [TypeBug,TypeGhost,TypeDark],
    resistances: [TypeFighting,TypePsychic],
    immunities: []
};

TypeIce = {
    weaknesses: [TypeFighting,TypeRock,TypeSteel,TypeFire],
    resistances: [TypeIce],
    immunities: []
};

TypeDragon = {
  weaknesses: [TypeIce, TypeDragon, TypeFairy],
  resistances: [TypeFire, TypeWater, TypeGrass, TypeElectric],
  immunities: [],
};

TypeDark = {
  weaknesses: [TypeFighting, TypeBug, TypeFairy],
  resistances: [TypeGhost, TypeDark],
  immunities: [TypePsychic],
};

TypeFairy = {
  weaknesses: [TypePoison, TypeSteel],
  resistances: [TypeFighting, TypeBug, TypeDark],
  immunities: [TypeDragon],
};
