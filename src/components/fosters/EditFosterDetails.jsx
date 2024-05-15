import React, { useReducer, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import { fostersUrl, fostersEndpoint } from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import {
  fetchDetails,
  editDetails,
  getTabValue,
} from "../../utils/componentUtils";
import { fostersText } from "../../accessibility/accessibilityText";
import { fostersValidationSchema } from "../../validations/usersValidationSchema";
import editReducer from "../../reducers/editReducer";
import EditFosterForm from "./EditFosterForm";
import { fosterInitialValues } from "../../utils/formInitialValues";
import NotFound from "../NotFound";

export default function EditFosterDetails() {
  const { id } = useParams();
  const history = useHistory();
  const tabValue = getTabValue(tabs, fostersText);

  const [state, dispatch] = useReducer(editReducer, fosterInitialValues);

  useEffect(() => {
    fetchDetails(fostersUrl, id, dispatch, "setFosterEdit", "fosters").catch(
      (error) => {
        dispatch({ type: "setError", value: error });
      },
    );
  }, [id]);

  const handleSubmit = useCallback(
    (values) => {
      editDetails(fostersUrl, id, values, history, fostersEndpoint);
    },
    [fostersUrl, id, history, fostersEndpoint],
  );

  if (state.error) {
    return <NotFound />;
  }

  return (
    <Formik
      initialValues={state}
      validationSchema={fostersValidationSchema}
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
            <EditFosterForm
              errors={errors}
              touched={touched}
              id={id}
              endpoint={fostersEndpoint}
            />
          </Grid>
        </div>
      )}
    </Formik>
  );
}
