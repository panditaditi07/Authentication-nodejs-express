const express = require("express");
const router = express.Router();
const { SignUpUser, loginUser } = require("../controllers/userControllers");
const {
  checkRequestBody,
  isEmailValid,
  isEmailUnique,
  checkConfirmPassword,
  createPasswordHash,
  isUserRegistered,
} = require("../middlewares/userMiddleware");

router
  .route("/signup")
  .post(
    checkRequestBody,
    isEmailValid,
    isEmailUnique,
    checkConfirmPassword,
    createPasswordHash,
    SignUpUser
  );
router.route("/login").post(checkRequestBody, isUserRegistered, loginUser);

module.exports = router;
