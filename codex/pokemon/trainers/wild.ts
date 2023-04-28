import { Trainer } from "../mod.ts";
import loader from "../loader.ts";

export const Wild: Trainer = loader.register<Trainer>(P => ({
  strategy: P.Strategies.Wild,
}));
