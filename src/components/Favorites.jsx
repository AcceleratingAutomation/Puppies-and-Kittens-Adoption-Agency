import React, { useContext, useEffect, useCallback, useState } from "react";
import { Grid } from "@material-ui/core";
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

export default function Favorites() {
  const { state, dispatch } = useContext(FavoritesContext);
  const tabValue = tabs.findIndex((tab) => tab.label === "Favorites");
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
        <Grid item container direction="row" wrap="wrap" justify="center">
          {state.rescues
            .filter((rescue) => state.favorites.includes(rescue.id))
            .slice(page * 20, (page + 1) * 20)
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
