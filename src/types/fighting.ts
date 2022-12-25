import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Fighting = types.register(() => ({
  name: "Fighting",
  color: "#C03028",
  weaknesses: [C.Types.Flying, C.Types.Psychic, C.Types.Fairy],
  resistances: [C.Types.Rock, C.Types.Bug],
  immunities: [],
}));
