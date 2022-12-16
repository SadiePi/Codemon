import C, { Move } from "../index.ts";

export const Acid: Move = {
  name: "Acid",
  description: "Opposing Pokémon are attacked with a spray of harsh acid. This may also lower their Sp. Def stats.",
  type: C.Types.Poison,
  category: "Special",
  pp: 30,
  power: 40,
  target: "Every Adjacent Foe",
  makesContact: false,
  stage: { specialDefense: -1 },
};
