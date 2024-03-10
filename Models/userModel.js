const db = require("../Config/dbConfig");
const bcrypt = require("bcryptjs");

const User = {};
// No entering here
User.createUser = async (newUser) => {
  try {
    const queryResult = await db.query(
      "INSERT INTO Users (username) VALUES (?)",
      [newUser.username]
    );
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
User.createUserWithPrivilige = async (newUserWithPrivilige) => {
  try {
    await db.query(
      "INSERT INTO UsersWithPrivilige SET ?",
      newUserWithPrivilige
    );
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

User.getAllUsers = async () => {
  try {
    const queryResult = await db.query(`SELECT * FROM Users`);
    return queryResult[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

User.findUserByEmail = async (email) => {

  const data = await db.query(
    `SELECT * FROM UsersWithPrivilige WHERE email = ?`,
    [email]
  );
  return data[0];
};
User.findUserByUsername = async (username) => {
  console.log("Inside find user by id");

  const data = await db.query(`SELECT * FROM Users WHERE username = ?`, [
    username,
  ]);
  console.log(data[0]);
  return data[0];
};
User.findUserById = async (id) => {
  const data = await db.query(`SELECT * FROM Users WHERE id = ?`, [id]);
  console.log(data[0]);
  return data[0];
};

module.exports = User;
