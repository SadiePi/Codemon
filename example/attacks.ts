import P, { flattenBattleNodeMessages, spawn } from "../codex/pokemon/mod.ts";
import { iBulby } from "./common.ts";
import Traditional from "../src/battle/traditional.ts";

const bulby = spawn(iBulby);
const garchomp = spawn({ species: P.Species.Garchomp });

const battle = new Traditional([garchomp, bulby]);
const tackle = bulby.moves[0];
const plan = { combatant: bulby, source: tackle, targets: [garchomp] };
const result = await battle.runPlan(plan);
const messages = flattenBattleNodeMessages(result);
messages.forEach(m => console.log(m));
