import React from "react";
import PropTypes from "prop-types";
import {
  displayNameLabel,
  firstNameLabel,
  hasBackgroundCheckLabel,
  lastNameLabel,
  numCurrentRescuesLabel,
  numHouseholdPetsLabel,
  numTotalRescuesLabel,
} from "../../accessibility/users/usersText";
import AddOrEditForm from "../AddOrEditForm";

function EditAdminForm({ errors, touched, id, endpoint }) {
  const formFields = [
    { id: "firstName", name: "firstName", type: "text", label: firstNameLabel },
    { id: "lastName", name: "lastName", type: "text", label: lastNameLabel },
    { id: "name", name: "name", type: "text", label: displayNameLabel },
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

EditAdminForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default EditAdminForm;
