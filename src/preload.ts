export * from "./core/index.ts";
import CodexBuilder from "./core/codex.ts";
import { Codex } from "./index.ts";

const preload = new CodexBuilder<Codex>();
export default preload;
