import React, { useReducer, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import {
  adoptersUrl,
  adoptersEndpoint,
} from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import {
  fetchDetails,
  editDetails,
  getTabValue,
} from "../../utils/componentUtils";
import { adoptersText } from "../../accessibility/accessibilityText";
import { adoptersValidationSchema } from "../../validations/usersValidationSchema";
import editReducer from "../../reducers/editReducer";
import EditAdopterForm from "./EditAdopterForm";
import { adopterInitialValues } from "../../utils/formInitialValues";
import NotFound from "../NotFound";

export default function EditAdopterDetails() {
  const { id } = useParams();
  const history = useHistory();
  const tabValue = getTabValue(tabs, adoptersText);

  const [state, dispatch] = useReducer(editReducer, adopterInitialValues);

  useEffect(() => {
    fetchDetails(adoptersUrl, id, dispatch, "setAdopterEdit", "adopters").catch(
      (error) => {
        dispatch({ type: "setError", value: error });
      },
    );
  }, [id]);

  const handleSubmit = useCallback(
    (values) => {
      editDetails(adoptersUrl, id, values, history, adoptersEndpoint);
    },
    [adoptersUrl, id, history, adoptersEndpoint],
  );

  if (state.error) {
    return <NotFound />;
  }

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
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Grid item style={{ marginBottom: "2vh" }}>
              <Typography variant="h3">Edit {state.name}</Typography>
            </Grid>
            <EditAdopterForm
              errors={errors}
              touched={touched}
              id={id}
              endpoint={adoptersEndpoint}
            />
          </Grid>
        </div>
      )}
    </Formik>
  );
}
