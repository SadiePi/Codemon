import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const Minimize: Move = loader.register<Move>(P => ({
  name: "Minimize",
  description: "The user compresses its body to make itself look smaller, which sharply raises its evasiveness.",
  type: P.Types.Normal,
  category: "Status",
  pp: 10, // max 16
  target: { alignment: "Self" },
  makesContact: false,
  stages: { evasion: 2 },
  status: P.Statuses.Minimize,
}));
