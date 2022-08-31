// Import necessary modules
require("dotenv").config();
const debug = require("debug")("app");
const morgan = require("morgan");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// debug(process.env);
const auth = require("./middlewares/auth");
const upload = require("./middlewares/upload");
const { registerUser, loginUser } = require("./controllers/user");
const { create, findById, findAll } = require("./controllers/product");
const { buy, ship } = require("./controllers/invoice");

// Use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(helmet());

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

app.post("/login", loginUser);
app.post("/register", registerUser);

app.get("/products", findAll);
app.get("/products/:id", findById);
app.post("/products", [auth, upload.single("image"), create]);
app.post("/buy", buy);
app.post("/ship", ship);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
});
