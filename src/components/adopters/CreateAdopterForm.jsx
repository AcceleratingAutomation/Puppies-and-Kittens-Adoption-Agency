import React from "react";
import PropTypes from "prop-types";
import {
  displayNameLabel,
  emailLabel,
  firstNameLabel,
  hasApplicationLabel,
  hasBackgroundCheckLabel,
  imageLabel,
  isAdoptingLabel,
  lastNameLabel,
  numHouseholdPeopleLabel,
  numHouseholdPetsLabel,
  passwordLabel,
  roleLabel,
  usernameLabel,
  userTypeLabel,
} from "../../accessibility/accessibilityText";
import AddOrEditForm from "../AddOrEditForm";

function CreateAdopterForm({ errors, touched, endpoint }) {
  const formFields = [
    { id: "email", name: "email", type: "text", label: emailLabel },
    { id: "password", name: "password", type: "text", label: passwordLabel },
    { id: "username", name: "username", type: "text", label: usernameLabel },
    { id: "firstName", name: "firstName", type: "text", label: firstNameLabel },
    { id: "lastName", name: "lastName", type: "text", label: lastNameLabel },
    { id: "name", name: "name", type: "text", label: displayNameLabel },
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
    {
      id: "isAdopting",
      name: "isAdopting",
      type: "checkbox",
      label: isAdoptingLabel,
    },
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
      id: "hasApplication",
      name: "hasApplication",
      type: "checkbox",
      label: hasApplicationLabel,
    },
    {
      id: "image",
      name: "image",
      type: "number",
      label: imageLabel,
    },
  ];

  return (
    <AddOrEditForm
      errors={errors}
      touched={touched}
      formFields={formFields}
      endpoint={endpoint}
    />
  );
}

CreateAdopterForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default CreateAdopterForm;
