import C from "../index.ts";
import { moves } from "../core/codex.ts";

export const Acid = moves.register(() => ({
  name: "Acid",
  description: "Opposing Pokémon are attacked with a spray of harsh acid. This may also lower their Sp. Def stats.",
  type: C.Types.Poison,
  category: "Special",
  pp: 30,
  power: 40,
  target: "Every Adjacent Foe",
  makesContact: false,
  stages: { specialDefense: -1 },
}));
