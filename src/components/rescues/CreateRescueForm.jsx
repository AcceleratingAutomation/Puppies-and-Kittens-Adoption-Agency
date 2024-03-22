import React from "react";
import PropTypes from "prop-types";
import AddOrEditForm from "../AddOrEditForm";
import { rescueFormFields } from "../../utils/formFields";

function CreateRescueForm({ errors, touched, endpoint }) {
  return (
    <AddOrEditForm
      errors={errors}
      touched={touched}
      formFields={rescueFormFields}
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
