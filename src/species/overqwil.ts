import { Codex, Species } from "../index.ts";
import loader from "../loader.ts";
    
export const Overqwil: Species = loader.register((C: Codex) => ({} as Species));