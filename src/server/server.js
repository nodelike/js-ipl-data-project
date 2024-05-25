const express = require("express");
const cors = require("cors");
const { dataRouter } = require("./routes/route.js");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; img-src 'self' data:"
  );
  next();
});

app.use("/api/data", dataRouter);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});