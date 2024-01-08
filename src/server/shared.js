const jsonfile = require("jsonfile");
const users = "./database/users.json";
const inventory = "./database/pets.json";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Constants = require("./constants");

var getUserByUsername = (exports.getUserByUsername = async function (username) {
  try {
    const allUsers = await jsonfile.readFile(users);
    const filteredUserArray = allUsers.filter(
      (user) => user.username === username
    );
    return filteredUserArray.length === 0 ? {} : filteredUserArray[0];
  } catch (err) {
    console.log("Error reading users: ", err.message);
  }
});

exports.isEmptyObject = (object) => Object.entries(object).length === 0;

exports.isPasswordCorrect = async function (key, password) {
  return bcrypt.compare(password, key).then((result) => result);
};

exports.getAllPets = async function () {
  try {
    return await jsonfile.readFile(inventory);
  } catch (err) {
    console.log("Error reading pets: ", err);
  }
};

exports.getAllUsers = async function () {
  try {
    const allUsers = await jsonfile.readFile(users);
    let updatedUsers = [];
    allUsers.forEach((user) => {
      updatedUsers.push({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
    });
    return updatedUsers;
  } catch (err) {
    console.log("Error reading users from datastore ", err.message);
  }
};

exports.addPet = async function (pet) {
  try {
    const allPets = await jsonfile.readFile(inventory);
    allPets.push(pet);
    return await jsonfile.writeFile(inventory, allPets, { spaces: 2 });
  } catch (err) {
    return err;
  }
};

const getUsernameFromToken = (token) => jwt.decode(token)["sub"];

exports.getAudienceFromToken = (token) => jwt.decode(token)["aud"];

exports.generateToken = async function (prevToken, userName) {
  const name = userName || getUsernameFromToken(prevToken);
  const user = await getUserByUsername(name);
  const options = {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.EXPIRY,
    issuer: process.env.ISSUER,
    subject: userName || user.username,
    audience:
      user.role === "admin"
        ? Constants.JWT_OPTIONS.ADMIN_AUDIENCE
        : Constants.JWT_OPTIONS.MEMBER_AUDIENCE,
  };
  return jwt.sign({}, process.env.SECRET, options);
};

exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization)
    res.status(401).send({ message: "Not authorized to access data" });
  else {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      res.status(401).send({ message: "Not Authorized to access data" });
    else {
      jwt.verify(token, process.env.SECRET, function (err) {
        if (err) {
          res.status(401).send({ message: "Please login again" });
        } else next();
      });
    }
  }
};

exports.getFavoritePetsForUser = async function (token) {
  const username = getUsernameFromToken(token);
  const user = await getUserByUsername(username);
  const favoritePetIds = user["favorite"];
  const favoritePets = [];
  if (favoritePetIds.length === 0) return favoritePets;
  const allPets = await jsonfile.readFile(inventory);
  favoritePetIds.forEach((id) =>
    favoritePets.push(allPets.filter((pet) => id === pet.id)[0])
  );
  return favoritePets;
};
