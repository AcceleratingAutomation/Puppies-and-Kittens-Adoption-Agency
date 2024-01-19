import { constructHeader } from '../../utils/utils';
import { favoritesUrl } from './apiConfig';

export const addFavorite = async (id) => {
  const response = await fetch(`${favoritesUrl}/${id}`, {
    method: 'POST',
    headers: constructHeader(),
  });
  return response.status === 200;
};

export const checkFavorite = async (id) => {
  const response = await fetch(`${favoritesUrl}`, {
    headers: constructHeader(),
  });
  if (response.ok) {
    const data = await response.json();
    return data.favorites.some(rescue => rescue.id === id);
  }
  return false;
};

export const removeFavorite = async (id) => {
  const response = await fetch(`${favoritesUrl}/${id}`, {
    method: 'DELETE',
    headers: constructHeader(),
  });
  return response.status === 200;
};