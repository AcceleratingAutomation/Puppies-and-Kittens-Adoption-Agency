require("dotenv").config({ path: "./variables.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const favoritesRouter = require("./routes/favorites");
const rescuesRouter = require("./routes/rescues");
const adoptersRouter = require("./routes/adopters");
const fostersRouter = require("./routes/fosters");
const veterinariansRouter = require("./routes/veterinarians");
const usersRouter = require("./routes/users");
const authenticationRouter = require("./routes/authentication");
const {
  favoritesEndpoint,
  rescuesEndpoint,
  adoptersEndpoint,
  fostersEndpoint,
  veterinariansEndpoint,
  usersEndpoint,
} = require("./apiService/apiConfig");

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use(favoritesEndpoint, favoritesRouter);
app.use(rescuesEndpoint, rescuesRouter);
app.use(adoptersEndpoint, adoptersRouter);
app.use(fostersEndpoint, fostersRouter);
app.use(veterinariansEndpoint, veterinariansRouter);
app.use(usersEndpoint, usersRouter);
app.use("/v1", authenticationRouter);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).send(`Server is running OK`);
});

module.exports = app;
