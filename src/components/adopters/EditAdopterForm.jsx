import React from "react";
import PropTypes from "prop-types";
import {
  displayNameLabel,
  firstNameLabel,
  hasApplicationLabel,
  hasBackgroundCheckLabel,
  isAdoptingLabel,
  lastNameLabel,
  numHouseholdPeopleLabel,
  numHouseholdPetsLabel,
} from "../../accessibility/accessibilityText";
import AddOrEditForm from "../AddOrEditForm";

function EditAdopterForm({ errors, touched, id, endpoint }) {
  const formFields = [
    { id: "firstName", name: "firstName", type: "text", label: firstNameLabel },
    { id: "lastName", name: "lastName", type: "text", label: lastNameLabel },
    { id: "name", name: "name", type: "text", label: displayNameLabel },
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
  ];

  return (
    <AddOrEditForm
      errors={errors}
      touched={touched}
      id={id}
      formFields={formFields}
      endpoint={endpoint}
    />
  );
}

EditAdopterForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default EditAdopterForm;
