import Input from "https://deno.land/x/input/index.ts";
import Codemon from "./codemon.ts";
import { Move } from "./move.ts";

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

interface Actions {
  move: { move: Move; target: Codemon[] };
  item: { item: never; target: Codemon }; // TODO
  switch: { out: Codemon; replacement: Codemon };
  flee: {};
}

export interface Action<T extends keyof Actions> {
  type: T;
  actor: Codemon;
  params: Actions[T];
}

export class Battle {
  public combatants: Codemon[];

  public constructor(args: { combatants: Codemon[] }) {
    this.combatants = args.combatants;
  }

  public runTurn() {
    // get actions to be taken this turn
    const actions = this.combatants.map((c) => c.Act(this)) as Action<
      keyof Actions
    >[];

    // sort actions, accounting for priority if it's a move
    actions.sort((a, b) => {
      return (
        ((b as Action<"move">).params.move?.info.priority ?? 0) -
          ((a as Action<"move">).params.move?.info.priority ?? 0) ||
        b.actor.stats.speed.value(true) - a.actor.stats.speed.value(true)
      );
    });

    // apply each action
    actions.forEach((a) => {
      if (a.actor.stats.hp.current <= 0) return;
      console.log(`Next:\n${a.actor}`);

      switch (a.type) {
        case "move":
          const ma = a as Action<"move">;
          if (!ma.params.move.PP.Use()) {
            console.log(
              `${ma.actor.name} tried to use ${ma.params.move.info.name}, but it had no PP left!`
            );
            return;
          }
          console.log(`${ma.actor.name} used ${ma.params.move.info.name}!`);
          ma.params.target.forEach((t) => {
            if (!this.combatants.includes(t)) return;
            const usage = ma.params.move.Use(t, false);
            const hit = t.RecieveMove(usage);
            console.log(`${t.name} took ${hit.damage} damage!`);
            if (t.stats.hp.current <= 0) {
              console.log(`${t.name} fainted!`);
              this.combatants = this.combatants.filter((c) => c != t);
            }
          });

          break;
        case "switch":
          break;
        case "item":
          break;
        case "flee":
          break;
      }
      console.log();
    });
  }

  public play() {
    while (this.combatants.length > 1) {
      this.runTurn();
    }
  }
}
