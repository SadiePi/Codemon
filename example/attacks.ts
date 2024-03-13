import P, { flattenBattleNodeMessages, spawn, TraditionalBattle } from "../codex/pokemon/mod.ts";
import { iBulby } from "./common.ts";

const bulby = spawn(iBulby);
const garchomp = spawn({ species: P.Species.Garchomp });

const battle = new TraditionalBattle([garchomp, bulby]);
const tackle = bulby.moves.get(P.Moves.Tackle)!;
const result = await battle.runPlan({ combatant: bulby, source: tackle, targets: [garchomp] });
const messages = flattenBattleNodeMessages(result);
messages.forEach(m => console.log(m));
