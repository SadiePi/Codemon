import * as T from "./standard.ts";
// T will contain everything for Typemon

const bulbasaur: T.Species = {
  name: "Bulbasaur",
  //graphics: Graphics,
  type1: T.TypeNone,
  type2: T.TypeNone,
  //normalAbility1: Ability,
  //normalAbility2: Ability,
  //specialAbility: Ability,
  sexRatio: 0.875,
  catchRate: 45,
  eggCycles: 20,
  height: 0.7,
  weight: 6.9,
  baseExperienceYield: 64,
  experienceGroup: T.expGroupMedSlow,
  //bodyStyle: BodyStyle,
  //footprint: Footprint,
  //typedexColor: TypedexColor,
  baseFriendship: 70,
  baseHP: 45,
  baseAttack: 49,
  baseDefense: 49,
  baseSpecialAttack: 65,
  baseSpecialDefense: 65,
  baseSpeed: 45,
  HPEVYield: 0,
  attackEVYield: 0,
  defenseEVYield: 0,
  specialAttackEVYield: 1,
  specialDefenseEVYield: 0,
  speedEVYield: 0,
  //learnset: Learnset
};

const mew: T.Species = {
  name: "Mew",
  //graphics: Graphics,
  type1: T.TypeNone,
  type2: T.TypeNone,
  //normalAbility1: Ability,
  //normalAbility2: Ability,
  //specialAbility: Ability,
  sexRatio: 0,
  catchRate: 45,
  eggCycles: 120,
  height: 0.4,
  weight: 4.0,
  baseExperienceYield: 270,
  experienceGroup: T.expGroupMedSlow,
  //bodyStyle: BodyStyle,
  //footprint: Footprint,
  //typedexColor: TypedexColor,
  baseFriendship: 100,
  baseHP: 100,
  baseAttack: 100,
  baseDefense: 100,
  baseSpecialAttack: 100,
  baseSpecialDefense: 100,
  baseSpeed: 100,
  HPEVYield: 3,
  attackEVYield: 0,
  defenseEVYield: 0,
  specialAttackEVYield: 0,
  specialDefenseEVYield: 0,
  speedEVYield: 0,
  //learnset: Learnset

  getSex: function () {
    return T.SexNone;
  },
};

const garchomp: T.Species = {
  name: "Garchomp",
  //graphics: Graphics,
  type1: T.TypeNone,
  type2: T.TypeNone,
  //normalAbility1: Ability,
  //normalAbility2: Ability,
  //specialAbility: Ability,
  sexRatio: 0.5,
  catchRate: 45,
  eggCycles: 120,
  height: 1.9,
  weight: 95.0,
  baseExperienceYield: 270,
  experienceGroup: T.expGroupSlow,
  //bodyStyle: BodyStyle,
  //footprint: Footprint,
  //typedexColor: TypedexColor,
  baseFriendship: 70,
  baseHP: 108,
  baseAttack: 130,
  baseDefense: 95,
  baseSpecialAttack: 80,
  baseSpecialDefense: 85,
  baseSpeed: 102,
  HPEVYield: 0,
  attackEVYield: 3,
  defenseEVYield: 0,
  specialAttackEVYield: 0,
  specialDefenseEVYield: 0,
  speedEVYield: 0,
  //learnset: Learnset
};

const b = new T.Typemon({
  species: bulbasaur,
  name: "Bulby",
  attackIV: 30,
  level: 100,
});

const m = new T.Typemon({
  species: mew,
});

const g = new T.Typemon({
  species: garchomp,
  name: "Noam Chompy",
  sex: T.SexFemale,
  level: 78,
  nature: T.Nature.Adamant,
  hpIV: 24,
  attackIV: 12,
  defenseIV: 30,
  specialAttackIV: 16,
  specialDefenseIV: 23,
  speedIV: 5,
  hpEV: 74,
  attackEV: 190,
  defenseEV: 91,
  specialAttackEV: 48,
  specialDefenseEV: 84,
  speedEV: 23,
});

console.debug(`${m}`);
