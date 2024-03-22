import React from "react";
import PropTypes from "prop-types";
import {
  nameLabel,
  typeLabel,
  genderLabel,
  breedLabel,
  hasFosterLabel,
  hasVetLabel,
  imageLabel,
  isSterilizedLabel,
  isVaccinatedLabel,
  isAdoptableLabel,
} from "../../accessibility/accessibilityText";
import AddOrEditForm from "../AddOrEditForm";

function CreateRescueForm({ errors, touched, endpoint }) {
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

CreateRescueForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default CreateRescueForm;
