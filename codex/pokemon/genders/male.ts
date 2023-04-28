import { Gender } from "../mod.ts";
import loader from "../loader.ts";

export const Male: Gender = {
  name: "Male",
  displayName: "man",
  shortCode: "m",
  pronouns: {
    subject: "he",
    object: "him",
    possessive: "his",
  },
};
