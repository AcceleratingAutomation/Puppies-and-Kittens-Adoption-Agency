const {
  breedLabel,
  confirmPasswordLabel,
  displayNameLabel,
  emailLabel,
  firstNameLabel,
  genderLabel,
  hasApplicationLabel,
  hasBackgroundCheckLabel,
  hasFosterLabel,
  hasVetLabel,
  imageLabel,
  isAcceptingLabel,
  isAdoptableLabel,
  isAdoptingLabel,
  isSterilizedLabel,
  isVaccinatedLabel,
  lastNameLabel,
  nameLabel,
  numCurrentRescuesLabel,
  numHouseholdPeopleLabel,
  numHouseholdPetsLabel,
  numTotalRescuesLabel,
  passwordLabel,
  roleLabel,
  typeLabel,
  userTypeLabel,
  usernameLabel,
} = require("../accessibility/accessibilityText");

// Rescue form fields
const rescueFormFields = [
  { id: "name", name: "name", type: "text", label: nameLabel },
  {
    id: "type",
    name: "type",
    type: "select",
    label: typeLabel,
    options: ["Cat", "Dog"],
  },
  {
    id: "gender",
    name: "gender",
    type: "select",
    label: genderLabel,
    options: ["Male", "Female"],
  },
  { id: "breed", name: "breed", type: "text", label: breedLabel },
  {
    id: "isSterilized",
    name: "isSterilized",
    type: "checkbox",
    label: isSterilizedLabel,
  },
  {
    id: "isVaccinated",
    name: "isVaccinated",
    type: "checkbox",
    label: isVaccinatedLabel,
  },
  {
    id: "isAdoptable",
    name: "isAdoptable",
    type: "checkbox",
    label: isAdoptableLabel,
  },
  {
    id: "hasFoster",
    name: "hasFoster",
    type: "checkbox",
    label: hasFosterLabel,
  },
  {
    id: "hasVet",
    name: "hasVet",
    type: "checkbox",
    label: hasVetLabel,
  },
  {
    id: "image",
    name: "image",
    type: "number",
    label: imageLabel,
  },
];

// Add user form fields
const addUserFormFields = [
  { id: "email", name: "email", type: "text", label: emailLabel },
  { id: "password", name: "password", type: "text", label: passwordLabel },
  {
    id: "confirmPassword",
    name: "confirmPassword",
    type: "text",
    label: confirmPasswordLabel,
  },
  { id: "username", name: "username", type: "text", label: usernameLabel },
  {
    id: "type",
    name: "type",
    type: "select",
    label: userTypeLabel,
    options: ["Adopter", "Foster", "Veterinarian", "Admin"],
  },
  {
    id: "role",
    name: "role",
    type: "select",
    label: roleLabel,
    options: ["adopter", "foster", "veterinarian", "admin"],
  },
];

// Common user form fields
const commonUserFormFields = [
  { id: "firstName", name: "firstName", type: "text", label: firstNameLabel },
  { id: "lastName", name: "lastName", type: "text", label: lastNameLabel },
  { id: "name", name: "name", type: "text", label: displayNameLabel },
  {
    id: "numHouseholdPeople",
    name: "numHouseholdPeople",
    type: "number",
    label: numHouseholdPeopleLabel,
  },
  {
    id: "numHouseholdPets",
    name: "numHouseholdPets",
    type: "number",
    label: numHouseholdPetsLabel,
  },
  {
    id: "hasBackgroundCheck",
    name: "hasBackgroundCheck",
    type: "checkbox",
    label: hasBackgroundCheckLabel,
  },
  {
    id: "image",
    name: "image",
    type: "number",
    label: imageLabel,
  },
];

// Unique user fields for numRescues
const numRescuesFormFields = [
  {
    id: "numCurrentRescues",
    name: "numCurrentRescues",
    type: "number",
    label: numCurrentRescuesLabel,
  },
  {
    id: "numTotalRescues",
    name: "numTotalRescues",
    type: "number",
    label: numTotalRescuesLabel,
  },
];

// Unique fields for Adopter Only
const adopterOnlyFormFields = [
  {
    id: "isAdopting",
    name: "isAdopting",
    type: "checkbox",
    label: isAdoptingLabel,
  },
  {
    id: "hasApplication",
    name: "hasApplication",
    type: "checkbox",
    label: hasApplicationLabel,
  },
];

// Unique user field for isAccepting
const isAcceptingFormFields = [
  {
    id: "isAccepting",
    name: "isAccepting",
    type: "checkbox",
    label: isAcceptingLabel,
  },
];

// Combine common fields with unique fields for each form
const adminFormFields = [...commonUserFormFields, ...numRescuesFormFields];
const adopterFormFields = [...commonUserFormFields, ...adopterOnlyFormFields];
const fosterFormFields = [
  ...commonUserFormFields,
  ...numRescuesFormFields,
  ...isAcceptingFormFields,
];
const veterinarianFormFields = [
  ...commonUserFormFields,
  ...numRescuesFormFields,
  ...isAcceptingFormFields,
];

export {
  addUserFormFields,
  adminFormFields,
  adopterFormFields,
  fosterFormFields,
  rescueFormFields,
  veterinarianFormFields,
};
