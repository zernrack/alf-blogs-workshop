require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const { errorHandler } = require("./middleware/errorMiddleware.js");

const app = express();
const port = process.env.PORT || 5000;
connectDB();


// Serve static files from the public directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

// Post Router
const postRouter = require("./routes/post.router.js");
app.use("/posts", postRouter);

// Error Middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
