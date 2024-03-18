import React, { useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import { rescuesEndpoint, rescuesUrl } from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import { createDetails, getTabValue } from "../../utils/componentUtils";
import { rescuesText } from "../../accessibility/header/headerText";
import rescuesValidationSchema from "../../validations/rescuesValidationSchema";
import CreateRescueForm from "./CreateRescueForm";

export default function CreateRescueDetails() {
  const { id } = useParams();
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
              id={id}
              endpoint={rescuesEndpoint}
            />
          </Grid>
        </div>
      )}
    </Formik>
  );
}
