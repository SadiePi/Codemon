import U, { TraditionalBattle, flattenBattleNodeMessages, spawn } from "../codex/uranium/mod.ts";
import { iBulby } from "./common.ts";

const nucleon = spawn({ species: U.Species.Nucleon, moves: [U.Moves.Tackle, U.Moves.GammaRay] });
const bulby = spawn(iBulby);

const battle = new TraditionalBattle([nucleon, bulby]);
const gammaRay = nucleon.moves.get(U.Moves.GammaRay)!;
const result = await battle.runPlan({ combatant: nucleon, source: gammaRay, targets: [bulby] });
const messages = flattenBattleNodeMessages(result);
messages.forEach(m => console.log(m));
