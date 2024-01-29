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

const createHandlers = (type, db, permissions) => {
  return {
    getAll: (req, res) => {
      const token = req.headers.authorization.split(" ")[1];
      if (getAudienceFromToken(token).includes(permissions.read)) {
        getAllData(db).then((data) => {
          if (data && data.length > 0) {
            generateToken(token, null).then((token) => {
              res.status(200).send({ [type]: data, token: token });
            });
          } else res.status(500).send({ [type]: [], token: token });
        });
      } else {
        res
          .status(403)
          .send({ message: `Not authorized to view ${type}`, token: token });
      }
    },

    delete: (req, res) => {
      const token = req.headers.authorization.split(" ")[1];
      if (getAudienceFromToken(token).includes(permissions.delete)) {
        deleteData(req.params.id, db).then((err) => {
          if (err)
            res.status(500).send({ message: `Cannot delete this ${type}` });
          else {
            generateToken(token, null).then((token) => {
              res.status(200).send({
                message: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`,
                token: token,
              });
            });
          }
        });
      } else
        res.status(403).send({
          message: `Not authorized to delete a ${type}`,
          token: token,
        });
    },

    getDetails: (req, res) => {
      const token = req.headers.authorization.split(" ")[1];
      if (getAudienceFromToken(token).includes(permissions.showDetails)) {
        getDetails(req.params.id, db)
          .then((data) => {
            if (!data || Object.keys(data).length === 0) {
              res
                .status(404)
                .send({ message: `Cannot get details for this ${type}` });
            } else {
              generateToken(token, null).then((newToken) => {
                res.status(200).send({ [type]: data, token: newToken });
              });
            }
          })
          .catch((err) => {
            console.error(err);
            res
              .status(500)
              .send({ message: `Error retrieving ${type} details` });
          });
      } else {
        res.status(403).send({
          message: `Not authorized to view ${type} details`,
          token: token,
        });
      }
    },
  };
};

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
