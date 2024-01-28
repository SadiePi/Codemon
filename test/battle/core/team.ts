import { assertEquals, iKibble, iBulby } from "../../_common.ts";
import P from "../../../codex/pokemon/mod.ts";
import { Team, TraditionalBBP as T, spawn } from "../../../src/mod.ts";

Deno.test("Team - Basic Methods", () => {
  const b = spawn({ species: P.Species.Bulbasaur });
  const i = spawn({ species: P.Species.Ivysaur });
  const v = spawn({ species: P.Species.Venusaur });
  const g = spawn({ species: P.Species.Garchomp });
  const bulby = spawn(iBulby);
  const kibble = spawn(iKibble);

  const team = new Team<T>({ members: [b, i, v, g], maxSize: 4 });

  assertEquals(team.canAddMember(), false);

  assertEquals(team.removeMember(2), true);
  assertEquals(team.hasMember(v), false);
  assertEquals(team.canAddMember(), true);
  team.getMembers().forEach(m => console.log(m.name, m.stats.level));

  assertEquals(team.removeMember(4), false);
  assertEquals(team.getMembers().length, 3);

  assertEquals(team.removeMember(0), true);
  assertEquals(team.hasMember(b), false);
  assertEquals(team.getMembers().length, 2);

  assertEquals(team.removeMember(g), true);
  assertEquals(team.hasMember(g), false);

  assertEquals(team.removeMember(g), false);

  assertEquals(team.canAddMember(), true);
  assertEquals(team.addMember(bulby), true);
  assertEquals(team.addMember(bulby), false);

  assertEquals(team.addMember(kibble), true);
  assertEquals(team.getMembers().length, 3);

  assertEquals(team.addMember(b), true);
  assertEquals(team.addMember(g), false);
  assertEquals(team.getMembers().length, 4);
});
