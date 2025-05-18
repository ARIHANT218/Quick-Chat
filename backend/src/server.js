
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
dotenv.config();

// Database
const { connectDB } = require("./lib/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

// Socket server & app
const { app, server } = require("./lib/socket");


const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json({ limit: "5mb" }));  // For JSON
app.use(express.urlencoded({ limit: "5mb", extended: true })); 

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});