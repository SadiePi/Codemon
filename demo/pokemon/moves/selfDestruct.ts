import { Codex, Move, register } from "../index.ts";
    
export const SelfDestruct: Move = register((C: Codex) => ({} as Move));