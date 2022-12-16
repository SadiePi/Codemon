import C, { Move } from "../index.ts";

export const DragonRush: Move = {
  name: "Dragon Rush",
  description:
    "The user tackles the target while exhibiting overwhelming menace. This may also make the target flinch.",
  type: C.Types.Dragon,
  category: "Physical",
  pp: 10, // max 16
  power: 100,
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: true,
};
// TODO status consideration (boost against minimize)