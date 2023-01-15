import { Move } from "../index.ts";
import { loader } from "../loader.ts"

export const Yawn: Move = loader.register(P => ({} as Move));
