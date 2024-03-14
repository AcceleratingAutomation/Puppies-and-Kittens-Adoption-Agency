import * as Yup from "yup";

const adoptersValidationSchema = Yup.object({
  firstName: Yup.string().required("First Name Required"),
  lastName: Yup.string().required("Last Name Required"),
  name: Yup.string().required("Display Name Required"),
  isAdopting: Yup.boolean().required("Looking to Adopt Required"),
  numHouseholdPeople: Yup.number().required("Number of People Required"),
  numHouseholdPets: Yup.number().required("Number of Pets Required"),
  hasBackgroundCheck: Yup.boolean().required("Background Check Required"),
  hasApplication: Yup.boolean().required("Application Required"),
  bio: Yup.string().required("Bio Required"),
});

export default adoptersValidationSchema;
