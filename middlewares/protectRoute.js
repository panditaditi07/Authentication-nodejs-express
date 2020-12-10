//mera wala
// const { verifyToken } = require("../helpers/jwtAuthentication");
// const fs = require("fs");
// const path = require("path");
// const { sendErrorMessage } = require("../helpers/sendError");
// const AppError = require("../helpers/appErrorClass");
// const { sendResponse } = require("../helpers/sendResponse");
// const fileName = path.join(__dirname, "..", "data", "users.json");
// const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));
// const protectRoute = async (req, res, next) => {
//   console.log("headers in the body", req.headers);

//   if (!req.headers.authorization) {
//     res.send(401).json({
//       status: "Unsuccessful",
//       message: "Please login or signup",
//     });
//   }
//   //if headers are here
//   let jwtToken = req.headers.authorization.split(" ")[1];
//   let decoded;
//   try {
//     decoded = await verifyToken(jwtToken, process.env.JWT_SECRET);
//     //   console.log("result of verfication", decoded);
//   } catch (err) {
//     throw res.send(401).json({
//       status: "Unsuccessful",
//       message: "Please login or signup",
//     });
//   }
//   let { email: currentUser } = users.find((user) => {
//     return user.email == decoded.email;
//   });

//   if (!currentUser) {
//     return res.send(401).json({
//       status: "Unsuccessful",
//       message: "Please login or signup",
//     });
//   }
//   //check verfication
//   req.currentUser = currentUser;
//   //give access
//   next();
// };

// module.exports.protectRoute = protectRoute;

const { verifyToken } = require("../helpers/jwtAuthentication");
const fs = require("fs");
const path = require("path");
const { sendErrorMessage } = require("../helpers/sendError");
const AppError = require("../helpers/appErrorClass");
const { sendResponse } = require("../helpers/sendResponse");
// const {sendErrorMessage} = require("../helpers/sendErrorMessage");
// const AppError = require("../helpers/appError");
const fileName = path.join(__dirname, "..", "data", "users.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));
const protectRoute = async (req, res, next) => {
  //   console.log("headers in req body", req.headers.authorization);
  // extract token
  //if jwt is present is the auth header or in cookie
  if (!req.headers.authorization) {
    return sendErrorMessage(
      new AppError(401, "Unsuccessful", "Please login or signup"),
      req,
      res
    );
  }
  // if headers are there
  let jwtToken = req.headers.authorization.split(" ")[1];
  let decoded;
  try {
    decoded = await verifyToken(jwtToken, process.env.JWT_SECRET);
  } catch (err) {
    return sendErrorMessage(
      new AppError(401, "Unsuccesssul", "Invalid Token"),
      req,
      res
    );
  }
  let { email: currentUser } = users.find((user) => {
    return user.email == decoded.email;
  });
  if (!currentUser) {
    return sendErrorMessage(
      new AppError(401, "Unsuccesssul", "User not registered"),
      req,
      res
    );
  }
  // check verification
  req.currentUser = currentUser;
  // give access
  next();
};
module.exports.protectRoute = protectRoute;
