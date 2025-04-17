import { iBulby } from "../../example/common.ts";
import { assertEquals } from "../../test/_common.ts";
import { Codemon } from "../codemon.ts";
import {
  Actionable,
  ActionPlan,
  ActionResult,
  ContestSchema,
  Team,
  TurnBasedContest,
} from "./core/contest.ts";

interface PBS extends ContestSchema<PBS> {
  name: "PkmnBattle";
  contestResult: { winner: Team<PBS> | undefined };
  contestant: Codemon;
  roundResult: { actions: ActionResult<PBS>[] };
}

class PkmnBattle extends TurnBasedContest<PBS> {
  override run() {
    while (this.teams.length > 1) this.runRound();
    return { winner: this.teams[0] };
  }

  override runRound() {
    const plans: ActionPlan<PBS>[] = this.teams.flat().map((c) => ({
      actionable: new Actionable(c),
      targets: [c],
    }));
    // TODO sort
    const results = plans.map((p) => this.runAction(p));
    return { actions: results };
  }

  override runAction(plan: ActionPlan<PBS>): ActionResult<PBS> {
    const action = plan.actionable.getAction();
    // ...
    return { plan };
  }

  readonly type = "PkmnBattle";
}

Deno.test("Pokemon", () => {
  const bulby = new Codemon(iBulby);
  const B = new PkmnBattle(bulby);
  const r = B.run();
  assertEquals(r.winner.map((c) => c.name).join(", "), "Bulby");
});
