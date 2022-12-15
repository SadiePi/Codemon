export interface Gender {
  //symbol: Image;
  name: string;
  pronouns: {
    subject: string;
    object: string;
    possessive: string;
  };
}
export const Male = {
  name: "Male",
  pronouns: {
    subject: "he",
    object: "him",
    possessive: "his",
  },
};
export const Female = {
  name: "Female",
  pronouns: {
    subject: "she",
    object: "her",
    possessive: "her",
  },
};
export const NonBinary = {
  name: "Non-binary", // Codemon says trans rights
  pronouns: {
    subject: "they",
    object: "them",
    possessive: "their",
  },
};

export const None = {
  name: "",
  pronouns: {
    subject: "it",
    object: "it",
    possessive: "its",
  },
};
