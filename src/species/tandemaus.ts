import { Codex, Species } from "../index.ts";
import loader from "../loader.ts";
    
export const Tandemaus: Species = loader.register((C: Codex) => ({} as Species));