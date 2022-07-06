import C, { Codemon } from "../src/base/index.ts";
import { chompy } from "./common.ts";

Deno.test("chompy", () => {
  console.log();
  console.log(chompy.toString());
});

Deno.test("generic", () => {
  console.log();
  console.log(
    new Codemon({
      species: C.Species.Bulbasaur,
      level: 100,
    }).toString()
  );
});
