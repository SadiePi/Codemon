import C, { Type } from "../index.ts";

export const Normal: Type = {
  name: "Normal",
  color: "#A8A878",
  weaknesses: [C.Types.Fighting],
  resistances: [],
  immunities: [C.Types.Ghost],
};
