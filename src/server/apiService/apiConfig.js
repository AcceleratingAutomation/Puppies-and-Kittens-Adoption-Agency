const baseEnvUrl = require("../../utils/baseEnvironmentUrls");

const baseServerUrl =
  process.env.REACT_APP_ENV === "production"
    ? baseEnvUrl.production.api
    : baseEnvUrl.local.api;
const adminAddEndpoint = "/v1/admins/add";
const adminDetailsEndpoint = "/v1/admins/:id";
const adminEditEndpoint = "/v1/admins/:id/edit";
const adminsEndpoint = "/v1/admins";
const adopterAddEndpoint = "/v1/adopters/add";
const adopterDetailsEndpoint = "/v1/adopters/:id";
const adopterEditEndpoint = "/v1/adopters/:id/edit";
const adoptersEndpoint = "/v1/adopters";
const favoritesEndpoint = "/v1/favorites";
const fosterAddEndpoint = "/v1/fosters/add";
const fosterDetailsEndpoint = "/v1/fosters/:id";
const fosterEditEndpoint = "/v1/fosters/:id/edit";
const fostersEndpoint = "/v1/fosters";
const loginEndpoint = "/v1/login";
const logoutEndpoint = "/v1/logout";
const rescueAddEndpoint = "/v1/rescues/add";
const rescueDetailsEndpoint = "/v1/rescues/:id";
const rescueEditEndpoint = "/v1/rescues/:id/edit";
const rescuesEndpoint = "/v1/rescues";
const veterinarianAddEndpoint = "/v1/veterinarians/add";
const veterinarianDetailsEndpoint = "/v1/veterinarians/:id";
const veterinarianEditEndpoint = "/v1/veterinarians/:id/edit";
const veterinariansEndpoint = "/v1/veterinarians";
const adminsUrl = `${baseServerUrl}${adminsEndpoint}`;
const adoptersUrl = `${baseServerUrl}${adoptersEndpoint}`;
const favoritesUrl = `${baseServerUrl}${favoritesEndpoint}`;
const fostersUrl = `${baseServerUrl}${fostersEndpoint}`;
const loginUrl = `${baseServerUrl}${loginEndpoint}`;
const logoutUrl = `${baseServerUrl}${logoutEndpoint}`;
const rescuesUrl = `${baseServerUrl}${rescuesEndpoint}`;
const veterinariansUrl = `${baseServerUrl}${veterinariansEndpoint}`;

module.exports = {
  baseServerUrl,
  adminAddEndpoint,
  adminDetailsEndpoint,
  adminEditEndpoint,
  adminsEndpoint,
  adopterAddEndpoint,
  adopterDetailsEndpoint,
  adopterEditEndpoint,
  adoptersEndpoint,
  favoritesEndpoint,
  fosterAddEndpoint,
  fosterDetailsEndpoint,
  fosterEditEndpoint,
  fostersEndpoint,
  loginEndpoint,
  logoutEndpoint,
  rescueAddEndpoint,
  rescueDetailsEndpoint,
  rescueEditEndpoint,
  rescuesEndpoint,
  veterinarianAddEndpoint,
  veterinarianDetailsEndpoint,
  veterinarianEditEndpoint,
  veterinariansEndpoint,
  adminsUrl,
  adoptersUrl,
  favoritesUrl,
  fostersUrl,
  loginUrl,
  logoutUrl,
  rescuesUrl,
  veterinariansUrl,
};
