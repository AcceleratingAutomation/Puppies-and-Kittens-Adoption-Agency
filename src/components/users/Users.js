import React, { useReducer, useEffect, useCallback } from "react";
import { Avatar, Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import { AppHeader } from "../header/AppHeader";
import { constructHeader, isMember, updateAppSettings } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import { tabs } from "../header/AppHeader";

const url = "http://localhost:5000/v1/users";

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
  const tabValue = tabs.findIndex(tab => tab.label === 'Users');

  const redirect = useCallback(() => {
    localStorage.clear();
    history.push("/v1/login");
  }, [history]);

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
  }, [redirect]);

  return (
    <div className="Content">
      <AppHeader tabValue={tabValue} />
      {!showPage && <div />}
      {showPage && (
        <Grid container justify="center" direction="column" alignItems="center">
          <Grid item style={{ marginBottom: "5vh" }}>
            <Typography variant="h3" gutterBottom>
              Rescue Users!
              <span role="img" aria-label="rescues">
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
