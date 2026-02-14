require('dotenv').config();
require("./config/passport");
const passport = require("passport");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


// routes
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

// middleware used to convert json to js object
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

// db connection
mongoose
  .connect("mongodb://127.0.0.1:27017/cart-backend")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
