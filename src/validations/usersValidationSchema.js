import * as Yup from "yup";
import yupValidationSchema from "./yupValidationSchema";

const registrationValidationSchema = Yup.object().shape({
  confirmPassword: yupValidationSchema.fields.confirmPassword,
  email: yupValidationSchema.fields.email,
  password: yupValidationSchema.fields.password,
  role: yupValidationSchema.fields.role,
  type: yupValidationSchema.fields.userType,
  username: yupValidationSchema.fields.username,
});

const commonUsersValidationSchema = Yup.object().shape({
  firstName: yupValidationSchema.fields.firstName,
  lastName: yupValidationSchema.fields.lastName,
  name: yupValidationSchema.fields.displayName,
  numHouseholdPeople: yupValidationSchema.fields.numHouseholdPeople,
  numHouseholdPets: yupValidationSchema.fields.numHouseholdPets,
  hasBackgroundCheck: yupValidationSchema.fields.hasBackgroundCheck,
  image: yupValidationSchema.fields.image,
  bio: yupValidationSchema.fields.bio,
});

const numRescuesValidationSchema = Yup.object().shape({
  numCurrentRescues: yupValidationSchema.fields.numCurrentRescues,
  numTotalRescues: yupValidationSchema.fields.numTotalRescues,
});

const isAcceptingRescuesValidationSchema = Yup.object().shape({
  isAccepting: yupValidationSchema.fields.isAccepting,
});

const adoptersOnlyValidationSchema = Yup.object().shape({
  isAdopting: yupValidationSchema.fields.isAdopting,
  hasApplication: yupValidationSchema.fields.hasApplication,
});

const adminsValidationSchema = Yup.object().shape({
  ...commonUsersValidationSchema.fields,
  ...numRescuesValidationSchema.fields,
});

const adoptersValidationSchema = Yup.object().shape({
  ...commonUsersValidationSchema.fields,
  ...adoptersOnlyValidationSchema.fields,
});

const fostersValidationSchema = Yup.object().shape({
  ...commonUsersValidationSchema.fields,
  ...numRescuesValidationSchema.fields,
  ...isAcceptingRescuesValidationSchema.fields,
});

const veterinariansValidationSchema = Yup.object().shape({
  ...commonUsersValidationSchema.fields,
  ...numRescuesValidationSchema.fields,
  ...isAcceptingRescuesValidationSchema.fields,
});

export {
  adminsValidationSchema,
  adoptersValidationSchema,
  fostersValidationSchema,
  registrationValidationSchema,
  veterinariansValidationSchema,
};
