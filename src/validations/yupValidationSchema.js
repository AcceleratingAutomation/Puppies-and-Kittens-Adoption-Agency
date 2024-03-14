import * as Yup from "yup";
import {
  atLeast8Characters,
  atLeastOneLowercaseLetter,
  atLeastOneNumber,
  atLeastOneSpecialCharacter,
  atLeastOneUppercaseLetter,
  passwordRequired,
  usernameRequired,
} from "../accessibility/login/loginText";
import {
  bioRequired,
  displayNameRequired,
  firstNameRequired,
  hasApplicationRequired,
  hasBackgroundCheckRequired,
  isAcceptingRequired,
  isAdoptingRequired,
  lastNameRequired,
  numCurrentRescuesRequired,
  numHouseholdPeopleRequired,
  numHouseholdPetsRequired,
  numTotalRescuesRequired,
} from "../accessibility/users/usersText";

const yupValidationSchema = Yup.object({
  bio: Yup.string().required(bioRequired),
  displayName: Yup.string().required(displayNameRequired),
  firstName: Yup.string().required(firstNameRequired),
  hasApplication: Yup.boolean().required(hasApplicationRequired),
  hasBackgroundCheck: Yup.boolean().required(hasBackgroundCheckRequired),
  isAccepting: Yup.boolean().required(isAcceptingRequired),
  isAdopting: Yup.boolean().required(isAdoptingRequired),
  lastName: Yup.string().required(lastNameRequired),
  login: Yup.string(),
  numCurrentRescues: Yup.number().required(numCurrentRescuesRequired),
  numHouseholdPeople: Yup.number().required(numHouseholdPeopleRequired),
  numHouseholdPets: Yup.number().required(numHouseholdPetsRequired),
  numTotalRescues: Yup.number().required(numTotalRescuesRequired),
  password: Yup.string()
    .required(passwordRequired)
    .min(8, atLeast8Characters)
    .matches(/[a-z]/, atLeastOneLowercaseLetter)
    .matches(/[A-Z]/, atLeastOneUppercaseLetter)
    .matches(/[0-9]/, atLeastOneNumber)
    .matches(/[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`]/, atLeastOneSpecialCharacter),
  username: Yup.string().required(usernameRequired),
});

export default yupValidationSchema;
