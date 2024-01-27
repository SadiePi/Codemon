import P from "../../../codex/pokemon/mod.ts";
import { Team, TraditionalBBP as T, spawn, Codemon } from "../../../src/mod.ts";

Deno.test("Team", () => {
  const members: Codemon[] = [
    spawn({ species: P.Species.Bulbasaur }),
    spawn({ species: P.Species.Ivysaur }),
    spawn({ species: P.Species.Venusaur }),
    spawn({ species: P.Species.Garchomp }),
  ];

  members.forEach(m => console.log(m.name, m.stats.level));

  const team = new Team<T>(members);
  team.removeMember(2);
});
