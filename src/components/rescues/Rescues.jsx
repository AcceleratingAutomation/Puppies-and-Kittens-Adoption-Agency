import React, {
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Grid, Typography } from "@mui/material";
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
import PaginationButtons from "../PaginationButtons";
import { rescuesText } from "../../accessibility/accessibilityText";
import { getTabValue } from "../../utils/componentUtils";
import NotFound from "../NotFound";

export default function Rescues() {
  const { state, dispatch } = useContext(FavoritesContext);
  const [page, setPage] = useState(0);
  const tabValue = getTabValue(tabs, rescuesText);

  useEffect(() => {
    fetchData(rescuesUrl)
      .then((json) => {
        updateAppSettings(json.token);
        dispatch({ type: "setRescues", value: [...json.rescues] });
        dispatch({ type: "setError", value: false });
      })
      .catch((err) => {
        dispatch({ type: "setError", value: err });
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
      state.rescues
        .slice(page * 12, (page + 1) * 12) // Only show the rescues for the current page
        .map((rescue) => (
          <RescueCard
            key={rescue.id}
            name={rescue.name}
            id={rescue.id}
            image={rescue.image}
            type={rescue.type}
            gender={rescue.gender}
            breed={rescue.breed}
            onAddFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
            isFavorite={state.favorites.includes(rescue.id)}
          />
        )),
    [state.rescues, state.favorites, onAddFavorite, onRemoveFavorite, page],
  );

  if (state.error) {
    return <NotFound />;
  }

  if (state.loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="content">
        <AppHeader tabValue={tabValue} />
        <Grid item container justifyContent="center">
          <Grid item>
            <Typography variant="h3">Available Rescues</Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            wrap="wrap"
            justifyContent="center"
          >
            {rescues}
          </Grid>
        </Grid>
      </div>
      <PaginationButtons
        page={page}
        setPage={setPage}
        dataLength={state.rescues.length}
      />
    </>
  );
}
