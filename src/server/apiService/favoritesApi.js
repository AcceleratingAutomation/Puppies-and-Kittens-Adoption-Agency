import { constructHeader } from '../../utils/utils';
import { favoritesUrl } from './apiConfig';

export const fetchFavorites = async () => {
  const response = await fetch(favoritesUrl, { headers: constructHeader() });
  return response.json();
};

export const removeFavorite = async (id) => {
  const response = await fetch(`${favoritesUrl}/${id}`, {
    method: 'DELETE',
    headers: constructHeader(),
  });
  return response.ok;
};
