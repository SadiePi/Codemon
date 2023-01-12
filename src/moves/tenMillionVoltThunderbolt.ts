import { Codex, Move } from "../index.ts";
import loader from "../loader.ts";
    
export const TenMillionVoltThunderbolt: Move = loader.register((C: Codex) => ({} as Move));