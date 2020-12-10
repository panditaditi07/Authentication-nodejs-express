const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const { sendErrorMessage } = require("../helpers/sendError");
const AppError = require("../helpers/appErrorClass");
const { sendResponse } = require("../helpers/sendResponse");
const fileName = path.join(__dirname, "..", "data", "users.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const checkRequestBody = (req, res, next) => {
  let validationArray;
  //   validationArray = ["email", "password", "confirmPassword"];
  switch (req.url) {
    case "/signup":
      validationArray = ["email", "password", "confirmPassword"];
      break;
    case "/login":
      validationArray = ["email", "password"];
      break;
    default:
      return res.send("error");
  }
  let result = validationArray.every((key) => {
    return req.body[key] && req.body[key].trim().length;
  });
  if (!result) {
    return res.send("Invalid body");
  }
  next();
};

const isEmailValid = (req, res, next) => {
  next();
};

const checkConfirmPassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Passwords doesnt match");
  }
  next();
};
const isEmailUnique = (req, res, next) => {
  let findUser = users.find((user) => {
    return user.email == req.body.email;
  });
  if (findUser) {
    return res.send("User already registered");
  }
  next();
};
const createPasswordHash = async (req, res, next) => {
  let salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  next();
};

const isUserRegistered = (req, res, next) => {
  let findUser = users.find((user) => {
    return user.email == req.body.email;
  });
  if (!findUser) {
    return res.send("User not registered");
  }
  req.currentUser = { ...findUser };
  next();
};

module.exports.checkRequestBody = checkRequestBody;
module.exports.isEmailValid = isEmailValid;
module.exports.checkConfirmPassword = checkConfirmPassword;
module.exports.isEmailUnique = isEmailUnique;
module.exports.createPasswordHash = createPasswordHash;
module.exports.isUserRegistered = isUserRegistered;
