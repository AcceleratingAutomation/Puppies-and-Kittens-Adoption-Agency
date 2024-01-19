import React, { useReducer, useEffect, useCallback } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import { AppHeader } from "../header/AppHeader";
import { isMember, updateAppSettings } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import { tabs } from "../header/AppHeader";
import { usersUrl } from '../../server/api/apiConfig';
import { fetchData } from '../../server/api/cardApi';
import UserCard from "./UserCard";

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
    fetchData(usersUrl)
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
              Application Users
            </Typography>
          </Grid>
          <Grid item container justify="center">
            {state.users.map((user) => {
              return (
                <UserCard
                  key={user.id}
                  image={user.image}
                  username={user.username}
                  role={user.role}
                  favorite={user.favorite}
                />
              );
            })}
          </Grid>
        </Grid>
      )}
    </div>
  );
};
