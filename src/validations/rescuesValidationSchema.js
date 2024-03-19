import * as Yup from "yup";
import yupValidationSchema from "./yupValidationSchema";

const rescuesValidationSchema = Yup.object().shape({
  name: yupValidationSchema.fields.displayName,
  type: yupValidationSchema.fields.type,
  gender: yupValidationSchema.fields.gender,
  breed: yupValidationSchema.fields.breed,
  hasFoster: yupValidationSchema.fields.hasFoster,
  hasVet: yupValidationSchema.fields.hasVet,
  isSterilized: yupValidationSchema.fields.isSterilized,
  isVaccinated: yupValidationSchema.fields.isVaccinated,
  isAdoptable: yupValidationSchema.fields.isAdoptable,
  bio: yupValidationSchema.fields.bio,
  image: yupValidationSchema.fields.image,
});

export default rescuesValidationSchema;
