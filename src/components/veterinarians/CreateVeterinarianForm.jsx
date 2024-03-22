import React from "react";
import PropTypes from "prop-types";
import AddOrEditForm from "../AddOrEditForm";
import { veterinarianFormFields } from "../../utils/formFields";

function CreateVeterinarianForm({ errors, touched, endpoint }) {
  return (
    <AddOrEditForm
      errors={errors}
      touched={touched}
      formFields={veterinarianFormFields}
      endpoint={endpoint}
    />
  );
}

CreateVeterinarianForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default CreateVeterinarianForm;
