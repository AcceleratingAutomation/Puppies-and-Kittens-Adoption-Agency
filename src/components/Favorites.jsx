import React, { useContext, useEffect, useCallback, useState } from "react";
import { Grid, Typography } from "@mui/material";
import "../styles.css";
import { AppHeader, tabs } from "./header/AppHeader";
import RescueCard from "./rescues/RescueCard";
import { FavoritesContext } from "../contexts/favoritesContext";
import Loading from "./Loading";
import {
  fetchFavorites,
  removeFavorite,
} from "../server/apiService/favoritesApi";
import PaginationButtons from "./PaginationButtons";
import { favoritesText } from "../accessibility/accessibilityText";
import { getTabValue } from "../utils/componentUtils";

export default function Favorites() {
  const { state, dispatch } = useContext(FavoritesContext);
  const tabValue = getTabValue(tabs, favoritesText);
  const [page, setPage] = useState(0);

  const fetchAndSetFavorites = useCallback(async () => {
    const data = await fetchFavorites();
    dispatch({ type: "setRescues", value: data.favorites });
    const favoriteIds = data.favorites.map((favorite) => favorite.id);
    dispatch({ type: "setFavorites", value: favoriteIds });
    dispatch({ type: "setLoading", value: false });
  }, [dispatch]);

  useEffect(() => {
    fetchAndSetFavorites();
  }, [fetchAndSetFavorites]);

  const handleRemoveFavorite = useCallback(
    async (id) => {
      if (await removeFavorite(id)) {
        dispatch({ type: "removeFromFavorites", id });
      } else {
        throw new Error("Failed to delete rescue from favorites");
      }
    },
    [dispatch],
  );

  if (state.loading) {
    return <Loading />;
  }

  return (
    <main className="content">
      <AppHeader tabValue={tabValue} />
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h3">User&apos;s Favorites</Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          wrap="wrap"
          justifyContent="center"
        >
          {state.rescues
            .filter((rescue) => state.favorites.includes(rescue.id))
            .slice(page * 12, (page + 1) * 12)
            .map((rescue) => (
              <RescueCard
                key={rescue.id}
                id={rescue.id}
                image={rescue.image}
                directory={rescue.type.toLowerCase()}
                name={rescue.name}
                type={rescue.type}
                gender={rescue.gender}
                breed={rescue.breed}
                isFavorite
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))}
        </Grid>
        <Grid item>
          <PaginationButtons
            page={page}
            setPage={setPage}
            dataLength={state.favorites.length}
          />
        </Grid>
      </Grid>
    </main>
  );
}
