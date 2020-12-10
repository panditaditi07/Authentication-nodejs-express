const { verifyToken } = require("../helpers/jwtAuthentication");
const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, "..", "data", "users.json");
const users = JSON.parse(fs.readFileSync(fileName, "utf-8"));
const protectRoute = async (req, res, next) => {
  console.log("headers in the body", req.headers);
  //   if (!req.headers.authorization) {
  //     res.send(401).json({
  //       status: "Unsuccessful",
  //       message: "Please login or signup",
  //     });
  //   }

  let jwtToken = req.headers.authorizreation.split(" ")[1];

  let decoded = await verifyToken(jwtToken, process.env.JWT_SECRET);
  console.log("result of verfication", decoded);
  next();
};
//     console.log("result of verification", decoded);
//     if (!decoded) {
//       throw res.send(401).json({
//         status: "Unsuccessful",
//         message: "Please login or signup",
//       });
//     }

//     let currentUser = users.find((user) => {
//       return user.email == decoded.email;
//     });

//     if (!currentUser) {
//       //   return res.send(401).json({
//       //     status: "Unsuccessful",
//       //     message: "Please login or signup",
//       //   });
//       throw res.send(401).json({
//         status: "Unsuccessful",
//         message: "Please login or signup",
//       });
//     }
//     req.currentUser = currentUser;
//     next();
// };

module.exports.protectRoute = protectRoute;
