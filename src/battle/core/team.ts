import { BattleBuilderParams, Combatant } from "./mod.ts";

interface TeamParams<P extends BattleBuilderParams<P>> {
  members: Combatant<P>[];
  maxSize?: number | "None";
}

export class Team<P extends BattleBuilderParams<P>> {
  private members: Combatant<P>[];
  private maxSize: number;

  constructor(params: TeamParams<P>) {
    if (typeof params.maxSize === "number") this.maxSize = params.maxSize;
    else this.maxSize = Infinity;

    if (params.members.length > this.maxSize) throw new Error("Too many team members");
    this.members = params.members;
  }

  public removeMember(member: Combatant<P> | number): boolean {
    let index = -1;

    if (typeof member === "number") {
      if (member >= 0 && member < this.members.length) index = member;
    } else index = this.members.indexOf(member);

    if (index === -1) return false;

    this.members.splice(index, 1);
    return true;
  }

  public canAddMember() {
    return this.members.length < this.maxSize;
  }

  public addMember(combatant: Combatant<P>) {
    if (!this.canAddMember()) return false;
    if (this.hasMember(combatant)) return false;
    this.members.push(combatant);
    return true;
  }

  public hasMember(combatant: Combatant<P>) {
    return this.members.includes(combatant);
  }

  public getMembers() {
    return [...this.members];
  }

  public getTeammates(_member: Combatant<P> | number): Combatant<P>[] {
    return [];
  }

  public getAdjacent() {
    return [];
  }

  public getNonAdjacent() {
    return [];
  }
}
