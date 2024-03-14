import * as Yup from "yup";
import yupValidationSchema from "./yupValidationSchema";

const loginValidationSchema = Yup.object().shape({
  username: yupValidationSchema.fields.username,
  password: yupValidationSchema.fields.password,
  login: yupValidationSchema.fields.login,
});

export default loginValidationSchema;
