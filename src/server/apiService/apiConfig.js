const baseServerUrl = "http://localhost:5000";
const adopterDetailsEndpoint = "/v1/adopters/:id";
const adoptersEndpoint = "/v1/adopters";
const favoritesEndpoint = "/v1/favorites";
const fosterDetailsEndpoint = "/v1/fosters/:id";
const fostersEndpoint = "/v1/fosters";
const loginEndpoint = "/v1/login";
const logoutEndpoint = "/v1/logout";
const rescueDetailsEndpoint = "/v1/rescues/:id";
const rescuesEndpoint = "/v1/rescues";
const userDetailsEndpoint = "/v1/admins/:id";
const adminsEndpoint = "/v1/admins";
const veterinarianDetailsEndpoint = "/v1/veterinarians/:id";
const veterinariansEndpoint = "/v1/veterinarians";
const adoptersUrl = `${baseServerUrl}${adoptersEndpoint}`;
const favoritesUrl = `${baseServerUrl}${favoritesEndpoint}`;
const fostersUrl = `${baseServerUrl}${fostersEndpoint}`;
const loginUrl = `${baseServerUrl}${loginEndpoint}`;
const logoutUrl = `${baseServerUrl}${logoutEndpoint}`;
const rescuesUrl = `${baseServerUrl}${rescuesEndpoint}`;
const adminsUrl = `${baseServerUrl}${adminsEndpoint}`;
const veterinariansUrl = `${baseServerUrl}${veterinariansEndpoint}`;

module.exports = {
  adopterDetailsEndpoint,
  adoptersEndpoint,
  favoritesEndpoint,
  fosterDetailsEndpoint,
  fostersEndpoint,
  loginEndpoint,
  logoutEndpoint,
  rescueDetailsEndpoint,
  rescuesEndpoint,
  userDetailsEndpoint,
  adminsEndpoint,
  veterinarianDetailsEndpoint,
  veterinariansEndpoint,
  adoptersUrl,
  favoritesUrl,
  fostersUrl,
  loginUrl,
  logoutUrl,
  rescuesUrl,
  adminsUrl,
  veterinariansUrl,
};
