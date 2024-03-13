// Create Codex entries (Species, Moves, etc.) at runtime
// They won't be added to the Codex itself, but they can be used in the same way
// The only limitation is that they can't reference themselves
// As with the Codex, changing the runtime entries will affect all future uses of them

import P, { Move, TraditionalBattle, choose, spawn, flattenBattleNodeMessages } from "../codex/pokemon/mod.ts";
import { iBulby } from "./common.ts";

const TwistOfFate: Move = {
  name: "Twist of Fate",
  description: "Inflicts a random status effect on the foe.",
  type: P.Types.Fairy,
  pp: 15,
  category: "Status",
  target: { alignment: "Any" },
  makesContact: false,

  status: choose(
    P.Statuses.Burn,
    P.Statuses.Paralysis,
    P.Statuses.Flinch

    // not yet implemented:
    // P.Statuses.Freeze,
    // P.Statuses.Poison,
    // P.Statuses.Sleep,
    // P.Statuses.Confusion,
  ),
};

const bulby = spawn({
  ...iBulby,
  moves: [TwistOfFate],
});

const battle = new TraditionalBattle([bulby]);
const tof = bulby.moves.get(TwistOfFate)!;
const result = await battle.runPlan({ combatant: bulby, source: tof, targets: [bulby] });
if (!result.success) throw new Error("Move failed");
flattenBattleNodeMessages(result).forEach(m => console.log(m));
