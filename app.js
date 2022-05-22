// Import necessary modules
require("dotenv").config();
const debug = require("debug")("app");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// debug(process.env);

// Import Routers
const productsRouter = require("./routes/products");
const suppliersRouter = require("./routes/suppliers");
const usersRouter = require("./routes/users");
const walletsRouter = require("./routes/wallets");

// Use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// Use router middlewares
app.use("/api/products", productsRouter);
app.use("/api/suppliers", suppliersRouter);
app.use("/api/users", usersRouter);
app.use("/api/wallets", walletsRouter);

if (app.get("env") === "development") {
  app.use(morgan("dev"));
  debug('Morgan "dev" mode enabled');
}
mongoose.connect(
  process.env.MONGODB_CONNECT_URL,
  { useNewUrlParser: true },
  (err, db) => {
    if (err) {
      console.error(err);
    } else {
      debug(`db: ${db.toString()}`);
      debug("MongoDB connection established");
    }
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
});
