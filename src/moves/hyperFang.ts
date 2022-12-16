import C, { Move } from "../index.ts";

export const HyperFang: Move = {
  name: "Hyper Fang",
  description: "The user bites hard on the target with its sharp front fangs. This may also make the target flinch.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 15,
  power: 80,
  accuracy: 90,
  makesContact: true,
  status: [C.Statuses.Flinch, 1 / 10],
};