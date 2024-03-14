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
  hasBackgroundCheckLabel,
  isAcceptingLabel,
  lastNameLabel,
  numCurrentRescuesLabel,
  numHouseholdPeopleLabel,
  numHouseholdPetsLabel,
  numTotalRescuesLabel,
} from "../../accessibility/users/usersText";

function EditFosterForm({ errors, touched, id, endpoint }) {
  const formFields = [
    { id: "firstName", name: "firstName", type: "text", label: firstNameLabel },
    { id: "lastName", name: "lastName", type: "text", label: lastNameLabel },
    { id: "name", name: "name", type: "text", label: displayNameLabel },
    {
      id: "isAccepting",
      name: "isAccepting",
      type: "checkbox",
      label: isAcceptingLabel,
    },
    {
      id: "numCurrentRescues",
      name: "numCurrentRescues",
      type: "number",
      label: numCurrentRescuesLabel,
    },
    {
      id: "numTotalRescues",
      name: "numTotalRescues",
      type: "number",
      label: numTotalRescuesLabel,
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

EditFosterForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default EditFosterForm;
