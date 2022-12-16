import C, { Move } from "../index.ts";

export const AuroraBeam: Move = {
  name: "Aurora Beam",
  description: "The target is hit with a rainbow-colored beam. This may also lower the target's Attack stat.",
  type: C.Types.Ice,
  category: "Special",
  pp: 20,
  power: 65,
  target: "Any Adjacent",
  makesContact: false,
  stage: [{ attack: -1 }, 1 / 10],
};
