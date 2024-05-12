const rescueInitialValues = {
  name: "",
  type: "",
  gender: "",
  breed: "",
  isSterilized: false,
  isVaccinated: false,
  isAdoptable: false,
  hasFoster: false,
  hasVet: false,
  bio: "",
  image: "",
};

const registrationInitialValues = {
  confirmPassword: "",
  email: "",
  password: "",
  role: "",
  type: "",
  username: "",
};

const commonUserInitialValues = {
  firstName: "",
  lastName: "",
  name: "",
  numHouseholdPeople: 0,
  numHouseholdPets: 0,
  hasBackgroundCheck: false,
  bio: "",
  image: "",
};

const numRescuesInitialValues = {
  numCurrentRescues: 0,
  numTotalRescues: 0,
};

const isAcceptingRescuesInitialValues = {
  isAccepting: false,
};

const adoptersOnlyInitialValues = {
  isAdopting: false,
  hasApplication: false,
};

const adminInitialValues = {
  ...commonUserInitialValues,
  ...numRescuesInitialValues,
};
const adopterInitialValues = {
  ...commonUserInitialValues,
  ...adoptersOnlyInitialValues,
};
const fosterInitialValues = {
  ...commonUserInitialValues,
  ...numRescuesInitialValues,
  ...isAcceptingRescuesInitialValues,
};
const veterinarianInitialValues = {
  ...commonUserInitialValues,
  ...numRescuesInitialValues,
  ...isAcceptingRescuesInitialValues,
};

export {
  adminInitialValues,
  adopterInitialValues,
  registrationInitialValues,
  fosterInitialValues,
  rescueInitialValues,
  veterinarianInitialValues,
};
