import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Grid,
  Container,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { constructHeader } from "../../utils/utils";
import { adoptersUrl } from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";

export default function EditAdopterDetails() {
  const { id } = useParams();
  const history = useHistory();
  const tabValue = tabs.findIndex((tab) => tab.label === "Adopters");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [isAdopting, setIsAdopting] = useState(false);
  const [numHouseholdPeople, setNumHouseholdPeople] = useState(0);
  const [numHouseholdPets, setNumHouseholdPets] = useState(0);
  const [hasBackgroundCheck, setHasBackgroundCheck] = useState(false);
  const [hasApplication, setHasApplication] = useState(false);
  const [bio, setBio] = useState("");

  const url = `${adoptersUrl}/${id}`;

  useEffect(() => {
    fetch(url, { headers: constructHeader() })
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.adopters.firstName);
        setLastName(data.adopters.lastName);
        setName(data.adopters.name);
        setIsAdopting(data.adopters.isAdopting);
        setNumHouseholdPeople(data.adopters.numHouseholdPeople);
        setNumHouseholdPets(data.adopters.numHouseholdPets);
        setHasBackgroundCheck(data.adopters.hasBackgroundCheck);
        setHasApplication(data.adopters.hasApplication);
        setBio(data.adopters.bio);
      });
  }, [id]);

  const handleSubmit = (values) => {
    const updatedAdopter = {
      firstName: values.firstName,
      lastName: values.lastName,
      name: values.name,
      isAdopting: values.isAdopting,
      numHouseholdPeople: values.numHouseholdPeople,
      numHouseholdPets: values.numHouseholdPets,
      hasBackgroundCheck: values.hasBackgroundCheck,
      hasApplication: values.hasApplication,
      bio: values.bio,
    };
    fetch(url, {
      method: "PUT",
      headers: {
        ...constructHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAdopter),
    }).then(() => {
      history.push(`/v1/adopters/${id}`);
    });
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name Required"),
    lastName: Yup.string().required("Last Name Required"),
    name: Yup.string().required("Display Name Required"),
    isAdopting: Yup.boolean().required("Looking to Adopt Required"),
    numHouseholdPeople: Yup.number().required("Number of People Required"),
    numHouseholdPets: Yup.number().required("Number of Pets Required"),
    hasBackgroundCheck: Yup.boolean().required("Background Check Required"),
    hasApplication: Yup.boolean().required("Application Required"),
    bio: Yup.string().required("Bio Required"),
  });

  return (
    <Formik
      initialValues={{
        firstName,
        lastName,
        name,
        isAdopting,
        numHouseholdPeople,
        numHouseholdPets,
        hasBackgroundCheck,
        hasApplication,
        bio,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched }) => (
        <div className="content">
          <AppHeader tabValue={tabValue} />
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item style={{ marginBottom: "2vh" }}>
              <Typography variant="h3">Edit {name}</Typography>
            </Grid>
            <Form>
              <Container>
                <Grid
                  container
                  justify="center"
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
                    <Grid item xs={12}>
                      <label htmlFor="firstName">
                        <strong>First Name</strong>
                        <Field
                          id="firstName"
                          name="firstName"
                          type="text"
                          style={{ margin: "0.625rem" }}
                        />
                        {errors.firstName && touched.firstName ? (
                          <div style={{ color: "red" }}>{errors.firstName}</div>
                        ) : null}
                      </label>
                    </Grid>
                    <Grid item xs={12}>
                      <label htmlFor="lastName">
                        <strong>Last Name</strong>
                        <Field
                          id="lastName"
                          name="lastName"
                          type="text"
                          style={{ margin: "0.625rem" }}
                        />
                        {errors.lastName && touched.lastName ? (
                          <div style={{ color: "red" }}>{errors.lastName}</div>
                        ) : null}
                      </label>
                    </Grid>
                    <Grid item xs={12}>
                      <label htmlFor="name">
                        <strong>Display Name</strong>
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          style={{ margin: "0.625rem" }}
                        />
                        {errors.name && touched.name ? (
                          <div style={{ color: "red" }}>{errors.name}</div>
                        ) : null}
                      </label>
                    </Grid>
                    <Grid item xs={12}>
                      <label htmlFor="isAdopting">
                        <strong>Is Adopting</strong>
                        <Field
                          id="isAdopting"
                          name="isAdopting"
                          type="checkbox"
                          style={{ margin: "0.625rem" }}
                        />
                        {errors.isAdopting && touched.isAdopting ? (
                          <div style={{ color: "red" }}>
                            {errors.isAdopting}
                          </div>
                        ) : null}
                      </label>
                    </Grid>
                    <Grid item xs={12}>
                      <label htmlFor="numHouseholdPeople">
                        <strong>Number of People in Household</strong>
                        <Field
                          id="numHouseholdPeople"
                          name="numHouseholdPeople"
                          type="number"
                          style={{ margin: "0.625rem" }}
                        />
                        {errors.numHouseholdPeople &&
                        touched.numHouseholdPeople ? (
                          <div style={{ color: "red" }}>
                            {errors.numHouseholdPeople}
                          </div>
                        ) : null}
                      </label>
                    </Grid>
                    <Grid item xs={12}>
                      <label htmlFor="numHouseholdPets">
                        <strong>Number of Pets in Household</strong>
                        <Field
                          id="numHouseholdPets"
                          name="numHouseholdPets"
                          type="number"
                          style={{ margin: "0.625rem" }}
                        />
                        {errors.numHouseholdPets && touched.numHouseholdPets ? (
                          <div style={{ color: "red" }}>
                            {errors.numHouseholdPets}
                          </div>
                        ) : null}
                      </label>
                    </Grid>
                    <Grid item xs={12}>
                      <label htmlFor="hasBackgroundCheck">
                        <strong>Has Background Check</strong>
                        <Field
                          id="hasBackgroundCheck"
                          name="hasBackgroundCheck"
                          type="checkbox"
                          style={{ margin: "0.625rem" }}
                        />
                        {errors.hasBackgroundCheck &&
                        touched.hasBackgroundCheck ? (
                          <div style={{ color: "red" }}>
                            {errors.hasBackgroundCheck}
                          </div>
                        ) : null}
                      </label>
                    </Grid>
                    <Grid item xs={12}>
                      <label htmlFor="hasApplication">
                        <strong>Has Application</strong>
                        <Field
                          id="hasApplication"
                          name="hasApplication"
                          type="checkbox"
                          style={{ margin: "0.625rem" }}
                        />
                        {errors.hasApplication && touched.hasApplication ? (
                          <div style={{ color: "red" }}>
                            {errors.hasApplication}
                          </div>
                        ) : null}
                      </label>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
                    <Grid item xs={12}>
                      <label htmlFor="bio">
                        <strong>Bio</strong>
                        <Field
                          as={TextField}
                          id="bio"
                          name="bio"
                          multiline
                          rows={10}
                          variant="outlined"
                          style={{ margin: "0.625rem", width: "100%" }}
                        />
                        {errors.bio && touched.bio ? (
                          <div style={{ color: "red" }}>{errors.bio}</div>
                        ) : null}
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
              <Grid item container justify="center">
                <Button
                  type="submit"
                  style={{ margin: "0.625rem" }}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Save
                </Button>
                <Button
                  style={{ margin: "0.625rem" }}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => history.push(`/v1/adopters/${id}`)}
                >
                  Cancel
                </Button>
              </Grid>
            </Form>
          </Grid>
        </div>
      )}
    </Formik>
  );
}
