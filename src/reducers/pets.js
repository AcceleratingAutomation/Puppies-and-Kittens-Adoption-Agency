export const initialState = {
    pets: [],
    favorites: [],
};

export function reducer(state, action) {
    switch (action.type) {
        case 'setPets':
            return { ...state, pets: action.value };
        case 'setFavorites':
            return { ...state, favorites: action.value };
        case 'addToFavorites':
            return {
                ...state,
                pets: state.pets.map(pet =>
                    pet.id === action.id ? { ...pet, isFavorite: true } : pet
                )
            };
        case 'removeFromFavorites':
            return {
                ...state,
                pets: state.pets.map(pet =>
                    pet.id === action.id ? { ...pet, isFavorite: false } : pet
                )
            };
        default:
            throw new Error();
    }
}