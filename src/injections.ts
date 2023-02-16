import { ICodemon } from "./codemon.ts";
import { Decider } from "./decision.ts";
import { Move } from "./move.ts";
import { Nature } from "./stats.ts";
import { Trainer } from "./trainer.ts";
import { closure } from "./util.ts";

export const [setRandomNatureDecider, getRandomNatureDecider] = closure<Decider<Nature, ICodemon>>();
export const [setWildTrainer, getWildTrainer] = closure<Trainer>();
export const [setStruggleInfo, getStruggleInfo] = closure<Move>();