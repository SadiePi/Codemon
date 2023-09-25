import { Gender } from "../mod.ts";
import loader from "../loader.ts";

export const NonBinary: Gender = {
  name: "Non-binary",
  pronouns: {
    subject: "they",
    pluralSubject: true,
    object: "them",
    possessive: "their",
  },
};
