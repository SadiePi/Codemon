import C, { spawn } from "../src/base/index.ts";
import { iChompy } from "./common.ts";

Deno.test("chompy", () => {
  console.log();
  console.log(spawn(iChompy).toString());
});

Deno.test("generic", () => {
  console.log();
  console.log(
    spawn({
      species: C.Species.Bulbasaur,
      level: 100,
    }).toString()
  );
});
