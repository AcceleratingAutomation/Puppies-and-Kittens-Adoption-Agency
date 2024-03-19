import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Container,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Form, useFormikContext } from "formik";
import { FormField, MultiLineFormField } from "../FormField";
import FormButtons from "../FormButtons";
import {
  bioLabel,
  displayNameLabel,
  emailLabel,
  firstNameLabel,
  hasApplicationLabel,
  hasBackgroundCheckLabel,
  imageLabel,
  isAdoptingLabel,
  lastNameLabel,
  numHouseholdPeopleLabel,
  numHouseholdPetsLabel,
  passwordLabel,
  roleLabel,
  usernameLabel,
  userTypeLabel,
} from "../../accessibility/users/usersText";

function CreateAdopterForm({ errors, touched, endpoint }) {
  const { values, handleChange } = useFormikContext();

  const formFields = [
    { id: "email", name: "email", type: "text", label: emailLabel },
    { id: "password", name: "password", type: "text", label: passwordLabel },
    { id: "username", name: "username", type: "text", label: usernameLabel },
    { id: "firstName", name: "firstName", type: "text", label: firstNameLabel },
    { id: "lastName", name: "lastName", type: "text", label: lastNameLabel },
    { id: "name", name: "name", type: "text", label: displayNameLabel },
    {
      id: "type",
      name: "type",
      type: "select",
      label: userTypeLabel,
      options: ["Adopter", "Foster", "Veterinarian", "Admin"],
    },
    {
      id: "role",
      name: "role",
      type: "select",
      label: roleLabel,
      options: ["adopter", "foster", "veterinarian", "admin"],
    },
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

CreateAdopterForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default CreateAdopterForm;
