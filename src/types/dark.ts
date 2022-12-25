import C from "../index.ts";
import { types } from "../core/codex.ts";

export const Dark = types.register(() => ({
  name: "Dark",
  color: "#705848",
  weaknesses: [C.Types.Fighting, C.Types.Bug, C.Types.Fairy],
  resistances: [C.Types.Ghost, C.Types.Dark],
  immunities: [C.Types.Psychic],
}));
