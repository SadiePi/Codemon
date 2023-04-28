import { Gender } from "../mod.ts";
import loader from "../loader.ts";

export const NonBinary: Gender = {
  name: "Non-binary",
  displayName: "person",
  shortCode: "NB",
  pronouns: {
    subject: "they",
    pluralSubject: true,
    object: "them",
    possessive: "their",
  },
  color: "#A67C00",
};