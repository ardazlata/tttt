const UserModel = require("../Models/userModel");
const { createPassword, checkPassword } = require("../utils/password");
const jwt = require("jsonwebtoken");

// kid registration
exports.register = async (req, res) => {
  const { username } = req.body;

  //  no user with such a username in the req.body
  if (!username) {
    return res.status(400).send({ message: "User name must be provided" });
  }

  try {
    // check if this user already in the database
    // test
    console.log("Before first time to db");
    const user = await UserModel.findUserByUsername(username);
    if (user.length) {
      return res.status(409).send({ message: "Username is already in use." });
    }
    console.log("after first time to db");
    const newUserToAdd = {
      username,
    };
    // create user
    await UserModel.createUser(newUserToAdd);
    // create token for the user

    const user2 = await UserModel.findUserByUsername(username);

    const token = jwt.sign({ id: user2[0].id }, process.env.JWT_SECRET);
    res.status(200).json({ ...user2[0], token }); // to look what it looks like at the front
  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while creating the User.",
    });
  }
};

// kid login
exports.login = async (req, res) => {
  const { username } = req.body;

  //  no user with such a username in the req.body
  if (!username) {
    return res.status(400).send({ message: "User name must be provided" });
  }

  try {
    // check if this user already in the database
    const user = await UserModel.findUserByUsername(username);
    if (user.length === 0) {
      return res
        .status(400)
        .send({ message: "No user with this username, please sign up" });
    }
    console.log(user[0]);
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);
    res.status(200).json({ ...user[0], token });
  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while creating the User.",
    });
  }
};

// Teacher signup
exports.signup = async (req, res) => {
  var user = req.body;
  const name = user.name;
  const email = user.email;
  // const team_category = user.team_category;
  // const lat = user.lat;
  // const lot = user.lot;
  const password = user.password;
  // const is_teacher = user.is_teacher;
  const role = "teacher";
  // const country = user.country;
  // const gemsCollected = user.gemsCollected;
  // const points = user.points;
  // var currentDate = new Date();
  //  no user with such a username in the req.body
  if (!email || !password || !name  ) {
    return res.status(400).send({ message: "User data must be provided" });
  }

  try {
    // check if this user already in the database
    // test
    const user = await UserModel.findUserByEmail(email);
    if (user.length) {
      return res.status(409).send({ message: "Email is already in use." });
    }
    console.log("after first time to db");
    const newUserToAdd = {
      name,
      role,
      email,
      password,
    };
    newUserToAdd.password = await createPassword(password);
    // create user
    await UserModel.createUserWithPrivilige(newUserToAdd);
    // create token for the user

    const user2 = await UserModel.findUserByEmail(email);

    const token = jwt.sign({ id: user2[0].id }, process.env.JWT_SECRET);
    res.status(200).json({ ...user2[0], token }); // to look what it looks like at the front
  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while creating the User.",
    });
  }
};
// Teacher login
exports.teacherLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // check email
  try {
    const user = await UserModel.findUserByEmail(email);
    if (user.length === 0) {
      return res
      .status(409)
      .send({ message: "No user with this email, do you want to signup ?" });
    }
    // test password
    const isCorrect = await checkPassword(password, user[0].password);

    if (!isCorrect) {
      return res.status(400).send({ message: "Email or password is wrong" });
    }
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);
    res.status(200).json({ ...user[0], token }); 
  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while creating the User.",
    });
  }
};

