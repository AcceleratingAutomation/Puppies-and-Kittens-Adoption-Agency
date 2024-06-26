const jwtDecode = require("jwt-decode");

export const updateAppSettings = (token) => {
  localStorage.clear();
  if (token) {
    localStorage.setItem("displayName", jwtDecode(token).sub);
    localStorage.setItem("token", token);
  }
};

export function getToken() {
  return localStorage.getItem("token");
}

// export const isMember = () => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     const audience = jwtDecode(token).aud;
//     return !audience.includes('SHOW_ADMINS') && !audience.includes('ADD_RESCUE');
//   }
// };

export const constructHeader = (contentType) => {
  const auth = `Bearer ${localStorage.getItem("token")}` || "";
  return contentType
    ? { "Content-type": contentType, Authorization: auth }
    : { Authorization: auth };
};
