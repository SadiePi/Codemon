import C, { spawn } from "../src/index.ts";
import { iKibble } from "./common.ts";

Deno.test("chompy", () => {
  console.log();
  console.log(spawn(iKibble).toString());
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
