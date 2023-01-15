import { Codex, Move, register } from "../index.ts";
    
export const VCreate: Move = register((C: Codex) => ({} as Move));