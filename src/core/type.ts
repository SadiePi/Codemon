export interface Type {
  name: string;
  weaknesses: Type[];
  resistances: Type[];
  immunities: Type[];
}

export const INIT: Type = {
  name: "!!! INIT !!!",
  weaknesses: [],
  resistances: [],
  immunities: [],
};
