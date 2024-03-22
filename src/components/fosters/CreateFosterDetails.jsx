import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import { fostersUrl, fostersEndpoint } from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import { createDetails, getTabValue } from "../../utils/componentUtils";
import { fostersText } from "../../accessibility/accessibilityText";
import { fostersValidationSchema } from "../../validations/usersValidationSchema";
import CreateFosterForm from "./CreateFosterForm";
import { fosterInitialValues } from "../../utils/formInitialValues";

export default function CreateFosterDetails() {
  const history = useHistory();
  const tabValue = getTabValue(tabs, fostersText);

  const handleSubmit = useCallback(
    (values) => {
      createDetails(`${fostersUrl}/add`, values, history, fostersEndpoint);
    },
    [fostersUrl, history, fostersEndpoint],
  );

  return (
    <Formik
      initialValues={fosterInitialValues}
      validationSchema={fostersValidationSchema}
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
              <Typography variant="h3">Add New Foster</Typography>
            </Grid>
            <CreateFosterForm
              errors={errors}
              touched={touched}
              endpoint={fostersEndpoint}
            />
          </Grid>
        </div>
      )}
    </Formik>
  );
}
