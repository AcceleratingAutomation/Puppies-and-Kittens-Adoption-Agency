const {
  getDetails,
  getAllData,
  getAudienceFromToken,
  generateToken,
  deleteData,
  rescuesDB,
  adoptersDB,
  fostersDB,
  veterinariansDB,
  usersDB,
} = require("../shared");
const Constants = require("../constants");

const createHandlers = (type, db, permissions) => ({
  getAll: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
      if (getAudienceFromToken(token).includes(permissions.read)) {
        const data = await getAllData(db);
        if (data && data.length > 0) {
          const newToken = await generateToken(token, null);
          res.status(200).send({ [type]: data, token: newToken });
        } else {
          res.status(500).send({ [type]: [], token });
        }
      } else {
        res
          .status(403)
          .send({ message: `Not authorized to view ${type}`, token });
      }
    } catch (error) {
      res.status(500).send({ error: "Database error" });
    }
  },

  delete: (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    return new Promise((resolve, reject) => {
      if (getAudienceFromToken(token).includes(permissions.delete)) {
        deleteData(req.params.id, db)
          .then((result) => {
            if (result === true) {
              generateToken(token, null)
                .then((newToken) => {
                  res.status(200).send({
                    message: `Successfully deleted ${type}`,
                    token: newToken,
                  });
                  resolve();
                })
                .catch(reject);
            } else {
              res.status(404).send({ message: `Cannot delete this ${type}` });
              resolve();
            }
          })
          .catch(reject);
      } else {
        res
          .status(403)
          .send({ message: `Not authorized to delete ${type}`, token });
        resolve();
      }
    });
  },

  getDetails: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
      if (getAudienceFromToken(token).includes(permissions.showDetails)) {
        const data = await getDetails(req.params.id, db);
        if (!data || Object.keys(data).length === 0) {
          res
            .status(404)
            .send({ message: `Cannot get details for this ${type}` });
        } else {
          const newToken = await generateToken(token, null);
          res.status(200).send({ [type]: data, token: newToken });
        }
      } else {
        res.status(403).send({
          message: `Not authorized to view ${type} details`,
          token,
        });
      }
    } catch (error) {
      res.status(500).send({ error: "Database error" });
    }
  },
});

exports.adopterHandlers = createHandlers("adopters", adoptersDB, {
  read: Constants.SHOW_ADOPTERS,
  delete: Constants.DELETE_ADOPTER,
  showDetails: Constants.SHOW_ADOPTER_DETAILS,
});
exports.fosterHandlers = createHandlers("fosters", fostersDB, {
  read: Constants.SHOW_FOSTERS,
  delete: Constants.DELETE_FOSTER,
  showDetails: Constants.SHOW_FOSTER_DETAILS,
});
exports.rescueHandlers = createHandlers("rescues", rescuesDB, {
  read: Constants.SHOW_RESCUES,
  delete: Constants.DELETE_RESCUE,
  showDetails: Constants.SHOW_RESCUE_DETAILS,
});
exports.userHandlers = createHandlers("users", usersDB, {
  read: Constants.SHOW_USERS,
  delete: Constants.DELETE_USER,
  showDetails: Constants.SHOW_USER_DETAILS,
});
exports.veterinarianHandlers = createHandlers(
  "veterinarians",
  veterinariansDB,
  {
    read: Constants.SHOW_VETERINARIANS,
    delete: Constants.DELETE_VETERINARIAN,
    showDetails: Constants.SHOW_VETERINARIAN_DETAILS,
  },
);
