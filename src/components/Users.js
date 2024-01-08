import React, { useReducer, useEffect } from "react";
import { Avatar, Grid, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { constructHeader, isMember, updateAppSettings } from "../util";
import { useHistory } from "react-router-dom";
const url = "http://localhost:5000/users";

const initialState = {
  users: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'setUsers':
      return { ...state, users: action.value };
    default:
      throw new Error();
  }
}

export const Users = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const showPage = !isMember();

  const redirect = () => {
    localStorage.clear();
    history.push("/login");
  };

  useEffect(() => {
    fetch(url, { headers: constructHeader() })
      .then((res) => (res.status === 401 ? redirect() : res.json()))
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({ type: 'setUsers', value: [...json.users] });
        }
      })
      .catch((err) => console.log("Error fetching users ", err.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Content">
      <AppHeader tabValue={3} />
      {!showPage && <div />}
      {showPage && (
        <Grid container justify="center" direction="column" alignItems="center">
          <Grid item style={{ marginBottom: "5vh" }}>
            <Typography variant="h3" gutterBottom>
              Pet Rescue Users!
              <span role="img" aria-label="pets">
                🤓🤠
              </span>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            {state.users.map((user, key) => {
              return (
                <User
                  key={key}
                  userName={user.username}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  role={user.role}
                />
              );
            })}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

const User = ({ firstName, lastName, userName, role }) => {
  return (
    <Grid container direction="column" alignItems="center" className="User">
      <Grid item xs={12}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ padding: "0.7em" }}
        >
          <Avatar style={{ marginRight: "0.5em" }}>
            {firstName.charAt(0)}
          </Avatar>
          <Typography variant="body2" gutterBottom>
            {userName + " (" + role + ") "}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h6" gutterBottom color="primary">
          {firstName + " " + lastName}
        </Typography>
      </Grid>
    </Grid>
  );
};
