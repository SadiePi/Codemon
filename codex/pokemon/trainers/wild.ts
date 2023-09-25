import { TraditionalBBP, Trainer } from "../mod.ts";
import loader from "../loader.ts";

export const Wild: Trainer<TraditionalBBP> = loader.register<Trainer<TraditionalBBP>>(P => ({
  traditionalStrategy: P.Strategies.Wild,
}));
