import { TraditionalBattle } from "../src/base/index.ts";
import { iBigBoi, iBulby, iKibble, iGlassCannon } from "./common.ts";
import C from "../src/base/index.ts";

Deno.test({
  name: "Traditional Battle",
  fn: async () => {
    const battle = new TraditionalBattle(iKibble, iBigBoi);
    battle.consoleInterface();

    const { winner } = await battle.runBattle();
    console.log();
    console.log(winner ? `${winner.name} won!` : "It's a draw!");
  },
});
