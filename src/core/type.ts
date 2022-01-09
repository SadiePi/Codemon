export interface Type {
  weaknesses: Type[];
  resistances: Type[];
  immunities: Type[];
}

export const INIT: Type = {
  weaknesses: [],
  resistances: [],
  immunities: [],
};
