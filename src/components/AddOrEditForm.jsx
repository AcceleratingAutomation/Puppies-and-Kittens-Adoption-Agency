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
import { FormField, MultiLineFormField } from "./FormField";
import FormButtons from "./FormButtons";
import { bioLabel } from "../accessibility/users/usersText";

function AddOrEditForm({ errors, touched, formFields, endpoint, id }) {
  const { values, handleChange } = useFormikContext();

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
        <FormButtons id={id} endpoint={endpoint} />
      </Container>
    </Form>
  );
}

AddOrEditForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  endpoint: PropTypes.string.isRequired,
  id: PropTypes.string,
};

AddOrEditForm.defaultProps = {
  id: "",
};

export default AddOrEditForm;
