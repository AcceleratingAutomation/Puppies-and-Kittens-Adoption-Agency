import React from "react";
import PropTypes from "prop-types";
import AddOrEditForm from "../AddOrEditForm";
import { adminFormFields } from "../../utils/formFields";

function CreateAdminForm({ errors, touched, endpoint }) {
  return (
    <AddOrEditForm
      errors={errors}
      touched={touched}
      formFields={adminFormFields}
      endpoint={endpoint}
    />
  );
}

CreateAdminForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default CreateAdminForm;
