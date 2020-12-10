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

const getAllTasks = (req, res, next) => {};
