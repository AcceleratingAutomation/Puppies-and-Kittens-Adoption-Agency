import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import {
  veterinariansUrl,
  veterinariansEndpoint,
} from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import { createDetails, getTabValue } from "../../utils/componentUtils";
import { veterinariansText } from "../../accessibility/accessibilityText";
import { veterinariansValidationSchema } from "../../validations/usersValidationSchema";
import CreateVeterinarianForm from "./CreateVeterinarianForm";
import { veterinarianInitialValues } from "../../utils/formInitialValues";

export default function CreateVeterinarianDetails() {
  const history = useHistory();
  const tabValue = getTabValue(tabs, veterinariansText);

  const handleSubmit = useCallback(
    (values) => {
      createDetails(
        `${veterinariansUrl}/add`,
        values,
        history,
        veterinariansEndpoint,
      );
    },
    [veterinariansUrl, history, veterinariansEndpoint],
  );

  return (
    <Formik
      initialValues={veterinarianInitialValues}
      validationSchema={veterinariansValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <div className="content">
          <AppHeader tabValue={tabValue} />
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item style={{ marginBottom: "2vh" }}>
              <Typography variant="h3">Add New Veterinarian</Typography>
            </Grid>
            <CreateVeterinarianForm
              errors={errors}
              touched={touched}
              endpoint={veterinariansEndpoint}
            />
          </Grid>
        </div>
      )}
    </Formik>
  );
}
