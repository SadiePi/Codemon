import { BattleBuilderParams, Combatant } from "./mod.ts";

export class Team<P extends BattleBuilderParams<P>> {
  constructor(public readonly members: Combatant<P>[]) {}

  public removeMember(member: Combatant<P> | number) {
    if (typeof member === "number") {
      return !!this.members.splice(member, 1);
    }
  }
}
