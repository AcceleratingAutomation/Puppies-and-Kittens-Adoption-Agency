import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Form, useFormikContext } from "formik";
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
  imageLabel,
  isSterilizedLabel,
  isVaccinatedLabel,
  isAdoptableLabel,
} from "../../accessibility/rescues/rescuesText";

function CreateRescueForm({ errors, touched, endpoint }) {
  const { values, handleChange } = useFormikContext();

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
    {
      id: "image",
      name: "image",
      type: "number",
      label: imageLabel,
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
            {formFields.map((field) =>
              field.type === "select" ? (
                <Grid container alignItems="center" spacing={2} key={field.id}>
                  <Grid item>
                    <label htmlFor="name" style={{ fontWeight: "bold" }}>
                      {field.label}
                    </label>
                  </Grid>
                  <Grid item>
                    <FormControl
                      key={field.id}
                      error={touched[field.name] && Boolean(errors[field.name])}
                    >
                      <Select
                        id={field.id}
                        name={field.name}
                        value={values[field.name]}
                        onChange={handleChange}
                      >
                        {field.options.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched[field.name] && errors[field.name] && (
                        <FormHelperText>{errors[field.name]}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              ) : (
                <FormField
                  key={field.id}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  label={field.label}
                  errors={errors}
                  touched={touched}
                />
              ),
            )}
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
      <FormButtons endpoint={endpoint} />
    </Form>
  );
}

CreateRescueForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default CreateRescueForm;
