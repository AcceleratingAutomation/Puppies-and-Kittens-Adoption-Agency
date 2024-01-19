import React, { createContext, useReducer } from 'react';

export const initialState = {
  rescues: [],
  favorites: [],
  loading: true,
};

export function reducer(state, action) {
  switch (action.type) {
    case 'setRescues':
      return { ...state, rescues: action.value, loading: false };
    case 'setFavorites':
      return { ...state, favorites: action.value };
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