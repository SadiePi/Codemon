import { ICodemon } from "./codemon.ts";
import { Decider } from "./decision.ts";
import { Move } from "./move.ts";
import { Nature } from "./stats.ts";
import { Trainer } from "./trainer.ts";
import { closure } from "./util.ts";

// this file is used to inject code dependencies into the rest of the program, whereas config.ts is used to inject constants
// TODO maybe this should be in ./codex.ts?
export const [setRandomNatureDecider, getRandomNatureDecider] = closure<Decider<Nature, ICodemon>>();
export const [setWildTrainer, getWildTrainer] = closure<Trainer>();
export const [setStruggleInfo, getStruggleInfo] = closure<Move>();
