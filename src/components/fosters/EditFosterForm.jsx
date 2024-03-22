import React from "react";
import PropTypes from "prop-types";
import {
  displayNameLabel,
  firstNameLabel,
  hasBackgroundCheckLabel,
  isAcceptingLabel,
  lastNameLabel,
  numCurrentRescuesLabel,
  numHouseholdPeopleLabel,
  numHouseholdPetsLabel,
  numTotalRescuesLabel,
} from "../../accessibility/accessibilityText";
import AddOrEditForm from "../AddOrEditForm";

function EditFosterForm({ errors, touched, id, endpoint }) {
  const formFields = [
    { id: "firstName", name: "firstName", type: "text", label: firstNameLabel },
    { id: "lastName", name: "lastName", type: "text", label: lastNameLabel },
    { id: "name", name: "name", type: "text", label: displayNameLabel },
    {
      id: "isAccepting",
      name: "isAccepting",
      type: "checkbox",
      label: isAcceptingLabel,
    },
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

EditFosterForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default EditFosterForm;
