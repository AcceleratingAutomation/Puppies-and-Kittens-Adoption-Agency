import React from "react";
import { Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Field } from "formik";

function FormField({ id, name, type, label, errors, touched }) {
  return (
    <Grid item xs={12}>
      <label htmlFor={id}>
        <strong>{label}</strong>
        <Field id={id} name={name} type={type} style={{ margin: "0.625rem" }} />
        {errors[name] && touched[name] ? (
          <div style={{ color: "red" }}>{errors[name]}</div>
        ) : null}
      </label>
    </Grid>
  );
}

function MultiLineFormField({ id, name, label, errors, touched }) {
  return (
    <Grid item xs={12}>
      <label htmlFor={id}>
        <strong>{label}</strong>
        <Field
          as={TextField}
          id={id}
          name={name}
          multiline
          rows={10}
          variant="outlined"
          style={{ margin: "0.625rem", width: "100%" }}
        />
        {errors[name] && touched[name] ? (
          <div style={{ color: "red" }}>{errors[name]}</div>
        ) : null}
      </label>
    </Grid>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    name: PropTypes.bool,
  }).isRequired,
};

MultiLineFormField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    name: PropTypes.bool,
  }).isRequired,
};

export { FormField, MultiLineFormField };
