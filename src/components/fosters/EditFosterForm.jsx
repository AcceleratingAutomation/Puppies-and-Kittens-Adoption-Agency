import React from "react";
import PropTypes from "prop-types";
import AddOrEditForm from "../AddOrEditForm";
import { fosterFormFields } from "../../utils/formFields";

function EditFosterForm({ errors, touched, id, endpoint }) {
  return (
    <AddOrEditForm
      errors={errors}
      touched={touched}
      id={id}
      formFields={fosterFormFields}
      endpoint={endpoint}
    />
  );
}

EditFosterForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default EditFosterForm;
