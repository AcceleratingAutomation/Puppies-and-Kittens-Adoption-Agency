import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Container, Typography, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { constructHeader } from "../../utils/utils";
import { adoptersUrl } from "../../server/apiService/apiConfig";
import { AppHeader, tabs } from "../header/AppHeader";
import { FormField, MultiLineFormField } from "../FormField";

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
                    <FormField
                      id="firstName"
                      name="firstName"
                      type="text"
                      label="First Name"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="lastName"
                      name="lastName"
                      type="text"
                      label="Last Name"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="name"
                      name="name"
                      type="text"
                      label="Display Name"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="isAdopting"
                      name="isAdopting"
                      type="checkbox"
                      label="Is Adopting"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="numHouseholdPeople"
                      name="numHouseholdPeople"
                      type="number"
                      label="Number of People in Household"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="numHouseholdPets"
                      name="numHouseholdPets"
                      type="number"
                      label="Number of Pets in Household"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="hasBackgroundCheck"
                      name="hasBackgroundCheck"
                      type="checkbox"
                      label="Has Background Check"
                      errors={errors}
                      touched={touched}
                    />
                    <FormField
                      id="hasApplication"
                      name="hasApplication"
                      type="checkbox"
                      label="Has Application"
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
                    <MultiLineFormField
                      id="bio"
                      name="bio"
                      label="Bio"
                      errors={errors}
                      touched={touched}
                    />
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
