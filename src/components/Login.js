import React, { useEffect, useRef } from "react";
import { Grid, Typography, TextField, Button, Hidden } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useHistory } from "react-router-dom";
import { updateAppSettings } from "../utils";
import RescueImage from "./rescues/RescueImage";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
let base64 = require("base-64");
let headers = new Headers();

const url = "http://localhost:5000/v1/login";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  login: Yup.string(),
});

export const Login = () => {
  const history = useHistory();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onSubmit = (values, { setSubmitting, setErrors }) => {
    headers.set(
      "Authorization",
      "Basic " + base64.encode(values.username + ":" + values.password)
    );
    fetch(url, { headers: headers, method: "POST" })
      .then((res) => res.json())
      .then((json) => {
        if (isMounted.current) {
          if (json.message) {
            setErrors({ login: json.message });
          }
          else {
            updateAppSettings(json.token);
            history.push("/v1/rescues");
          }
          setSubmitting(false);
        }
      })
      .catch((err) => console.log("Error logging into app ", err.message));
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', login: '' }}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            style={{ marginTop: "3vh" }}
          >
            <Grid item style={{ marginBottom: "3vh" }}>
              <Typography variant={"h3"}>
                Puppies and Kittens <Hidden xsDown><br /></Hidden> Adoption Agency!
              </Typography>
            </Grid>
            <Grid item style={{ marginBottom: "3vh" }}>
              <Field
                name="username"
                as={TextField}
                id={"username-input"}
                label={"Username"}
              />
              <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
            </Grid>
            <Grid item style={{ marginBottom: "2vh" }}>
              <Field
                name="password"
                as={TextField}
                id={"password-input"}
                label={
                  <React.Fragment>
                    Password
                    <Tooltip title={
                      <React.Fragment>
                        <Typography variant="body2" style={{ fontSize: '1.2em' }}>
                          Must contain:
                          <ul>
                            <li>at least 8 characters,</li>
                            <li>1 lowercase letter,</li>
                            <li>1 uppercase letter, and</li>
                            <li>1 number</li>
                          </ul>
                        </Typography>
                      </React.Fragment>
                    }>
                      <HelpOutlineIcon fontSize="small" style={{ marginLeft: '10px' }} />
                    </Tooltip>
                  </React.Fragment>
                }
                type={"password"}
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </Grid>
            <Grid item style={{ marginBottom: "2vh" }}>
              <Button
                style={{ margin: '0.625rem' }}
                aria-label={"login"}
                variant={"contained"}
                size={"large"}
                color={"primary"}
                type="submit"
                disabled={isSubmitting}
              >
                LOGIN
              </Button>
            </Grid>
            <ErrorMessage name="login" component="div" style={{ color: 'red' }} />
            <Grid container style={{ margin: '0 auto', maxWidth: '80%' }} justify="center">
              <Grid item xs={12} sm={4}>
                <RescueImage
                  type={"dog"}
                  image={0}
                  name={"Playful Puppy"}
                  width='15rem'
                  height='15rem'
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <RescueImage
                  type={"cat"}
                  image={0}
                  name={"Playful Kitten"}
                  width='15rem'
                  height='15rem'
                />
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
