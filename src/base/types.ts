import { Type } from "./index.ts";

// TODO: Make an automated system for doing curcular references

export const Normal = {} as Type;
export const Fighting = {} as Type;
export const Flying = {} as Type;
export const Poison = {} as Type;
export const Ground = {} as Type;
export const Rock = {} as Type;
export const Bug = {} as Type;
export const Ghost = {} as Type;
export const Steel = {} as Type;
export const Fire = {} as Type;
export const Water = {} as Type;
export const Grass = {} as Type;
export const Electric = {} as Type;
export const Psychic = {} as Type;
export const Ice = {} as Type;
export const Dragon = {} as Type;
export const Dark = {} as Type;
export const Fairy = {} as Type;

const assignType = Object.assign<Type, Type>;

assignType(Normal, {
  name: "Normal",
  color: "#A8A878",
  weaknesses: [Fighting],
  resistances: [],
  immunities: [Ghost],
});

assignType(Fighting, {
  name: "Fighting",
  color: "#C03028",
  weaknesses: [Flying, Psychic, Fairy],
  resistances: [Rock, Bug],
  immunities: [],
});

assignType(Flying, {
  name: "Flying",
  color: "#A890F0",
  weaknesses: [Rock, Electric, Ice],
  resistances: [Fighting, Bug, Grass],
  immunities: [Ground],
});

assignType(Poison, {
  name: "Poison",
  color: "#A040A0",
  weaknesses: [Ground, Psychic],
  resistances: [Fighting, Poison, Bug, Grass, Fairy],
  immunities: [],
});

assignType(Ground, {
  name: "Ground",
  color: "#E0C068",
  weaknesses: [Water, Grass, Ice],
  resistances: [Poison, Rock],
  immunities: [Electric],
});

assignType(Rock, {
  name: "Rock",
  color: "#B8A038",
  weaknesses: [Fighting, Ground, Steel, Water, Grass],
  resistances: [Normal, Flying, Poison, Fire],
  immunities: [],
});

assignType(Bug, {
  name: "Bug",
  color: "#A8B820",
  weaknesses: [Flying, Rock, Fire],
  resistances: [Fighting, Ground, Grass],
  immunities: [],
});

assignType(Ghost, {
  name: "Ghost",
  color: "#705898",
  weaknesses: [Ghost, Dark],
  resistances: [Poison, Bug],
  immunities: [Normal, Fighting],
});

assignType(Steel, {
  name: "Steel",
  color: "#B8B8D0",
  weaknesses: [Fighting, Ground, Fire],
  resistances: [Normal, Flying, Rock, Bug, Steel, Grass, Psychic, Ice, Dragon, Fairy],
  immunities: [Poison],
});

assignType(Fire, {
  name: "Fire",
  color: "#F08030",
  weaknesses: [Ground, Rock, Water],
  resistances: [Bug, Steel, Fire, Grass, Ice, Fairy],
  immunities: [],
});

assignType(Water, {
  name: "Water",
  color: "#6890F0",
  weaknesses: [Grass, Electric],
  resistances: [Steel, Fire, Water, Ice],
  immunities: [],
});

assignType(Grass, {
  name: "Grass",
  color: "#78C850",
  weaknesses: [Flying, Poison, Bug, Fire, Ice],
  resistances: [Ground, Water, Grass, Electric],
  immunities: [],
});

assignType(Electric, {
  name: "Electric",
  color: "#F8D030",
  weaknesses: [Ground],
  resistances: [Flying, Steel, Electric],
  immunities: [],
});

assignType(Psychic, {
  name: "Psychic",
  color: "#F85888",
  weaknesses: [Bug, Ghost, Dark],
  resistances: [Fighting, Psychic],
  immunities: [],
});

assignType(Ice, {
  name: "Ice",
  color: "#98D8D8",
  weaknesses: [Fighting, Rock, Steel, Fire],
  resistances: [Ice],
  immunities: [],
});

assignType(Dragon, {
  name: "Dragon",
  color: "#7038F8",
  weaknesses: [Ice, Dragon, Fairy],
  resistances: [Fire, Water, Grass, Electric],
  immunities: [],
});

assignType(Dark, {
  name: "Dark",
  color: "#705848",
  weaknesses: [Fighting, Bug, Fairy],
  resistances: [Ghost, Dark],
  immunities: [Psychic],
});

assignType(Fairy, {
  name: "Fairy",
  color: "#EE99AC",
  weaknesses: [Poison, Steel],
  resistances: [Fighting, Bug, Dark],
  immunities: [Dragon],
});
