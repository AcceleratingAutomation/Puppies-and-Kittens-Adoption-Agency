const jsonfile = require("jsonfile");
const usersDB = "./database/users.json";
const rescuesDB = "./database/rescues.json";
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

exports.getRescueDetails = async function (id) {
  try {
    const allRescues = await jsonfile.readFile(rescuesDB);
    const filteredRescueArray = allRescues.filter(
      (rescue) => rescue.id === id
    );
    return filteredRescueArray.length === 0 ? {} : filteredRescueArray[0];
  } catch (err) {
    console.log("Error reading rescues: ", err.message);
  }
};

exports.getAllRescues = async function () {
  try {
    return await jsonfile.readFile(rescuesDB);
  } catch (err) {
    console.log("Error reading rescues: ", err);
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

exports.getFavoriteRescuesForUser = async function (token) {
  const username = getUsernameFromToken(token);
  const user = await getUserByUsername(username);
  const favoriteRescueIds = user["favorite"];
  const favoriteRescues = [];
  if (favoriteRescueIds.length === 0) return favoriteRescues;
  const allRescues = await jsonfile.readFile(rescuesDB);
  favoriteRescueIds.forEach((id) =>
    favoriteRescues.push(allRescues.filter((rescue) => id === rescue.id)[0])
  );
  return favoriteRescues;
};

exports.addFavoriteRescue = (token, rescueId) => {
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

      // Add the rescue to the user's favorites
      users[userIndex].favorite.push(rescueId);

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

exports.deleteRescue = (id) => {
  return new Promise((resolve, reject) => {
    // Read the existing rescues
    fs.readFile(path.join(__dirname, rescuesDB), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      let rescues = JSON.parse(data);

      // Find the rescue with the given id
      const rescueIndex = rescues.findIndex(rescue => rescue.id === id);
      if (rescueIndex === -1) {
        reject(new Error('Rescue not found'));
        return;
      }

      // Remove the rescue from the array
      rescues.splice(rescueIndex, 1);

      // Write the updated rescues back to the file
      fs.writeFile(path.join(__dirname, rescuesDB), JSON.stringify(rescues, null, 2), 'utf8', (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  });
};

exports.deleteFavorite = (token, rescueId) => {
  return new Promise((resolve, reject) => {
    const username = getUsernameFromToken(token);

    const usersPath = path.join(__dirname, usersDB);
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

    const user = users.find(user => user.username === username);
    if (!user) {
      throw new Error('User not found');
    }

    user.favorite = user.favorite.filter(favorite => favorite !== rescueId);

    fs.writeFile(usersPath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(user.favorite);
      }
    });
  });
}

exports.addPet = async function (pet) {
  try {
    const allPets = await jsonfile.readFile(rescuesDB);
    allPets.push(pet);
    return await jsonfile.writeFile(rescuesDB, allPets, { spaces: 2 });
  } catch (err) {
    return err;
  }
};