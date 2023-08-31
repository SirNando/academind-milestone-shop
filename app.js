const path = require("path");
const express = require("express");
const csrf = require("csurf");
const expressSession = require("express-session");

const db = require("./data/database");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const protectRoutes = require("./middlewares/protect-routes");
const cartMiddleware = require("./middlewares/cart");
const createSessionConfig = require("./config/session");

const app = express();

// Set up EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"))
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(cartMiddleware);

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use("/cart", cartRoutes);

// We protect unauthorized users from accesing restricted content
app.use(protectRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log("Failed to connect to the database");
    console.log(error);
  });
