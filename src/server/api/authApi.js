import base64 from "base-64";
import { loginUrl } from "./apiConfig";
import { constructHeader } from "../../utils/utils";
import { logoutUrl } from "./apiConfig";

let headers = new Headers();

export const login = (username, password) => {
  headers.set(
    "Authorization",
    "Basic " + base64.encode(username + ":" + password),
  );
  return fetch(loginUrl, { headers: headers, method: "POST" })
    .then((res) => res.json())
    .catch((err) => console.log("Error logging into app ", err.message));
};

export const handleLogout = (history) => {
  fetch(logoutUrl, { headers: constructHeader() }).then((res) => {
    localStorage.clear();
    history.push("/v1/login");
  });
};
