import React, { createContext, useReducer } from 'react';

export const initialState = {
  adopters: [],
  fosters: [],
  rescues: [],
  veterinarians: [],
  users: [],
  rescueDetails: null,
  favorites: [],
  loading: true,
  openDialog: false
};

export function reducer(state, action) {
  switch (action.type) {
    case 'setAdopters':
      return { ...state, adopters: action.value, loading: false };
    case 'setFosters':
      return { ...state, fosters: action.value, loading: false };
    case 'setRescues':
      return { ...state, rescues: action.value, loading: false };
    case 'setUsers':
      return { ...state, users: action.value, loading: false };
    case 'setVeterinarians':
      return { ...state, veterinarians: action.value, loading: false };
    case 'setFavorites':
      return { ...state, favorites: action.value, loading: false };
    case 'addToFavorites':
      return {
        ...state,
        rescues: state.rescues.map(rescue =>
          rescue.id === action.id ? { ...rescue, isFavorite: true } : rescue
        ),
      };
    case 'removeFromFavorites':
      return {
        ...state,
        rescues: state.rescues.map(rescue =>
          rescue.id === action.id ? { ...rescue, isFavorite: false } : rescue
        ),
        favorites: state.favorites.filter(favoriteId => favoriteId !== action.id)
      };
    case 'setLoading':
      return { ...state, loading: action.value };
    default:
      throw new Error();
  }
}

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};