import * as Yup from "yup";
import yupValidationSchema from "./yupValidationSchema";

const veterinariansValidationSchema = Yup.object().shape({
  firstName: yupValidationSchema.fields.firstName,
  lastName: yupValidationSchema.fields.lastName,
  name: yupValidationSchema.fields.displayName,
  numCurrentRescues: yupValidationSchema.fields.numCurrentRescues,
  numTotalRescues: yupValidationSchema.fields.numTotalRescues,
  isAccepting: yupValidationSchema.fields.isAccepting,
  numHouseholdPets: yupValidationSchema.fields.numHouseholdPets,
  hasBackgroundCheck: yupValidationSchema.fields.hasBackgroundCheck,
  bio: yupValidationSchema.fields.bio,
});

export default veterinariansValidationSchema;
