import { fetchDetailsApi, deleteDetailsApi } from '../server/apiService/detailsApi';

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

export const deleteDetails = async (url, id, history, dispatch, path) => {
  try {
    if (await deleteDetailsApi(url, id)) {
      dispatch({ type: 'closeDialog' });
      history.push(path);
    }
  } catch (err) {
    throw new Error(`Error deleting ${id} ${err}`);
  }
};

export const navigateBack = (history, path) => {
  history.push(path);
};

export const navigateToEdit = (history, id, path) => {
  history.push(`${path}/${id}/edit`);
};

export function getImageUrl(directory, id) {
  return `/images/${directory}/${id}.webp`;
}
