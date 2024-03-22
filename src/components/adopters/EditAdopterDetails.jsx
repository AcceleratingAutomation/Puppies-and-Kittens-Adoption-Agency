import React, { useReducer, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
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
import { adoptersText } from "../../accessibility/header/headerText";
import { adoptersEditValidationSchema } from "../../validations/adoptersValidationSchema";
import editReducer from "../../reducers/editReducer";
import EditAdopterForm from "./EditAdopterForm";

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

export default function EditAdopterDetails() {
  const { id } = useParams();
  const history = useHistory();
  const tabValue = getTabValue(tabs, adoptersText);

  const [state, dispatch] = useReducer(editReducer, initialState);

  useEffect(() => {
    fetchDetails(adoptersUrl, id, dispatch, "setAdopterEdit", "adopters");
  }, [id]);

  const handleSubmit = useCallback(
    (values) => {
      editDetails(adoptersUrl, id, values, history, adoptersEndpoint);
    },
    [adoptersUrl, id, history, adoptersEndpoint],
  );

  return (
    <Formik
      initialValues={state}
      validationSchema={adoptersEditValidationSchema}
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
