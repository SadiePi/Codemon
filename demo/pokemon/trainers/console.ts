import { Codex, Trainer, register } from "../index.ts";
    
export const Console: Trainer = register((C: Codex) => ({} as Trainer));