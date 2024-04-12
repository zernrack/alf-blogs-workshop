require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
