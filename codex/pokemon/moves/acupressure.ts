import { Move, Stats, choose, decide } from "../mod.ts";
import loader from "../loader.ts";

export const Acupressure: Move = loader.register<Move>(P => ({
  name: "Acupressure",
  description: "The user applies pressure to stress points, sharply boosting one of its or its allies' stats.",
  type: P.Types.Normal,
  category: "Status",
  pp: 30,
  target: { alignment: "Ally", position: "Adjacent", includeSelf: true },
  makesContact: false,

  stages: ({ target }) => {
    const raisableStats = Stats.filter(s => {
      !target.stats[s].stage.isMax;
    });
    const chosenStat = decide(choose(...raisableStats), undefined);
    return { [chosenStat]: 2 };
  },
}));
