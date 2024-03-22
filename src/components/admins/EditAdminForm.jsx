import React from "react";
import PropTypes from "prop-types";
import AddOrEditForm from "../AddOrEditForm";
import { adminFormFields } from "../../utils/formFields";

function EditAdminForm({ errors, touched, id, endpoint }) {
  return (
    <AddOrEditForm
      errors={errors}
      touched={touched}
      id={id}
      formFields={adminFormFields}
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
