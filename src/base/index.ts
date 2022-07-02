export * from "../core/index.ts";

export * from "./battle.ts";
import Species from "./species.ts";
import Moves from "./moves.ts";
import Types from "./types.ts";
import Nature from "./nature.ts";
import Experience from "./experience.ts";

// Default export acts as a Codex, this library's equivalent of the Pokedex.
// Except with waaaaay more data than the Pokedex ever revealed.
export default {
  Species,
  Moves,
  Types,
  Nature,
  //Abilities,
  //Graphics,
  //BodyStyles,
  //Footprints,
  //CodexColors,
  Experience,
  //Items,
};
