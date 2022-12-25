import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Ghost = types.register(() => ({
  name: "Ghost",
  color: "#705898",
  weaknesses: [C.Types.Ghost, C.Types.Dark],
  resistances: [C.Types.Poison, C.Types.Bug],
  immunities: [C.Types.Normal, C.Types.Fighting],
}));
