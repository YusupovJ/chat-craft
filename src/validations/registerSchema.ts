import { TGenders } from "@/types";
import * as yup from "yup";

const genders: TGenders[] = ["croissant", "girl", "man", "steve"];

export const registerSchema = yup.object({
  username: yup.string().min(2).required(),
  password: yup.string().min(6).required(),
  avatar: yup.number(),
  gender: yup.mixed().oneOf(genders).default("steve"),
});
