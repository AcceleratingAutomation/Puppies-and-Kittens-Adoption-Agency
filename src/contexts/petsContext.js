import React, { createContext, useReducer } from 'react';

export const initialState = {
  pets: [],
  favorites: [],
  loading: true,
};

export function reducer(state, action) {
  switch (action.type) {
    case 'setPets':
      return { ...state, pets: action.value, loading: false };
    case 'setFavorites':
      return { ...state, favorites: action.value };
    case 'addToFavorites':
      return {
        ...state,
        pets: state.pets.map(pet =>
          pet.id === action.id ? { ...pet, isFavorite: true } : pet
        ),
      };
      case 'removeFromFavorites':
        return {
          ...state,
          pets: state.pets.map(pet =>
            pet.id === action.id ? { ...pet, isFavorite: false } : pet
          ),
          favorites: state.favorites.filter(favoriteId => favoriteId !== action.id)
        };
    case 'setLoading':
      return { ...state, loading: action.value };
    default:
      throw new Error();
  }
}

export const PetsContext = createContext();

export const PetsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PetsContext.Provider value={{ state, dispatch }}>
      {children}
    </PetsContext.Provider>
  );
};