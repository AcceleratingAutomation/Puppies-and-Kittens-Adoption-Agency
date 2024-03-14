import React from "react";
import PropTypes from "prop-types";
import { Grid, Container } from "@material-ui/core";
import { Form } from "formik";
import { FormField, MultiLineFormField } from "../FormField";
import FormButtons from "../FormButtons";

function EditAdopterForm({ errors, touched, id, endpoint }) {
  const formFields = [
    { id: "firstName", name: "firstName", type: "text", label: "First Name" },
    { id: "lastName", name: "lastName", type: "text", label: "Last Name" },
    { id: "name", name: "name", type: "text", label: "Display Name" },
    {
      id: "isAdopting",
      name: "isAdopting",
      type: "checkbox",
      label: "Is Adopting",
    },
    {
      id: "numHouseholdPeople",
      name: "numHouseholdPeople",
      type: "number",
      label: "Number of People in Household",
    },
    {
      id: "numHouseholdPets",
      name: "numHouseholdPets",
      type: "number",
      label: "Number of Pets in Household",
    },
    {
      id: "hasBackgroundCheck",
      name: "hasBackgroundCheck",
      type: "checkbox",
      label: "Has Background Check",
    },
    {
      id: "hasApplication",
      name: "hasApplication",
      type: "checkbox",
      label: "Has Application",
    },
  ];

  return (
    <Form>
      <Container>
        <Grid
          container
          justify="center"
          alignItems="flex-start"
          direction="row"
        >
          <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
            {formFields.map((field) => (
              <FormField
                key={field.id}
                id={field.id}
                name={field.name}
                type={field.type}
                label={field.label}
                errors={errors}
                touched={touched}
              />
            ))}
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
            <MultiLineFormField
              id="bio"
              name="bio"
              label="Bio"
              errors={errors}
              touched={touched}
            />
          </Grid>
        </Grid>
      </Container>
      <FormButtons id={id} endpoint={endpoint} />
    </Form>
  );
}

EditAdopterForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default EditAdopterForm;
