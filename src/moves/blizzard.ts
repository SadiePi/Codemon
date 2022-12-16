import C, { Move } from "../index.ts";

export const Blizzard: Move = {
  name: "Blizzard",
  description:
    "A howling blizzard is summoned to strike opposing Pokémon. This may also leave the opposing Pokémon frozen.",
  type: C.Types.Ice,
  category: "Special",
  pp: 5,
  power: 110,
  accuracy: 70,
  target: "Every Adjacent Foe",
  makesContact: false,
  status: [C.Statuses.Freeze, 1 / 10],
};
