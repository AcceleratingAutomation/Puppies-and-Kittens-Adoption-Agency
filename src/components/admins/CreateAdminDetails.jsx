import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import { adminsUrl, adminsEndpoint } from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import { createDetails, getTabValue } from "../../utils/componentUtils";
import { adminsText } from "../../accessibility/accessibilityText";
import { adminsValidationSchema } from "../../validations/usersValidationSchema";
import CreateAdminForm from "./CreateAdminForm";
import { adminInitialValues } from "../../utils/formInitialValues";

export default function CreateAdminDetails() {
  const history = useHistory();
  const tabValue = getTabValue(tabs, adminsText);

  const handleSubmit = useCallback(
    (values) => {
      createDetails(`${adminsUrl}/add`, values, history, adminsEndpoint);
    },
    [adminsUrl, history, adminsEndpoint],
  );

  return (
    <Formik
      initialValues={adminInitialValues}
      validationSchema={adminsValidationSchema}
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
              <Typography variant="h3">Add New Admin</Typography>
            </Grid>
            <CreateAdminForm
              errors={errors}
              touched={touched}
              endpoint={adminsEndpoint}
            />
          </Grid>
        </div>
      )}
    </Formik>
  );
}
