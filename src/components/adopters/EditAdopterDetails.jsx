import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { constructHeader } from "../../utils/utils";
import { adoptersUrl } from "../../server/apiService/apiConfig";

export default function EditAdopterDetails() {
  const { id } = useParams();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [isAdopting, setIsAdopting] = useState(false);
  const [numHouseholdPeople, setNumHouseholdPeople] = useState(0);
  const [numHouseholdPets, setNumHouseholdPets] = useState(0);
  const [hasBackgroundCheck, setHasBackgroundCheck] = useState(false);
  const [hasApplication, setHasApplication] = useState(false);
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const url = `${adoptersUrl}/${id}`;
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
        setImage(data.adopters.image);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedAdopter = {
      firstName,
      lastName,
      name,
      isAdopting,
      numHouseholdPeople,
      numHouseholdPets,
      hasBackgroundCheck,
      hasApplication,
      bio,
      image,
    };

    fetch(`${adoptersUrl}/${id}`, {
      method: "PUT",
      headers: constructHeader(),
      body: JSON.stringify(updatedAdopter),
    }).then(() => {
      history.push(`/v1/adopters/${id}`);
    });
  };

  const validationSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    name: Yup.string(),
    isAdopting: Yup.boolean(),
    numHouseholdPeople: Yup.number(),
    numHouseholdPets: Yup.number(),
    hasBackgroundCheck: Yup.boolean(),
    hasApplication: Yup.boolean(),
    bio: Yup.string(),
    image: Yup.number(),
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
        image,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched }) => (
        <Form>
          <label htmlFor="firstName">
            First Name:
            <Field id="firstName" name="firstName" type="text" />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}
          </label>
          <label htmlFor="lastName">
            Last Name:
            <Field id="lastName" name="lastName" type="text" />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}
          </label>
          <label htmlFor="name">
            Name:
            <Field id="name" name="name" type="text" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
          </label>
          <label htmlFor="isAdopting">
            Is Adopting:
            <Field id="isAdopting" name="isAdopting" type="checkbox" />
            {errors.isAdopting && touched.isAdopting ? (
              <div>{errors.isAdopting}</div>
            ) : null}
          </label>
          <label htmlFor="numHouseholdPeople">
            Number of People in Household:
            <Field
              id="numHouseholdPeople"
              name="numHouseholdPeople"
              type="number"
            />
            {errors.numHouseholdPeople && touched.numHouseholdPeople ? (
              <div>{errors.numHouseholdPeople}</div>
            ) : null}
          </label>
          <label htmlFor="numHouseholdPets">
            Number of Pets in Household:
            <Field
              id="numHouseholdPets"
              name="numHouseholdPets"
              type="number"
            />
            {errors.numHouseholdPets && touched.numHouseholdPets ? (
              <div>{errors.numHouseholdPets}</div>
            ) : null}
          </label>
          <label htmlFor="hasBackgroundCheck">
            Has Background Check:
            <Field
              id="hasBackgroundCheck"
              name="hasBackgroundCheck"
              type="checkbox"
            />
            {errors.hasBackgroundCheck && touched.hasBackgroundCheck ? (
              <div>{errors.hasBackgroundCheck}</div>
            ) : null}
          </label>
          <label htmlFor="hasApplication">
            Has Application:
            <Field id="hasApplication" name="hasApplication" type="checkbox" />
            {errors.hasApplication && touched.hasApplication ? (
              <div>{errors.hasApplication}</div>
            ) : null}
          </label>
          <label htmlFor="bio">
            Bio:
            <Field id="bio" name="bio" as="textarea" />
            {errors.bio && touched.bio ? <div>{errors.bio}</div> : null}
          </label>
          <label htmlFor="image">
            Image URL:
            <Field id="image" name="image" type="text" />
            {errors.image && touched.image ? <div>{errors.image}</div> : null}
          </label>
          <button type="submit">Submit</button>
          <button
            type="button"
            onClick={() => history.push(`/v1/adopters/${id}`)}
          >
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
}
