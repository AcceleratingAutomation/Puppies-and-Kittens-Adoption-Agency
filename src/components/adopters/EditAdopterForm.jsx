import React from "react";
import PropTypes from "prop-types";
import AddOrEditForm from "../AddOrEditForm";
import { adopterFormFields } from "../../utils/formFields";

function EditAdopterForm({ errors, touched, id, endpoint }) {
  return (
    <AddOrEditForm
      errors={errors}
      touched={touched}
      id={id}
      formFields={adopterFormFields}
      endpoint={endpoint}
    />
  );
}

EditAdopterForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default EditAdopterForm;
