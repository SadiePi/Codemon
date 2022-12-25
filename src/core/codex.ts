import { Move, Type, Species } from "../index.ts";
import { CircularRefBuilder } from "./util.ts";

// these types are unavoidably circular. the builder pattern allows me to
// define them in a way that doesn't cause a circular dependency error.
export const species = new CircularRefBuilder<Species>();
export const types = new CircularRefBuilder<Type>();
export const moves = new CircularRefBuilder<Move>();
