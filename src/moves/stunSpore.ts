import C, { Move } from "../index.ts";

export const StunSpore: Move = {
  name: "Stun Spore",
  description: "The user scatters a cloud of numbing powder that paralyzes the target.",
  type: C.Types.Grass,
  category: "Status",
  pp: 30, // max 48
  accuracy: 75,
  target: "Any Adjacent",
  makesContact: false,
  status: C.Statuses.Paralysis,
};
