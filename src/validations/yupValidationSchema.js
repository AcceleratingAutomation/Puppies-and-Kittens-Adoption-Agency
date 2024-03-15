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
import {
  breedRequired,
  genderOptions,
  genderRequired,
  hasFosterRequired,
  hasVetRequired,
  isAdoptableRequired,
  isSterilizedRequired,
  isVaccinatedRequired,
  nameRequired,
  typeOptions,
  typeRequired,
} from "../accessibility/rescues/rescuesText";

const yupValidationSchema = Yup.object({
  bio: Yup.string().required(bioRequired),
  breed: Yup.string().required(breedRequired),
  displayName: Yup.string().required(displayNameRequired),
  firstName: Yup.string().required(firstNameRequired),
  gender: Yup.string()
    .required(genderRequired)
    .oneOf(["Male", "Female"], genderOptions),
  hasApplication: Yup.boolean().required(hasApplicationRequired),
  hasBackgroundCheck: Yup.boolean().required(hasBackgroundCheckRequired),
  hasFoster: Yup.boolean().required(hasFosterRequired),
  hasVet: Yup.boolean().required(hasVetRequired),
  isAccepting: Yup.boolean().required(isAcceptingRequired),
  isAdoptable: Yup.boolean().required(isAdoptableRequired),
  isAdopting: Yup.boolean().required(isAdoptingRequired),
  isSterilized: Yup.boolean().required(isSterilizedRequired),
  isVaccinated: Yup.boolean().required(isVaccinatedRequired),
  lastName: Yup.string().required(lastNameRequired),
  login: Yup.string(),
  name: Yup.string().required(nameRequired),
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
  type: Yup.string().required(typeRequired).oneOf(["Cat", "Dog"], typeOptions),
  username: Yup.string().required(usernameRequired),
});

export default yupValidationSchema;
