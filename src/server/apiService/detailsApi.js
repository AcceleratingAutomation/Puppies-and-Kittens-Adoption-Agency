import { constructHeader } from '../../utils/utils';

export const fetchDetailsApi = async (url, id) => {
  const response = await fetch(`${url}/${id}`, { headers: constructHeader() });
  return response.json();
};

export const deleteDetailsApi = async (url, id) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: constructHeader(),
  });
  return response.ok;
};
