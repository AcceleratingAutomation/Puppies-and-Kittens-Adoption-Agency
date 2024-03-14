import * as Yup from "yup";
import yupValidationSchema from "./yupValidationSchema";

const adminsValidationSchema = Yup.object().shape({
  firstName: yupValidationSchema.fields.firstName,
  lastName: yupValidationSchema.fields.lastName,
  name: yupValidationSchema.fields.displayName,
  numCurrentRescues: yupValidationSchema.fields.numCurrentRescues,
  numTotalRescues: yupValidationSchema.fields.numTotalRescues,
  numHouseholdPets: yupValidationSchema.fields.numHouseholdPets,
  hasBackgroundCheck: yupValidationSchema.fields.hasBackgroundCheck,
  bio: yupValidationSchema.fields.bio,
});

export default adminsValidationSchema;
