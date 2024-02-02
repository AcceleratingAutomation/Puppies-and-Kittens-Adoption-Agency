import base64 from "base-64";
import { loginUrl, logoutUrl } from "./apiConfig";
import { constructHeader } from "../../utils/utils";

const headers = new Headers();

export const login = (username, password) => {
  headers.set(
    "Authorization",
    `Basic ${base64.encode(`${username}:${password}`)}`,
  );
  return fetch(loginUrl, { headers, method: "POST" })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(`Error logging into app ${err.message}`);
    });
};

export const handleLogout = (history) => {
  fetch(logoutUrl, { headers: constructHeader() }).then(() => {
    localStorage.clear();
    history.push("/v1/login");
  });
};
