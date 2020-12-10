const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { sendErrorMessage } = require("../helpers/sendError");
const AppError = require("../helpers/appErrorClass");
const { sendResponse } = require("../helpers/sendResponse");
const { generateToken } = require("../helpers/jwtAuthentication");
const fileName = path.join(__dirname, "..", "data", "users.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const SignUpUser = (req, res, next) => {
  let newUser = new User(req.body.email, req.body.password);
  //   console.log(newUser);
  users.push(newUser);
  fs.writeFile(fileName, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      res.send("internal error");
      return err;
    }
    res.send("new user added");
  });
};

const loginUser = async (req, res, next) => {
  let result = await bcrypt.compare(
    req.body.password,
    req.currentUser.password
  );
  if (!result) {
    return res.send("Password is incorrect");
  }
  //generate a token
  let jwtToken = await generateToken(
    { email: req.currentUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.cookie("jwt", jwtToken);
  res.status(200).json({
    status: "successfully login",
    data: [
      {
        jwt: jwtToken,
      },
    ],
  });

  res.send("user logged in sccessfully");
};

module.exports.SignUpUser = SignUpUser;
module.exports.loginUser = loginUser;
