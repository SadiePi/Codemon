import { iBulby } from "../../../../example/common.ts";
import { assertEquals } from "../../../../test/_common.ts";
import { Codemon } from "../../../codemon.ts";
import {
  Action,
  Actionable,
  ActionContext,
  ActionPlan,
  ActionResult,
  ContestSchema,
  Team,
  TurnBasedContest,
} from "../../core/contest.ts";

export abstract class PBS implements ContestSchema<PBS> {
  abstract name: "PkmnBattle";
  abstract contestResult: { winner: Team<PBS> | undefined };
  abstract contestant: Codemon;
  abstract roundResult: { actions: ActionResult<PBS>[] };
  abstract effects: Record<string, unknown>;
  abstract historyData: string;
}

export class PkmnBattle extends TurnBasedContest<PBS> {
  readonly type = "PkmnBattle";
  override run() {
    while (this.teams.length > 1) this.runRound();
    return { winner: this.teams[0] };
  }

  override runRound() {
    const plans: ActionPlan<PBS>[] = this.teams.flat().map((c) =>
      c.getPlan(this)
    );
    // TODO sort
    const results = plans.map((p) => this.runPlan(p));
    return { actions: results };
  }

  override runPlan(plan: ActionPlan<PBS>): ActionResult<PBS> {
    const context: ActionContext<PBS> = { plan };
    const action = plan.actionable.getAction(context);
    const result = action.run();
    return result;
  }
}

export class BattleMoveEntry extends Actionable<PBS> {
  override getAction(context: ActionContext<PBS>) {
    return new (class extends Action<PBS> {
      override run(): ActionResult<PBS> {
        return { context };
      }
    })();
  }
}

Deno.test("Pokemon", () => {
  const bulby = new Codemon(iBulby);
  const B = new PkmnBattle(bulby);
  const r = B.run();
  assertEquals(r.winner.map((c) => c.name).join(", "), "Bulby");
});
