import { Codex, Move } from "../index.ts";
import loader from "../loader.ts";
    
export const TidyUp: Move = loader.register((C: Codex) => ({} as Move));