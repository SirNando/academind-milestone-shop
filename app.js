const path = require("path");
const express = require("express");
const csrf = require("csurf");

const db = require("./data/database");
const authRoutes = require("./routes/auth.routes");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");

const app = express();

// Set up EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.use(csrf());
app.use(addCsrfTokenMiddleware);

app.use(authRoutes);

db.connectToDatabase()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log("Failed to connect to the database");
    console.log(error);
  });
