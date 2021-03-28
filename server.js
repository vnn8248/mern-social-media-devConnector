const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Ahoy!")
});

// Define routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profiles", require("./routes/api/profiles"));
app.use("/api/users", require("./routes/api/users"));

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
});