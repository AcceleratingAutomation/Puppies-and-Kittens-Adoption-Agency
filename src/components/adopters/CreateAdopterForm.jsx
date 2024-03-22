import React from "react";
import PropTypes from "prop-types";
import AddOrEditForm from "../AddOrEditForm";
import { adopterFormFields } from "../../utils/formFields";

function CreateAdopterForm({ errors, touched, endpoint }) {
  return (
    <AddOrEditForm
      errors={errors}
      touched={touched}
      formFields={adopterFormFields}
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
