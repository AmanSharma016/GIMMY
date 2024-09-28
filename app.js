const express = require("express");
const mongoose = require("mongoose");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const ejsMate = require('ejs-mate');
const Listing = require("./model/user_details.js");
const port = 3000;
const asyncHandler = require("./utils/async.js");
const bcrypt = require("bcrypt");

const MONGO_URL = "mongodb://127.0.0.1:27017/GIMMY";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Express setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.engine('ejs', ejsMate);

// Session setup
app.use(session({
  secret: 'your-secret-key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URL }), // Use MongoDB for storing sessions
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
app.get("/", asyncHandler(async (req, res) => {
  res.render("./listings/index.ejs");
}));

app.get("/service", asyncHandler(async (req, res) => {
  res.render("./listings/service.ejs");
}));

app.get("/program", asyncHandler(async (req, res) => {
  res.render("./listings/program.ejs");
}));

app.get("/entrance", asyncHandler(async (req, res) => {
  res.render("./listings/entrance.ejs");
}));

app.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Listing.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.redirect("/");
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal Server Error");
  }
}));

app.post("/signup", asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if username or email already exists
  const existingUser = await Listing.findOne({ $or: [{ username }, { email }] }); //'$or: [{ username }, { email }]' is used to check if user with same credintails is present in the db

  if (existingUser) {
    if (existingUser.username === username) {
      return res.status(400).send('Username is already taken.');
    }
    if (existingUser.email === email) {
      return res.status(400).send('Email is already registered.');
    }
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new Listing({
    username,
    email,
    password: hashedPassword
  });
  await newUser.save();
  res.redirect("/");
}));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
