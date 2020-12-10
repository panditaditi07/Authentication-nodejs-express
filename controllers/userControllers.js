const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
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
  res.send("user logged in sccessfully");
};

module.exports.SignUpUser = SignUpUser;
module.exports.loginUser = loginUser;
