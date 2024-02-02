import { constructHeader } from "../../utils/utils";

const fetchData = async (url) => {
  const response = await fetch(url, { headers: constructHeader() });
  if (response.status === 401) {
    throw new Error("Unauthorized");
  }
  return response.json();
};

export default fetchData;
