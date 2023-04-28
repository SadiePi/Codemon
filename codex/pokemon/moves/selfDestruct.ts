import { Move } from "../mod.ts";
import loader from "../loader.ts";

export const SelfDestruct: Move = loader.register(P => ({} as Move));
