import C, { Move } from "../index.ts";

export const DoubleTeam: Move = {
  name: "Double Team",
  description: "By moving rapidly, the user makes illusory copies of itself to raise its evasiveness.",
  type: C.Types.Normal,
  category: "Status",
  pp: 15, // max 24
  target: "Self",
  makesContact: false,
  stage: { evasion: 1 },
};
