import React from "react";
import PropTypes from "prop-types";
import AddOrEditForm from "../AddOrEditForm";
import { veterinarianFormFields } from "../../utils/formFields";

function EditVeterinarianForm({ errors, touched, id, endpoint }) {
  return (
    <AddOrEditForm
      errors={errors}
      touched={touched}
      id={id}
      formFields={veterinarianFormFields}
      endpoint={endpoint}
    />
  );
}

EditVeterinarianForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default EditVeterinarianForm;
