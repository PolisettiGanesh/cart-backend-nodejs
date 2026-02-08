require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
// routes
const usersRoutes = require("./routes/users");

const app = express();

// middleware used to convert json to js object
app.use(express.json());

app.use("/api/users", usersRoutes);

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
