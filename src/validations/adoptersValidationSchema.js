import * as Yup from "yup";
import yupValidationSchema from "./yupValidationSchema";

const adoptersValidationSchema = Yup.object().shape({
  email: yupValidationSchema.fields.email,
  password: yupValidationSchema.fields.password,
  username: yupValidationSchema.fields.username,
  firstName: yupValidationSchema.fields.firstName,
  lastName: yupValidationSchema.fields.lastName,
  name: yupValidationSchema.fields.displayName,
  type: yupValidationSchema.fields.userType,
  role: yupValidationSchema.fields.role,
  isAdopting: yupValidationSchema.fields.isAdopting,
  numHouseholdPeople: yupValidationSchema.fields.numHouseholdPeople,
  numHouseholdPets: yupValidationSchema.fields.numHouseholdPets,
  hasBackgroundCheck: yupValidationSchema.fields.hasBackgroundCheck,
  hasApplication: yupValidationSchema.fields.hasApplication,
  bio: yupValidationSchema.fields.bio,
  image: yupValidationSchema.fields.image,
});

const adoptersEditValidationSchema = Yup.object().shape({
  firstName: yupValidationSchema.fields.firstName,
  lastName: yupValidationSchema.fields.lastName,
  name: yupValidationSchema.fields.displayName,
  isAdopting: yupValidationSchema.fields.isAdopting,
  numHouseholdPeople: yupValidationSchema.fields.numHouseholdPeople,
  numHouseholdPets: yupValidationSchema.fields.numHouseholdPets,
  hasBackgroundCheck: yupValidationSchema.fields.hasBackgroundCheck,
  hasApplication: yupValidationSchema.fields.hasApplication,
  bio: yupValidationSchema.fields.bio,
});

export { adoptersValidationSchema, adoptersEditValidationSchema };
