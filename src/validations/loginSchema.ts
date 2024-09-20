import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().min(2).required(),
  password: yup.string().min(6).required(),
});
