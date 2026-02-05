const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(express.json());

// routes
const usersRoutes = require("./routes/users");
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
