import { Codex, Locale } from "../index.ts";
import loader from "../loader.ts";
    
export const English: Locale = loader.register((C: Codex) => ({} as Locale));