import React, { createContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";

export const initialState = {
  adopters: [],
  favorites: [],
  fosters: [],
  loading: true,
  openDialog: false,
  rescueDetails: null,
  rescues: [],
  veterinarians: [],
  users: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case "setAdopters":
      return { ...state, adopters: action.value, loading: false };
    case "setFosters":
      return { ...state, fosters: action.value, loading: false };
    case "setRescues":
      return { ...state, rescues: action.value, loading: false };
    case "setRescueDetails":
      return { ...state, rescueDetails: action.value, loading: false };
    case "setUsers":
      return { ...state, users: action.value, loading: false };
    case "setVeterinarians":
      return { ...state, veterinarians: action.value, loading: false };
    case "setFavorites":
      return { ...state, favorites: action.value, loading: false };
    case "addToFavorites":
      return {
        ...state,
        rescues: state.rescues.map((rescue) =>
          rescue.id === action.id ? { ...rescue, isFavorite: true } : rescue,
        ),
      };
    case "removeFromFavorites":
      return {
        ...state,
        rescues: state.rescues.map((rescue) =>
          rescue.id === action.id ? { ...rescue, isFavorite: false } : rescue,
        ),
        favorites: state.favorites.filter(
          (favoriteId) => favoriteId !== action.id,
        ),
      };
    case "setLoading":
      return { ...state, loading: action.value };
    case "openDialog":
      return { ...state, openDialog: true };
    case "closeDialog":
      return { ...state, openDialog: false };
    default:
      throw new Error();
  }
}

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
