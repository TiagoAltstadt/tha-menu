require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const recipesRoutes = require("./routes/recipes");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log("Route:", req.path);
  console.log("Method:", req.method);
  console.log("------");
  next();
});

app.use("/api/recipes/", recipesRoutes);
app.get("*", (req, res) => {
  res.json({ code: 404, message: "Not found" });
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(" --------------------------------------------------");
      console.log(
        "|-> Server: started and listening on port " +
          process.env.PORT +
          "     |"
      );
      console.log("|-> Database: Connected to MongoDB Atlas           |");
      console.log(" --------------------------------------------------");
    });
  })
  .catch((error) => {
    console.log(error);
  });

process.env;
