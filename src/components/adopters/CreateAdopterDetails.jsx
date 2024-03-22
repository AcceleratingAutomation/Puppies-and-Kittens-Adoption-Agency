import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import {
  adoptersUrl,
  adoptersEndpoint,
} from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import { createDetails, getTabValue } from "../../utils/componentUtils";
import { adoptersText } from "../../accessibility/header/headerText";
import { adoptersValidationSchema } from "../../validations/adoptersValidationSchema";
import CreateAdopterForm from "./CreateAdopterForm";

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
      initialValues={{
        email: "",
        password: "",
        username: "",
        firstName: "",
        lastName: "",
        name: "",
        type: "",
        role: "",
        isAdopting: false,
        numHouseholdPeople: 0,
        numHouseholdPets: 0,
        hasBackgroundCheck: false,
        hasApplication: false,
        bio: "",
        image: "",
      }}
      validationSchema={adoptersValidationSchema}
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
