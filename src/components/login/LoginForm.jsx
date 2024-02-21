import React from "react";
import { Grid, Typography, TextField, Button, Hidden } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { Field, Form, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import DisplayImage from "../DisplayImage";
import {
  usernameText,
  passwordText,
  loginText,
} from "../../accessibility/login/loginText";

function LoginForm({ isSubmitting }) {
  return (
    <Form>
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{ marginTop: "3vh" }}
      >
        <Grid item style={{ marginBottom: "3vh" }}>
          <Typography variant="h3">
            Puppies and Kittens{" "}
            <Hidden xsDown>
              <br />
            </Hidden>{" "}
            Rescue and Adoption Agency!
          </Typography>
        </Grid>
        <Grid item style={{ marginBottom: "3vh" }}>
          <Field
            name="username"
            as={TextField}
            id="username-input"
            label={usernameText}
          />
          <ErrorMessage
            name="username"
            component="div"
            style={{ color: "red" }}
          />
        </Grid>
        <Grid item style={{ marginBottom: "5vh" }}>
          <Field
            name="password"
            as={TextField}
            id="password-input"
            label={
              <>
                {passwordText}
                <Tooltip
                  title={
                    <Typography variant="body2" style={{ fontSize: "1.2em" }}>
                      Must contain at least:
                      <ul>
                        <li>8 characters,</li>
                        <li>1 lowercase letter,</li>
                        <li>1 uppercase letter,</li>
                        <li>1 number, and</li>
                        <li>1 special character</li>
                      </ul>
                    </Typography>
                  }
                >
                  <HelpOutlineIcon
                    fontSize="small"
                    style={{ marginLeft: "10px" }}
                  />
                </Tooltip>
              </>
            }
            type="password"
          />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "red" }}
          />
        </Grid>
        <Grid item style={{ marginBottom: "2vh" }}>
          <Button
            style={{ margin: "0.625rem" }}
            aria-label="login"
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {loginText}
          </Button>
        </Grid>
        <ErrorMessage name="login" component="div" style={{ color: "red" }} />
        <Grid
          container
          style={{ margin: "0 auto", maxWidth: "80%" }}
          justify="center"
        >
          <Grid item xs={12} sm={4}>
            <DisplayImage
              directory="placeholders"
              id="puppy"
              name="Playful Puppy"
              width="15rem"
              height="15rem"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DisplayImage
              directory="placeholders"
              id="kitten"
              name="Playful Kitten"
              width="15rem"
              height="15rem"
            />
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );
}

LoginForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
};

export default LoginForm;
