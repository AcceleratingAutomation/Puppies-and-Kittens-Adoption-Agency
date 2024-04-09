import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import {
  adoptersUrl,
  adoptersEndpoint,
} from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import { createDetails, getTabValue } from "../../utils/componentUtils";
import { adoptersText } from "../../accessibility/accessibilityText";
import { adoptersValidationSchema } from "../../validations/usersValidationSchema";
import CreateAdopterForm from "./CreateAdopterForm";
import { adopterInitialValues } from "../../utils/formInitialValues";

export default function CreateAdopterDetails() {
  const history = useHistory();
  const tabValue = getTabValue(tabs, adoptersText);

  const handleSubmit = useCallback(
    (values) => {
      createDetails(`${adoptersUrl}/add`, values, history, adoptersEndpoint);
    },
    [adoptersUrl, history, adoptersEndpoint],
  );

  return (
    <Formik
      initialValues={adopterInitialValues}
      validationSchema={adoptersValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <div className="content">
          <AppHeader tabValue={tabValue} />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Grid item style={{ marginBottom: "2vh" }}>
              <Typography variant="h3">Add New Adopter</Typography>
            </Grid>
            <CreateAdopterForm
              errors={errors}
              touched={touched}
              endpoint={adoptersEndpoint}
            />
          </Grid>
        </div>
      )}
    </Formik>
  );
}
