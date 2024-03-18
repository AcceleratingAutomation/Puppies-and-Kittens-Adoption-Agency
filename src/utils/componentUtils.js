import {
  createDetailsApi,
  deleteDetailsApi,
  editDetailsApi,
  fetchDetailsApi,
} from "../server/apiService/detailsApi";

export const fetchDetails = async (url, id, dispatch, setType, name) => {
  try {
    const data = await fetchDetailsApi(url, id);
    dispatch({
      type: setType,
      value: data[name],
    });
  } catch (err) {
    throw new Error(`Error fetching ${name} ${err.message}`);
  }
};

export const createDetails = async (url, values, history, endpoint) => {
  try {
    if (await createDetailsApi(url, values)) {
      history.push(endpoint);
    }
  } catch (err) {
    throw new Error(`Error creating details ${err}`);
  }
};

export const deleteDetails = async (url, id, history, dispatch, path) => {
  try {
    if (await deleteDetailsApi(url, id)) {
      dispatch({ type: "closeDialog" });
      history.push(path);
    }
  } catch (err) {
    throw new Error(`Error deleting ${id} ${err}`);
  }
};

export const editDetails = async (url, id, values, history, endpoint) => {
  try {
    if (await editDetailsApi(url, id, values)) {
      history.push(`${endpoint}/${id}`);
    }
  } catch (err) {
    throw new Error(`Error editing ${id} ${err}`);
  }
};

export const navigateBack = (history, path) => {
  history.push(path);
};

export const navigateToEdit = (history, id, path) => {
  history.push(`${path}/${id}/edit`);
};

export function getImageUrl(directory, imageId) {
  return `/images/${directory}/${imageId}.webp`;
}

export const getTabValue = (tabs, label) =>
  tabs.findIndex((tab) => tab.label === label);
