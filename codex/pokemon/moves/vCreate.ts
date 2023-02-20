import { Move } from "../index.ts";
import loader from "../loader.ts"

export const VCreate: Move = loader.register(P => ({} as Move));
