import React from "react";
import PropTypes from "prop-types";
import AddOrEditForm from "../AddOrEditForm";
import { rescueFormFields } from "../../utils/formFields";

function EditRescueForm({ errors, touched, id, endpoint }) {
  return (
    <AddOrEditForm
      errors={errors}
      touched={touched}
      id={id}
      formFields={rescueFormFields}
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
