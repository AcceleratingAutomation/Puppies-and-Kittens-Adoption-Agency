import React from "react";
import PropTypes from "prop-types";
import { Grid, Container } from "@material-ui/core";
import { Form } from "formik";
import { FormField, MultiLineFormField } from "../FormField";
import FormButtons from "../FormButtons";
import {
  bioLabel,
  nameLabel,
  typeLabel,
  genderLabel,
  breedLabel,
  hasFosterLabel,
  hasVetLabel,
  isSterilizedLabel,
  isVaccinatedLabel,
  isAdoptableLabel,
} from "../../accessibility/rescues/rescuesText";

function EditRescueForm({ errors, touched, id, endpoint }) {
  const formFields = [
    { id: "name", name: "name", type: "text", label: nameLabel },
    {
      id: "type",
      name: "type",
      type: "select",
      label: typeLabel,
      options: ["Cat", "Dog"],
    },
    {
      id: "gender",
      name: "gender",
      type: "select",
      label: genderLabel,
      options: ["Male", "Female"],
    },
    { id: "breed", name: "breed", type: "text", label: breedLabel },
    {
      id: "isSterilized",
      name: "isSterilized",
      type: "checkbox",
      label: isSterilizedLabel,
    },
    {
      id: "isVaccinated",
      name: "isVaccinated",
      type: "checkbox",
      label: isVaccinatedLabel,
    },
    {
      id: "isAdoptable",
      name: "isAdoptable",
      type: "checkbox",
      label: isAdoptableLabel,
    },
    {
      id: "hasFoster",
      name: "hasFoster",
      type: "checkbox",
      label: hasFosterLabel,
    },
    {
      id: "hasVet",
      name: "hasVet",
      type: "checkbox",
      label: hasVetLabel,
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

EditRescueForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default EditRescueForm;
