import C, { Move } from "../index.ts";

export const Constrict: Move = {
  name: "Constrict",
  description:
    "The target is attacked with long, creeping tentacles, vines, or the like. This may also lower the target's Speed stat.",
  type: C.Types.Normal,
  target: "Any Adjacent",
  category: "Physical",
  pp: 35,
  power: 10,
  makesContact: true,
  stage: [{ speed: -1 }, 1 / 10],
};