import { Codex, Move } from "../index.ts";
import loader from "../loader.ts";
    
export const JetPunch: Move = loader.register((C: Codex) => ({} as Move));