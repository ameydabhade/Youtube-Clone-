const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const channelRoutes = require("./routes/channelRoutes");
const commentRoutes = require("./routes/commentRoutes");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/comments", commentRoutes);

module.exports = app;
