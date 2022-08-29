// Import necessary modules
require("dotenv").config();
const debug = require("debug")("app");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// debug(process.env);

// Import Routers
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const usersRouter = require("./routes/users");

// Use middlewares
app.use(
  cors({
    origin: "*",
  })
);
// app.options("/*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );
//   res.send(200);
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.use(helmet());

// Use router middlewares
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/users", usersRouter);

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
