import { Pokedex } from "./index.ts";
import { CodexBuilder } from "../../src/codex.ts"
export const loader: CodexBuilder<Pokedex> = new CodexBuilder<Pokedex>();
export default loader;