import C, { Move } from "../index.ts";

export const Flash: Move = {
  name: "Flash",
  description: "The user flashes a bright light that cuts the target's accuracy.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Status",
  pp: 20,
  makesContact: false,
  stage: { accuracy: -1 },
};