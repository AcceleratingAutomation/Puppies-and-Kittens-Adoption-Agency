import React, { useReducer, useEffect } from "react";
import { Grid } from "@material-ui/core";
import "../../styles.css";
import { AppHeader } from "../header/AppHeader";
import { isMember, updateAppSettings } from "../../utils/utils";
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
  const showPage = !isMember();
  const tabValue = tabs.findIndex(tab => tab.label === 'Users');

  useEffect(() => {
    fetchData(usersUrl)
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({ type: 'setUsers', value: [...json.users] });
        }
      })
      .catch((err) => console.log("Error fetching users ", err.message));
  }, []);

  return (
    <div className="Content">
      <AppHeader tabValue={tabValue} />
      {!showPage && <div />}
      {showPage && (
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
      )}
    </div>
  );
};
