import { constructHeader } from "../../utils";
import { favoritesUrl, rescueDetailsUrl } from "./apiConfig";

export const fetchRescueDetails = async (id) => {
  const response = await fetch(`${rescueDetailsUrl}/${id}`, { headers: constructHeader() });
  return response.json();
};

export const deleteRescue = async (id) => {
  const response = await fetch(`${rescueDetailsUrl}/${id}`, {
    method: 'DELETE',
    headers: constructHeader(),
  });
  return response.ok;
};

export const deleteFavorite = async (id) => {
  const response = await fetch(`${favoritesUrl}/${id}`, {
    method: 'DELETE',
    headers: constructHeader(),
  });
  return response.ok;
};