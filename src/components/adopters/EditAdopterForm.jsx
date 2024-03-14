import React from "react";
import PropTypes from "prop-types";
import { Grid, Container } from "@material-ui/core";
import { Form } from "formik";
import { FormField, MultiLineFormField } from "../FormField";
import FormButtons from "../FormButtons";
import {
  bioLabel,
  displayNameLabel,
  firstNameLabel,
  hasApplicationLabel,
  hasBackgroundCheckLabel,
  isAdoptingLabel,
  lastNameLabel,
  numHouseholdPeopleLabel,
  numHouseholdPetsLabel,
} from "../../accessibility/users/usersText";

function EditAdopterForm({ errors, touched, id, endpoint }) {
  const formFields = [
    { id: "firstName", name: "firstName", type: "text", label: firstNameLabel },
    { id: "lastName", name: "lastName", type: "text", label: lastNameLabel },
    { id: "name", name: "name", type: "text", label: displayNameLabel },
    {
      id: "isAdopting",
      name: "isAdopting",
      type: "checkbox",
      label: isAdoptingLabel,
    },
    {
      id: "numHouseholdPeople",
      name: "numHouseholdPeople",
      type: "number",
      label: numHouseholdPeopleLabel,
    },
    {
      id: "numHouseholdPets",
      name: "numHouseholdPets",
      type: "number",
      label: numHouseholdPetsLabel,
    },
    {
      id: "hasBackgroundCheck",
      name: "hasBackgroundCheck",
      type: "checkbox",
      label: hasBackgroundCheckLabel,
    },
    {
      id: "hasApplication",
      name: "hasApplication",
      type: "checkbox",
      label: hasApplicationLabel,
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
              label={bioLabel}
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
