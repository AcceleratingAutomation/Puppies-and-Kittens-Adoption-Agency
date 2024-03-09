const jsonfile = require("jsonfile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const Constants = require("./constants");

// Define database paths
const usersDB = "./database/users.json";
const rescuesDB = "./database/rescues.json";

// Export database paths
exports.usersDB = usersDB;
exports.rescuesDB = rescuesDB;

// Define helper functions
const getUsernameFromToken = (token) => {
  if (!token) {
    throw new Error("Token is not provided");
  }

  const decodedToken = jwt.decode(token);
  if (!decodedToken) {
    throw new Error("Token is not valid");
  }

  return decodedToken.sub;
};

const getUserByUsername = async (username) => {
  try {
    const allUsers = await jsonfile.readFile(usersDB);
    const filteredUserArray = allUsers.filter(
      (user) => user.username === username,
    );
    return filteredUserArray.length === 0 ? {} : filteredUserArray[0];
  } catch (err) {
    // Removed console.log statement
    throw new Error(`Error reading users: ${err.message}`);
  }
};

// Export helper functions
exports.getUserByUsername = getUserByUsername;

// common

exports.getAllData = async (db) => {
  try {
    return await jsonfile.readFile(db);
  } catch (err) {
    throw new Error(`Error reading data from ${db}: ${err}`);
  }
};

exports.getAllDataByType = async (db, dbType) => {
  try {
    const allData = await jsonfile.readFile(db);
    return allData.filter((data) => data.type === dbType);
  } catch (err) {
    throw new Error(`Error reading data from ${db}: ${err}`);
  }
};

exports.getDetails = async (id, db) => {
  try {
    const allData = await jsonfile.readFile(db);
    const filteredDataArray = allData.filter((data) => data.id === id);
    return filteredDataArray.length === 0 ? {} : filteredDataArray[0];
  } catch (err) {
    // Removed console.log statement
    throw new Error(`Error reading data: ${err.message}`);
  }
};

exports.deleteData = (id, db) =>
  new Promise((resolve, reject) => {
    // Read the existing data
    fs.readFile(path.join(__dirname, db), "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const items = JSON.parse(data);

      // Find the item with the given id
      const itemIndex = items.findIndex((item) => item.id === id);
      if (itemIndex === -1) {
        resolve(false); // Resolve with false when item is not found
        return;
      }

      // Remove the item from the array
      items.splice(itemIndex, 1);

      // Write the updated items back to the file
      fs.writeFile(
        path.join(__dirname, db),
        JSON.stringify(items, null, 2),
        "utf8",
        (deleteErr) => {
          if (deleteErr) {
            reject(deleteErr);
            return;
          }

          resolve(true); // Resolve with true when deletion is successful
        },
      );
    });
  });

// Favorites

exports.getFavoriteRescuesForUser = async (token) => {
  try {
    const username = getUsernameFromToken(token);
    const user = await getUserByUsername(username);
    const favoriteRescueIds = user.favorite;
    const favoriteRescues = [];
    if (favoriteRescueIds.length === 0) return favoriteRescues;
    const allRescues = await jsonfile.readFile(rescuesDB);
    favoriteRescueIds.forEach((id) =>
      favoriteRescues.push(allRescues.filter((rescue) => id === rescue.id)[0]),
    );
    return favoriteRescues;
  } catch (err) {
    // Removed console.log statement
    throw new Error(`Error getting favorite rescues for user: ${err.message}`);
  }
};

exports.addFavoriteRescue = async (token, rescueId) => {
  try {
    // Get the username from the token
    const username = getUsernameFromToken(token);

    // Get the user by username
    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }

    // Read the existing users
    const data = await fs.promises.readFile(
      path.join(__dirname, usersDB),
      "utf8",
    );
    const users = JSON.parse(data);

    // Get the user index by username
    const userIndex = users.findIndex(
      (foundUser) => foundUser.username === username,
    );

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    // Ensure the user has a favorites array
    if (!Array.isArray(users[userIndex].favorite)) {
      users[userIndex].favorite = [];
    }

    // Add the rescue to the user's favorites
    users[userIndex].favorite.push(rescueId);

    // Write the updated users back to the file
    await fs.promises.writeFile(
      path.join(__dirname, usersDB),
      JSON.stringify(users, null, 2),
      "utf8",
    );
  } catch (err) {
    throw new Error(`Error adding favorite rescue: ${err.message}`);
  }
};

exports.deleteFavorite = (token, rescueId) =>
  new Promise((resolve, reject) => {
    const username = getUsernameFromToken(token);

    const usersPath = path.join(__dirname, usersDB);
    const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));

    const foundUser = users.find((u) => u.username === username);
    if (!foundUser) {
      throw new Error("User not found");
    }

    foundUser.favorite = foundUser.favorite.filter(
      (favorite) => favorite !== rescueId,
    );

    fs.writeFile(usersPath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(foundUser.favorite);
      }
    });
  });

// Rescues

// Adopters

// Fosters

// Veterinarians

// Users

exports.getAllUsers = async () => {
  try {
    const allUsers = await jsonfile.readFile(usersDB);
    const updatedUsers = [];
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
    // Removed console.log statement
    throw new Error(`Error reading users from datastore: ${err.message}`);
  }
};

// Login

exports.isEmptyObject = (object) => Object.entries(object).length === 0;

exports.isPasswordCorrect = async (key, password) => {
  try {
    return await bcrypt.compare(password, key);
  } catch (err) {
    throw new Error(`Error comparing passwords: ${err.message}`);
  }
};

exports.getAudienceFromToken = (token) => jwt.decode(token).aud;

exports.generateToken = async (prevToken, userName) => {
  try {
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
  } catch (err) {
    throw new Error(`Error generating token: ${err.message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization)
    res.status(401).send({ message: "Not authorized to access data" });
  else {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      res.status(401).send({ message: "Not Authorized to access data" });
    else {
      jwt.verify(token, process.env.SECRET, (err) => {
        if (err) {
          res.status(401).send({ message: "Please login again" });
        } else next();
      });
    }
  }
};
