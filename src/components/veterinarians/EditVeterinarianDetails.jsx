import React, { useReducer, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
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
import { veterinariansValidationSchema } from "../../validations/usersValidationSchema";
import editReducer from "../../reducers/editReducer";
import EditVeterinarianForm from "./EditVeterinarianForm";
import { veterinarianInitialValues } from "../../utils/formInitialValues";
import NotFound from "../NotFound";

export default function EditVeterinarianDetails() {
  const { id } = useParams();
  const history = useHistory();
  const tabValue = getTabValue(tabs, veterinariansText);

  const [state, dispatch] = useReducer(editReducer, veterinarianInitialValues);

  useEffect(() => {
    fetchDetails(
      veterinariansUrl,
      id,
      dispatch,
      "setVeterinarianEdit",
      "veterinarians",
    ).catch((error) => {
      dispatch({ type: "setError", value: error });
    });
  }, [id]);

  const handleSubmit = useCallback(
    (values) => {
      editDetails(veterinariansUrl, id, values, history, veterinariansEndpoint);
    },
    [veterinariansUrl, id, history, veterinariansEndpoint],
  );

  if (state.error) {
    return <NotFound />;
  }

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
            justifyContent="center"
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
