import { Codex, Move } from "../index.ts";
import loader from "../loader.ts";
    
export const TrickOrTreat: Move = loader.register((C: Codex) => ({} as Move));