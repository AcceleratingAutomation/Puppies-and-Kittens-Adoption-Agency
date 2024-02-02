import React, { useContext, useEffect, useCallback, useMemo } from "react";
import { Grid } from "@material-ui/core";
import "../../styles.css";
import { AppHeader, tabs } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
import RescueCard from "./RescueCard";
import { FavoritesContext } from "../../contexts/favoritesContext";
import Loading from "../Loading";
import {
  addFavorite,
  checkFavorite,
  removeFavorite,
} from "../../server/apiService/rescuesApi";
import { rescuesUrl } from "../../server/apiService/apiConfig";
import fetchData from "../../server/apiService/cardApi";

export default function Rescues() {
  const { state, dispatch } = useContext(FavoritesContext);
  const tabValue = tabs.findIndex((tab) => tab.label === "Rescues");

  useEffect(() => {
    fetchData(rescuesUrl)
      .then((json) => {
        updateAppSettings(json.token);
        dispatch({ type: "setRescues", value: [...json.rescues] });
      })
      .catch((err) => {
        throw new Error(`Error fetching rescues: ${err.message}`);
      });
  }, [dispatch]);

  const onAddFavorite = useCallback(
    async (id) => {
      if (await addFavorite(id)) {
        dispatch({
          type: "addToFavorites",
          id,
        });
      } else {
        throw new Error("Failed to add rescue to favorites");
      }
    },
    [dispatch],
  );

  const inFavorites = useCallback(checkFavorite, []);

  useEffect(() => {
    // Call inFavorites for each rescue and update favorites when the Promises resolve
    Promise.all(
      state.rescues.map(async (rescue) => {
        const isFavorite = await inFavorites(rescue.id);
        return isFavorite ? rescue.id : null;
      }),
    ).then((favorites) => {
      const favoriteIds = favorites.filter((id) => id !== null);
      dispatch({ type: "setFavorites", value: favoriteIds });
    });
  }, [state.rescues, inFavorites, dispatch]);

  const onRemoveFavorite = useCallback(
    async (id) => {
      if (await removeFavorite(id)) {
        dispatch({
          type: "removeFromFavorites",
          id,
        });
      } else {
        throw new Error("Failed to remove rescue from favorites");
      }
    },
    [dispatch],
  );

  const rescues = useMemo(
    () =>
      state.rescues.map((rescue) => (
        <RescueCard
          key={rescue.id}
          name={rescue.name}
          id={rescue.id}
          type={rescue.type}
          gender={rescue.gender}
          breed={rescue.breed}
          onAddFavorite={onAddFavorite}
          onRemoveFavorite={onRemoveFavorite}
          isFavorite={state.favorites.includes(rescue.id)}
        />
      )),
    [state.rescues, state.favorites, onAddFavorite, onRemoveFavorite],
  );

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="Content">
      <AppHeader tabValue={tabValue} />
      <Grid item container justify="center">
        {rescues}
      </Grid>
    </div>
  );
}
