import { Trainer } from "../index.ts";
import { loader } from "../loader.ts"

export const Console: Trainer = loader.register(P => ({} as Trainer));
