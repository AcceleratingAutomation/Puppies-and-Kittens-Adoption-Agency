import { constructHeader } from "../../utils/utils";
import { favoritesUrl } from "./apiConfig";

export const deleteFavorite = async (id) => {
  const response = await fetch(`${favoritesUrl}/${id}`, {
    method: "DELETE",
    headers: constructHeader(),
  });
  return response.ok;
};
