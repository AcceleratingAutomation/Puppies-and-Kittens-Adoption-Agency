import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import { rescuesEndpoint, rescuesUrl } from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import { createDetails, getTabValue } from "../../utils/componentUtils";
import { rescuesText } from "../../accessibility/accessibilityText";
import rescuesValidationSchema from "../../validations/rescuesValidationSchema";
import CreateRescueForm from "./CreateRescueForm";

export default function CreateRescueDetails() {
  const history = useHistory();
  const tabValue = getTabValue(tabs, rescuesText);

  const handleSubmit = useCallback(
    (values) => {
      createDetails(`${rescuesUrl}/add`, values, history, rescuesEndpoint);
    },
    [rescuesUrl, history, rescuesEndpoint],
  );

  return (
    <Formik
      initialValues={{
        name: "",
        type: "",
        gender: "",
        breed: "",
        isSterilized: false,
        isVaccinated: false,
        isAdoptable: false,
        hasFoster: false,
        hasVet: false,
        image: "",
        bio: "",
      }}
      validationSchema={rescuesValidationSchema}
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
              <Typography variant="h3">Add New Rescue</Typography>
            </Grid>
            <CreateRescueForm
              errors={errors}
              touched={touched}
              endpoint={rescuesEndpoint}
            />
          </Grid>
        </div>
      )}
    </Formik>
  );
}
