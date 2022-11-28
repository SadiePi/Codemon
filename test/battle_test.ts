import { TraditionalBattle } from "../src/base/index.ts";
import { iBigBoi, iBulby, iChompy, iGlassCannon } from "./common.ts";

Deno.test({
  name: "Traditional Battle",
  fn: async () => {
    const battle = new TraditionalBattle(iChompy, iBigBoi, iBulby, iGlassCannon);
    battle.consoleInterface();

    const { winner } = await battle.runBattle();
    console.log();
    console.log(winner ? `${winner.name} won!` : "It's a draw!");
  },
});
