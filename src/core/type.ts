export interface Type {
  name: string;
  weaknesses: Type[];
  resistances: Type[];
  immunities: Type[];
}
