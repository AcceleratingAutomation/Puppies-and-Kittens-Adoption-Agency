import React, { useReducer, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import { adminsUrl, adminsEndpoint } from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import {
  fetchDetails,
  editDetails,
  getTabValue,
} from "../../utils/componentUtils";
import { adminsText } from "../../accessibility/accessibilityText";
import { adminsValidationSchema } from "../../validations/usersValidationSchema";
import editReducer from "../../reducers/editReducer";
import EditAdminForm from "./EditAdminForm";
import { adminInitialValues } from "../../utils/formInitialValues";
import NotFound from "../NotFound";

export default function EditAdminDetails() {
  const { id } = useParams();
  const history = useHistory();
  const tabValue = getTabValue(tabs, adminsText);

  const [state, dispatch] = useReducer(editReducer, adminInitialValues);

  useEffect(() => {
    fetchDetails(adminsUrl, id, dispatch, "setAdminEdit", "admins").catch(
      (error) => {
        dispatch({ type: "setError", value: error });
      },
    );
  }, [id]);

  const handleSubmit = useCallback(
    (values) => {
      editDetails(adminsUrl, id, values, history, adminsEndpoint);
    },
    [adminsUrl, id, history, adminsEndpoint],
  );

  if (state.error) {
    return <NotFound />;
  }

  return (
    <Formik
      initialValues={state}
      validationSchema={adminsValidationSchema}
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
            <EditAdminForm
              errors={errors}
              touched={touched}
              id={id}
              endpoint={adminsEndpoint}
            />
          </Grid>
        </div>
      )}
    </Formik>
  );
}
