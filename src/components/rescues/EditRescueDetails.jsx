import React, { useReducer, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import { rescuesUrl, rescuesEndpoint } from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import {
  fetchDetails,
  editDetails,
  getTabValue,
} from "../../utils/componentUtils";
import { rescuesText } from "../../accessibility/accessibilityText";
import rescuesValidationSchema from "../../validations/rescuesValidationSchema";
import editReducer from "../../reducers/editReducer";
import EditRescueForm from "./EditRescueForm";
import { rescueInitialValues } from "../../utils/formInitialValues";

export default function EditRescueDetails() {
  const { id } = useParams();
  const history = useHistory();
  const tabValue = getTabValue(tabs, rescuesText);

  const [state, dispatch] = useReducer(editReducer, rescueInitialValues);

  useEffect(() => {
    fetchDetails(rescuesUrl, id, dispatch, "setRescueEdit", "rescues");
  }, [id]);

  const handleSubmit = useCallback(
    (values) => {
      editDetails(rescuesUrl, id, values, history, rescuesEndpoint);
    },
    [rescuesUrl, id, history, rescuesEndpoint],
  );

  return (
    <Formik
      initialValues={state}
      validationSchema={rescuesValidationSchema}
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
            <EditRescueForm
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
