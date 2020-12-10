const express = require("express");
const fs = require("fs");
const path = require("path");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const { protectRoute } = require("./middlewares/protectRoute");
dotenv.config({ path: "./config.env" });
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/users", userRouter);

app.get("/dashboard", protectRoute, (req, res) => {
  // console.log("dashboards");
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});
app.listen(
  process.env.PORT,
  console.log(`Server started at ${process.env.PORT}`)
);
