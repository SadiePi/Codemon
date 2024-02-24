import P, { flattenBattleNodeMessages, spawn, TraditionalBattle } from "../codex/pokemon/mod.ts";
import { iBulby } from "./common.ts";

const bulby = spawn(iBulby);
const garchomp = spawn({ species: P.Species.Garchomp });

const battle = new TraditionalBattle([garchomp, bulby]);
const tackle = bulby.moves[0];
const plan = { combatant: bulby, source: tackle, targets: [garchomp] };
const result = await battle.runPlan(plan);
const messages = flattenBattleNodeMessages(result);
messages.forEach(m => console.log(m));
