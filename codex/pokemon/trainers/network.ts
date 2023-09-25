import { TraditionalBBP, Trainer } from "../mod.ts";
import loader from "../loader.ts";

export const Network: Trainer<TraditionalBBP> = loader.register(P => ({} as Trainer<TraditionalBBP>));
