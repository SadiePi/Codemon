import C, { Move } from "../index.ts";

export const Minimize: Move = {
  name: "Minimize",
  description: "The user compresses its body to make itself look smaller, which sharply raises its evasiveness.",
  type: C.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: "Self",
  makesContact: false,
  stage: { evasion: 2 },
  status: C.Statuses.Minimize,
};
