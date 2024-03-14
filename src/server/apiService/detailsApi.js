import { constructHeader } from "../../utils/utils";

export const fetchDetailsApi = async (url, id) => {
  const response = await fetch(`${url}/${id}`, { headers: constructHeader() });
  return response.json();
};

export const deleteDetailsApi = async (url, id) => {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: constructHeader(),
  });
  return response.ok;
};

export const editDetailsApi = async (url, id, values) => {
  const response = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      ...constructHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  return response.ok;
};
