// db here
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB!");
  } catch (error) {
    console.log("Error DB:", error);
  }
};

module.exports = connectDb;
