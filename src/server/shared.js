const jsonfile = require("jsonfile");
const usersDB = "./database/users.json";
const petsDB = "./database/pets.json";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Constants = require("./constants");
const fs = require('fs');
const path = require('path');

var getUserByUsername = (exports.getUserByUsername = async function (username) {
  try {
    const allUsers = await jsonfile.readFile(usersDB);
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
    return await jsonfile.readFile(petsDB);
  } catch (err) {
    console.log("Error reading pets: ", err);
  }
};

exports.getAllUsers = async function () {
  try {
    const allUsers = await jsonfile.readFile(usersDB);
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
    const allPets = await jsonfile.readFile(petsDB);
    allPets.push(pet);
    return await jsonfile.writeFile(petsDB, allPets, { spaces: 2 });
  } catch (err) {
    return err;
  }
};

const getUsernameFromToken = (token) => {
  if (!token) {
    throw new Error('Token is not provided');
  }

  const decodedToken = jwt.decode(token);
  if (!decodedToken) {
    throw new Error('Token is not valid');
  }

  return decodedToken["sub"];
};

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
  const allPets = await jsonfile.readFile(petsDB);
  favoritePetIds.forEach((id) =>
    favoritePets.push(allPets.filter((pet) => id === pet.id)[0])
  );
  return favoritePets;
};

exports.addFavoritePet = (token, petId) => {
  return new Promise(async (resolve, reject) => {
    // Get the username from the token
    const username = getUsernameFromToken(token);

    // Get the user by username
    const user = await getUserByUsername(username);
    if (!user) {
      reject(new Error('User not found'));
      return;
    }

    // Read the existing users
    fs.readFile(path.join(__dirname, usersDB), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      let users = JSON.parse(data);

      // Get the user index by username
      const userIndex = users.findIndex(user => user.username === username);
      
      if (userIndex === -1) {
        reject(new Error('User not found'));
        return;
      }

      // Ensure the user has a favorites array
      if (!Array.isArray(users[userIndex].favorite)) {
        users[userIndex].favorite = [];
      }

      // Add the pet to the user's favorites
      users[userIndex].favorite.push(petId);

      // Write the updated users back to the file
      fs.writeFile(path.join(__dirname, usersDB), JSON.stringify(users, null, 2), 'utf8', (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  });
};

exports.deletePet = (id) => {
  return new Promise((resolve, reject) => {
    // Read the existing pets
    fs.readFile(path.join(__dirname, petsDB), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      let pets = JSON.parse(data);

      // Find the pet with the given id
      const petIndex = pets.findIndex(pet => pet.id === id);
      if (petIndex === -1) {
        reject(new Error('Pet not found'));
        return;
      }

      // Remove the pet from the array
      pets.splice(petIndex, 1);

      // Write the updated pets back to the file
      fs.writeFile(path.join(__dirname, petsDB), JSON.stringify(pets, null, 2), 'utf8', (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  });
};

exports.deleteFavorite = (token, petId) => {
  return new Promise((resolve, reject) => {
    const username = getUsernameFromToken(token);

    const usersPath = path.join(__dirname, usersDB);
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

    const user = users.find(user => user.username === username);
    if (!user) {
      throw new Error('User not found');
    }

    user.favorite = user.favorite.filter(favorite => favorite !== petId);

    fs.writeFile(usersPath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(user.favorite);
      }
    });
  });
}