import * as T from "./standard.ts";
// T will contain everything for Codemon

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
  //coedexColor: CodexColor,
  baseFriendship: 70,
  baseStats: [45, 49, 49, 45, 65, 65],
  evYields: [0, 0, 0, 0, 1, 0]
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
  baseStats: [100, 100, 100, 100, 100, 100],
  evYields: [3, 0, 0, 0, 0, 0],
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
  baseStats: [108, 130, 95, 102, 80, 85],
  evYields: [0, 3, 0, 0, 0, 0]
  //learnset: Learnset
};

const b = new T.Codemon({
  species: bulbasaur,
  name: "Bulby",
  ivs: [undefined, 30, undefined, undefined, undefined, undefined],
  level: 100,
});

const m = new T.Codemon({
  species: mew,
});

const g = new T.Codemon({
  species: garchomp,
  name: "Noam Chompy",
  sex: T.SexFemale,
  level: 78,
  nature: T.Nature.Adamant,
  ivs: [24, 12, 30, 5, 16, 23],
  evs: [74, 190, 91, 23, 48, 84]
});

console.debug(`${g}`);
