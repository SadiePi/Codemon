import { Codex, Trainer, register } from "../index.ts";
    
export const Network: Trainer = register((C: Codex) => ({} as Trainer));