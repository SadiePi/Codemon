import { Codex, Move, power } from "../index.ts";
import preload from "../preload.ts";

export const Acid: Move = preload.register<Move>((C: Codex) => ({
  name: "Acid",
  description: "Opposing Pokémon are attacked with a spray of harsh acid. This may also lower their Sp. Def stats.",
  type: C.Types.Poison,
  category: "Special",
  pp: 30,
  attack: power(40),
  target: "Every Adjacent Foe",
  makesContact: false,
  stages: { specialDefense: -1 },
}));
