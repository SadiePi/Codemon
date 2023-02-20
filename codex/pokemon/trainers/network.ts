import { Trainer } from "../index.ts";
import loader from "../loader.ts"

export const Network: Trainer = loader.register(P => ({} as Trainer));
