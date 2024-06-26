require("dotenv").config({ path: "./variables.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const RateLimit = require("express-rate-limit");

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
  baseServerUrl,
} = require("./apiService/apiConfig");

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// set up rate limiter
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // max 10000 requests per windowMs
});

// Apply the rate limiter to all requests
app.use(limiter);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Puppies and Kittens Adoption and Rescue API",
      version: "1.0.0",
      description: "API for managing puppy and kitten rescues",
    },
    servers: [
      {
        url: baseServerUrl,
      },
    ],
    components: {
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "basic",
        },
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        basicAuth: [],
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

app.use("", authenticationRouter);
app.use(adminsEndpoint, adminsRouter);
app.use(adoptersEndpoint, adoptersRouter);
app.use(favoritesEndpoint, favoritesRouter);
app.use(fostersEndpoint, fostersRouter);
app.use(rescuesEndpoint, rescuesRouter);
app.use(veterinariansEndpoint, veterinariansRouter);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).send(`Server is running OK`);
});

module.exports = app;
