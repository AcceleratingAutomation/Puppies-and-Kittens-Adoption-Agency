import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import '../../styles.css';
import { AppHeader, tabs } from '../header/AppHeader';
import { updateAppSettings } from '../../utils/utils';
import { usersUrl } from '../../server/apiService/apiConfig';
import fetchData from '../../server/apiService/cardApi';
import UserCard from './UserCard';
import { FavoritesContext } from '../../contexts/favoritesContext';
import Loading from '../Loading';

export default function Users() {
  const { state, dispatch } = useContext(FavoritesContext);
  const tabValue = tabs.findIndex((tab) => tab.label === 'Users');
  const showPage = true; // Define the 'showPage' variable

  useEffect(() => {
    fetchData(usersUrl)
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({ type: 'setUsers', value: [...json.users] });
        }
      })
      .catch((err) => { throw new Error(`Error fetching users ${err.message}`); });
  }, [dispatch]);

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="Content">
      <AppHeader tabValue={tabValue} />
      {!showPage && <div />}
      {showPage && (
        <Grid item container justify="center">
          {state.users.map((user) => (
            <UserCard
              key={user.id}
              image={user.image}
              email={user.email}
              username={user.username}
              role={user.role}
              favorite={user.favorite}
            />
          ))}
        </Grid>
      )}
    </div>
  );
}
