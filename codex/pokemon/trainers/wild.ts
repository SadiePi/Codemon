import { Trainer } from "../index.ts";
import loader from "../loader.ts";

export const Wild: Trainer = loader.register<Trainer>(P => ({
  strategy: P.Strategies.Wild,
}));
