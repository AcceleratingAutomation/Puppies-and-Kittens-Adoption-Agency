module.exports.JWT_OPTIONS = {
  MEMBER_AUDIENCE: ["SHOW_FAVORITE", "LOGIN", "SHOW_PETS"],
  ADMIN_AUDIENCE: [
    "SHOW_FAVORITE",
    "LOGIN",
    "SHOW_PETS",
    "ADD_PET",
    "DELETE_PET",
    "SHOW_USERS",
  ],
};

module.exports.ADD_PET = "ADD_PET";
module.exports.DELETE_PET = "DELETE_PET";
module.exports.SHOW_USERS = "SHOW_USERS";
