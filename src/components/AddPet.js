import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { useHistory } from "react-router-dom";
import { constructHeader, isMember, updateAppSettings } from "../util";

const url = "http://localhost:5000/pet";

export const AddPet = () => {
  const [pet, setPetName] = useState("");
  const [type, setPetType] = useState("");
  const [gender, setPetGender] = useState("");
  const [breed, setPetBreed] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const showPage = !isMember();

  useEffect(() => {
    if (!localStorage.getItem("token")) history.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangePetName = (pet) => setPetName(pet);
  const onChangePetType = (type) => setPetType(type);
  const onChangePetGender = (gender) => setPetGender(gender);
  const onChangePetBreed = (breed) => setPetBreed(breed);

  const redirect = () => {
    localStorage.clear();
    history.push("/login");
  };

  const clearTextFields = () => {
    setPetName("");
    setPetType("");
    setPetGender("");
    setPetBreed("");
  };

  const onClick = () => {
    const petData = { name: pet, type: type, gender: gender, breed: breed };
    fetch(url, {
      headers: constructHeader("application/json"),
      method: "POST",
      body: JSON.stringify(petData),
    })
      .then((res) => {
        if (res.status === 401) redirect();
        else {
          setOpen(true);
          if (res.status === 200) clearTextFields();
        }
        return res.json();
      })
      .then((json) => {
        if (json) {
          updateAppSettings(json.token || "");
          setMessage(json.message || "");
        }
      })
      .catch((err) => console.log("Error adding pet ", err.message));
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="AddPet">
      <AppHeader tabValue={2} />
      {!showPage && <div />}
      {showPage && (
      <Grid container direction="column" alignItems="center">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom>
            Add New Pet!
            <span role="img" aria-label="pets">
              📘
            </span>
          </Typography>
        </Grid>
        <Grid item style={{ marginBottom: "5vh" }}>
          <TextField
            id="petname-input"
            variant="outlined"
            label="name"
            value={pet}
            onChange={(e) => onChangePetName(e.target.value)}
          />
        </Grid>
        <Grid item style={{ marginBottom: "5vh" }}>
          <TextField
            id="pettype-input"
            variant="outlined"
            label="type"
            value={type}
            onChange={(e) => onChangePetType(e.target.value)}
          />
        </Grid>
        <Grid item style={{ marginBottom: "5vh" }}>
          <TextField
            id="petgender-input"
            variant="outlined"
            label="gender"
            value={gender}
            onChange={(e) => onChangePetGender(e.target.value)}
            />
        </Grid>
        <Grid item style={{ marginBottom: "5vh" }}>
          <TextField
            id="petbreed-input"
            variant="outlined"
            label="breed"
            value={breed}
            onChange={(e) => onChangePetBreed(e.target.value)}
            />
        </Grid>
        <Grid item style={{ marginBottom: "7vh" }}>
          <Button
            aria-label="login"
            variant="contained"
            size="large"
            color="primary"
            onClick={onClick}
          >
            ADD PET
          </Button>
        </Grid>
        <Grid>
          <Snackbar
            open={open}
            message={message}
            autoHideDuration={2000}
            onClose={handleClose}
          />
        </Grid>
      </Grid>
      )}
    </div>
  );
};
