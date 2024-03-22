import React from "react";
import PropTypes from "prop-types";
import AddOrEditForm from "../AddOrEditForm";
import { fosterFormFields } from "../../utils/formFields";

function CreateFosterForm({ errors, touched, endpoint }) {
  return (
    <AddOrEditForm
      errors={errors}
      touched={touched}
      formFields={fosterFormFields}
      endpoint={endpoint}
    />
  );
}

CreateFosterForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default CreateFosterForm;
