const express = require("express");
const fs = require("fs");
const path = require("path");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.listen(
  process.env.PORT,
  console.log(`Server started at ${process.env.PORT}`)
);
