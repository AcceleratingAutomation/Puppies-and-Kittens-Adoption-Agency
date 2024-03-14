import * as Yup from "yup";
import yupValidationSchema from "./yupValidationSchema";

const fostersValidationSchema = Yup.object().shape({
  firstName: yupValidationSchema.fields.firstName,
  lastName: yupValidationSchema.fields.lastName,
  name: yupValidationSchema.fields.displayName,
  numbCurrentRescues: yupValidationSchema.fields.numCurrentRescues,
  numTotalRescues: yupValidationSchema.fields.numTotalRescues,
  isAccepting: yupValidationSchema.fields.isAccepting,
  numHouseholdPeople: yupValidationSchema.fields.numHouseholdPeople,
  numHouseholdPets: yupValidationSchema.fields.numHouseholdPets,
  hasBackgroundCheck: yupValidationSchema.fields.hasBackgroundCheck,
  bio: yupValidationSchema.fields.bio,
});

export default fostersValidationSchema;
