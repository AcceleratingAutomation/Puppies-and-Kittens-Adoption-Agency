import * as Yup from "yup";
import yupValidationSchema from "./yupValidationSchema";

const adoptersValidationSchema = Yup.object().shape({
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

export default adoptersValidationSchema;
