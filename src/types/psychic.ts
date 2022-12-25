import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Psychic = types.register(() => ({
  name: "Psychic",
  color: "#F85888",
  weaknesses: [C.Types.Bug, C.Types.Ghost, C.Types.Dark],
  resistances: [C.Types.Fighting, C.Types.Psychic],
  immunities: [],
}));
