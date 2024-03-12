require("dotenv").config({ path: "./variables.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const favoritesRouter = require("./routes/favorites");
const rescuesRouter = require("./routes/rescues");
const adoptersRouter = require("./routes/adopters");
const fostersRouter = require("./routes/fosters");
const veterinariansRouter = require("./routes/veterinarians");
const adminsRouter = require("./routes/admins");
const authenticationRouter = require("./routes/authentication");
const {
  adminsEndpoint,
  adoptersEndpoint,
  favoritesEndpoint,
  fostersEndpoint,
  rescuesEndpoint,
  veterinariansEndpoint,
} = require("./apiService/apiConfig");

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use("", authenticationRouter);
app.use(adminsEndpoint, adminsRouter);
app.use(adoptersEndpoint, adoptersRouter);
app.use(favoritesEndpoint, favoritesRouter);
app.use(fostersEndpoint, fostersRouter);
app.use(rescuesEndpoint, rescuesRouter);
app.use(veterinariansEndpoint, veterinariansRouter);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).send(`Server is running OK`);
});

module.exports = app;
