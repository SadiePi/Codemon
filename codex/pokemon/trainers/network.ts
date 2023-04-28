import { Trainer } from "../mod.ts";
import loader from "../loader.ts";

export const Network: Trainer = loader.register(P => ({} as Trainer));
