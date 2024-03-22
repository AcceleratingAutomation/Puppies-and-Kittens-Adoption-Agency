import React, { useReducer, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import {
  veterinariansUrl,
  veterinariansEndpoint,
} from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import {
  fetchDetails,
  editDetails,
  getTabValue,
} from "../../utils/componentUtils";
import { veterinariansText } from "../../accessibility/accessibilityText";
import veterinariansValidationSchema from "../../validations/veterinariansValidationSchema";
import editReducer from "../../reducers/editReducer";
import EditVeterinarianForm from "./EditVeterinarianForm";

const initialState = {
  firstName: "",
  lastName: "",
  name: "",
  isAccepting: false,
  numCurrentRescues: 0,
  numTotalRescues: 0,
  numHouseholdPeople: 0,
  numHouseholdPets: 0,
  hasBackgroundCheck: false,
  bio: "",
};

export default function EditVeterinarianDetails() {
  const { id } = useParams();
  const history = useHistory();
  const tabValue = getTabValue(tabs, veterinariansText);

  const [state, dispatch] = useReducer(editReducer, initialState);

  useEffect(() => {
    fetchDetails(
      veterinariansUrl,
      id,
      dispatch,
      "setVeterinarianEdit",
      "veterinarians",
    );
  }, [id]);

  const handleSubmit = useCallback(
    (values) => {
      editDetails(veterinariansUrl, id, values, history, veterinariansEndpoint);
    },
    [veterinariansUrl, id, history, veterinariansEndpoint],
  );

  return (
    <Formik
      initialValues={state}
      validationSchema={veterinariansValidationSchema}
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
            <EditVeterinarianForm
              errors={errors}
              touched={touched}
              id={id}
              endpoint={veterinariansEndpoint}
            />
          </Grid>
        </div>
      )}
    </Formik>
  );
}
