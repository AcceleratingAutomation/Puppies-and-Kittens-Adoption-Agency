import React from "react";
import { Formik } from "formik";
import { Grid, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import AddOrEditForm from "../AddOrEditForm";
import { addUserFormFields } from "../../utils/formFields";
import { registrationValidationSchema } from "../../validations/usersValidationSchema";
import {
  adminAddEndpoint,
  adopterAddEndpoint,
  fosterAddEndpoint,
  registrationEndpoint,
  veterinarianAddEndpoint,
} from "../../server/apiService/apiConfig";
import { registrationInitialValues } from "../../utils/formInitialValues";
import { AppHeader } from "../header/AppHeader";

function RegistrationForm({ errors, touched }) {
  return (
    <AddOrEditForm
      errors={errors}
      touched={touched}
      formFields={addUserFormFields}
      endpoint={registrationEndpoint}
    />
  );
}

RegistrationForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
};

export default function Registration() {
  const history = useHistory();

  const handleSubmit = (values) => {
    // Add your registration logic here

    switch (values.Type) {
      case "Admin":
        history.push(adminAddEndpoint);
        break;
      case "Adopter":
        history.push(adopterAddEndpoint);
        break;
      case "Foster":
        history.push(fosterAddEndpoint);
        break;
      case "Veterinarian":
        history.push(veterinarianAddEndpoint);
        break;
      default:
        throw new Error(`Unknown type: ${values.Type}`);
    }
  };

  return (
    <Formik
      initialValues={registrationInitialValues}
      validationSchema={registrationValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <div className="content">
          <AppHeader />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Grid item style={{ marginBottom: "2vh" }}>
              <Typography variant="h3">New User Registration</Typography>
            </Grid>
            <RegistrationForm errors={errors} touched={touched} />
          </Grid>
        </div>
      )}
    </Formik>
  );
}
