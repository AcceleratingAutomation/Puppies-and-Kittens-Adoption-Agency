import React, { useReducer, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import { adminsUrl, adminsEndpoint } from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import {
  fetchDetails,
  editDetails,
  getTabValue,
} from "../../utils/componentUtils";
import { adminsText } from "../../accessibility/accessibilityText";
import adminsValidationSchema from "../../validations/adminsValidationSchema";
import editReducer from "../../reducers/editReducer";
import EditAdminForm from "./EditAdminForm";

const initialState = {
  firstName: "",
  lastName: "",
  name: "",
  numCurrentRescues: 0,
  numTotalRescues: 0,
  numHouseholdPets: 0,
  hasBackgroundCheck: false,
  bio: "",
};

export default function EditAdminDetails() {
  const { id } = useParams();
  const history = useHistory();
  const tabValue = getTabValue(tabs, adminsText);

  const [state, dispatch] = useReducer(editReducer, initialState);

  useEffect(() => {
    fetchDetails(adminsUrl, id, dispatch, "setAdminEdit", "admins");
  }, [id]);

  const handleSubmit = useCallback(
    (values) => {
      editDetails(adminsUrl, id, values, history, adminsEndpoint);
    },
    [adminsUrl, id, history, adminsEndpoint],
  );

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
            justify="center"
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
