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
  isAdoptingRequired,
  lastNameRequired,
  numHouseholdPeopleRequired,
  numHouseholdPetsRequired,
} from "../accessibility/users/usersText";

const yupValidationSchema = Yup.object({
  bio: Yup.string().required(bioRequired),
  displayName: Yup.string().required(displayNameRequired),
  firstName: Yup.string().required(firstNameRequired),
  hasApplication: Yup.boolean().required(hasApplicationRequired),
  hasBackgroundCheck: Yup.boolean().required(hasBackgroundCheckRequired),
  isAdopting: Yup.boolean().required(isAdoptingRequired),
  lastName: Yup.string().required(lastNameRequired),
  login: Yup.string(),
  numHouseholdPeople: Yup.number().required(numHouseholdPeopleRequired),
  numHouseholdPets: Yup.number().required(numHouseholdPetsRequired),
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
