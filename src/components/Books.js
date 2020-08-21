import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { updateAppSettings } from "../util";
import { useHistory } from "react-router-dom";
const url = "http://localhost:5000/books";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(url, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.clear();
          history.push("/login");
        } else return res.json();
      })
      .then((json) => {
        updateAppSettings(json.token);
        if (json) setBooks([...json.books]);
      })
      .catch((err) => console.log("Error fetching books ", err.message));
  }, []);

  return (
    <div className="Content">
      <AppHeader tabValue={0} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom>
            Curated Books!
            <span role="img" aria-label="books">
              📚
            </span>
          </Typography>
        </Grid>
        <Grid item container justify="center">
          {books.map((book, key) => {
            return (
              <Book
                key={key}
                name={book.name}
                id={book.id}
                author={book.author}
                color={book.color}
                onClick={() => console.log("My Favorite")}
              />
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

const Book = ({ name, id, author, onClick }) => {
  return (
    <Paper elevation={2} className="Book">
      <Grid container direction="column">
        <Grid item xs={12}>
          <Typography variant="h6">{name}</Typography>
        </Grid>
        <Typography variant="subtitle1" gutterBottom>
          {author}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => onClick(id)}
        >
          ADD TO FAVORITES
        </Button>
      </Grid>
    </Paper>
  );
};
