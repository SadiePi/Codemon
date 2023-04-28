import { Move, Codemon } from "../mod.ts";
import loader from "../loader.ts";

export const Guillotine: Move = loader.register<Move>(P => ({
  name: "Guillotine",
  description: "A vicious, tearing attack with big pincers. The target faints instantly if this attack hits.",
  type: P.Types.Normal,
  category: "Physical",
  pp: 5,
  accuracy: ({
    action: {
      params: { user },
    },
    target,
  }) => {
    const userLevel = user instanceof Codemon ? user.stats.level : 0;
    const targetLevel = target instanceof Codemon ? target.stats.level : 0;
    return 30 + userLevel - targetLevel;
  },
  target: "Any Adjacent",
  makesContact: true,
  faint: true,
}));
