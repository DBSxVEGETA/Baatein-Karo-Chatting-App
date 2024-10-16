if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { chats } = require("./data/data");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // to accept json data
app.use(cookieParser());

app.use("/api/user", userRoutes);

// app.use(notFound);
// app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = app;
