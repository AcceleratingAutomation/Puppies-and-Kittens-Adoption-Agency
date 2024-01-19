import { constructHeader } from "../../utils/utils";

export const fetchDetails = async (url, id) => {
  const response = await fetch(`${url}/${id}`, { headers: constructHeader() });
  return response.json();
};

export const deleteDetails = async (url, id) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: constructHeader(),
  });
  return response.ok;
};