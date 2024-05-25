const express = require("express");
const cors = require("cors");
const { dataRouter } = require("./routes/route.js");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(cors());
app.use(express.json());
app.use("/api/data", dataRouter);

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});