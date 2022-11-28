import Codemon, { spawn } from "../core/codemon.ts";
import { ActionReciept, ActionReport, ActionSource, Battle, ReadyAction } from "../core/battle.ts";

export class TraditionalBattle extends Battle {
  public combatants: Codemon[];

  constructor(...combatants: (Codemon | Parameters<typeof spawn>[0])[]) {
    super();
    this.combatants = combatants.map(c => (c instanceof Codemon ? c : spawn(c)));
  }

  getTargets(_source: ActionSource): Codemon[] {
    throw new Error("Method not implemented.");
  }

  async runBattle() {
    await this.wait("start", this.combatants);
    while (this.combatants.length > 1) await this.runRound();
    const ret = { winner: this.combatants[0] ?? null };
    await this.wait("afterEnd", ret);
    return ret;
  }

  async runRound() {
    await this.wait("round", this.combatants, this.round);

    const actions = this.sortActions(await this.getActions());
    const reports: ActionReport[] = [];
    for (const action of actions) {
      const report = await this.applyAction(action);
      reports.push(...report);
    }

    await this.wait("roundEnd", {
      round: this.round,
      reports,
      messages: [],
      reactions: [],
    });
  }

  // deno-lint-ignore require-await
  async getActions() {
    const actions = this.combatants.map(c => this.getAIAction(c));
    return actions;
  }

  // getTeamActions() {
  //   throw new Error("Method not implemented.");
  //   return []
  // }

  getAIAction(codemon: Codemon): ReadyAction {
    return {
      source: codemon.moves[0].actionSource,
      targets: [this.combatants[this.combatants.findIndex(c => c !== codemon)]],
    };
  }

  sortActions(actions: ReadyAction[]) {
    return actions.sort((a, b) => {
      const prioDiff = (a.source.priority ?? 0) - (b.source.priority ?? 0);
      if (prioDiff !== 0) return prioDiff;

      const aSpeed = a.source.type === "Move" ? a.source.move.user.stats.speed.value(true) : 0;
      const bSpeed = b.source.type === "Move" ? b.source.move.user.stats.speed.value(true) : 0;
      return bSpeed - aSpeed;
    });
  }

  async applyAction(ready: ReadyAction): Promise<ActionReport[]> {
    const reports: ActionReport[] = [];

    await this.wait("beforeAction", ready);
    const action = ready.source.use(ready.targets, this);
    await this.wait("action", action);

    for (const preaction of this.sortActions(action.preactions)) {
      const report = await this.applyAction(preaction);
      reports.push(...report);
    }

    const reciepts: ActionReciept[] = [];
    for (const target of action.targets) {
      await this.wait("beforeActionReciept", action, target);
      const reciept = await target.RecieveAction(action);
      await this.wait("actionReciept", reciept);
      reciepts.push(reciept);
    }

    const report: ActionReport = {
      source: ready.source,
      targets: action.targets,
      action,
      reciepts,
      messages: [],
    };
    await this.wait("actionReport", report);
    reports.push(report);

    for (const reaction of this.sortActions(action.reactions)) {
      const report = await this.applyAction(reaction);
      reports.push(...report);
    }

    return reports;
  }

  consoleInterface() {
    this.on("start", async () => {
      console.log("Battle started!\n");
      console.log("Combatants:");
      console.log(this.combatants.map(c => c.toString(false)).join("\n"));
      await new Promise(resolve => setTimeout(resolve, 3000));
    });

    this.on("round", async round => {
      console.log("\nRound " + round + "!");
      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    this.on("action", async action => {
      if (action.source.type === "Move") {
        console.log(
          `${action.source.move.user.name} used ${action.source.move.data.name} on ${action.targets
            .map(t => t.name)
            .join(", ")}!`
        );
      }

      if (action.source.type === "Item") {
        // console.log(`Used ${action.source.}!`);
      }

      // if (action.source.type === "Swap") {
      //   // console.log(`Used ${action.source.}!`);
      // }

      // if (action.source.type === "Flee") {
      //   // console.log(`Used ${action.source.}!`);
      // }

      await new Promise(resolve => setTimeout(resolve, 1000));
    });
  }
}
