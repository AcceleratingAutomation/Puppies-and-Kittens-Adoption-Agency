import React, { useReducer, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Container, Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import {
  adoptersUrl,
  adoptersEndpoint,
} from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import { FormField, MultiLineFormField } from "../FormField";
import adoptersValidationSchema from "./adoptersValidationSchema";
import FormButtons from "../FormButtons";
import { fetchDetails, editDetails } from "../../utils/componentUtils";

const initialState = {
  firstName: "",
  lastName: "",
  name: "",
  isAdopting: false,
  numHouseholdPeople: 0,
  numHouseholdPets: 0,
  hasBackgroundCheck: false,
  hasApplication: false,
  bio: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setAdopter":
      return { ...state, ...action.value };
    default:
      throw new Error();
  }
}

export default function EditAdopterDetails() {
  const { id } = useParams();
  const history = useHistory();
  const tabValue = tabs.findIndex((tab) => tab.label === "Adopters");

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchDetails(adoptersUrl, id, dispatch, "setAdopter", "adopters");
  }, [id]);

  const handleSubmit = (values) => {
    editDetails(adoptersUrl, id, values, history, adoptersEndpoint);
  };

  return (
    <Formik
      initialValues={state}
      validationSchema={adoptersValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
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
              <Typography variant="h3">Edit {state.name}</Typography>
            </Grid>
            <Form>
              <Container>
                <Grid
                  container
                  justify="center"
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
                    <FormField
                      id="firstName"
                      name="firstName"
                      type="text"
                      label="First Name"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="lastName"
                      name="lastName"
                      type="text"
                      label="Last Name"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="name"
                      name="name"
                      type="text"
                      label="Display Name"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="isAdopting"
                      name="isAdopting"
                      type="checkbox"
                      label="Is Adopting"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="numHouseholdPeople"
                      name="numHouseholdPeople"
                      type="number"
                      label="Number of People in Household"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="numHouseholdPets"
                      name="numHouseholdPets"
                      type="number"
                      label="Number of Pets in Household"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="hasBackgroundCheck"
                      name="hasBackgroundCheck"
                      type="checkbox"
                      label="Has Background Check"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="hasApplication"
                      name="hasApplication"
                      type="checkbox"
                      label="Has Application"
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
                    <MultiLineFormField
                      id="bio"
                      name="bio"
                      label="Bio"
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                </Grid>
              </Container>
              <FormButtons id={id} endpoint={adoptersEndpoint} />
            </Form>
          </Grid>
        </div>
      )}
    </Formik>
  );
}
