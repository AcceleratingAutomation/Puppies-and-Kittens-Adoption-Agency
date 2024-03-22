import React from "react";
import PropTypes from "prop-types";
import {
  nameLabel,
  typeLabel,
  genderLabel,
  breedLabel,
  hasFosterLabel,
  hasVetLabel,
  isSterilizedLabel,
  isVaccinatedLabel,
  isAdoptableLabel,
} from "../../accessibility/accessibilityText";
import AddOrEditForm from "../AddOrEditForm";

function EditRescueForm({ errors, touched, id, endpoint }) {
  const formFields = [
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

EditRescueForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default EditRescueForm;
