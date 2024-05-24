const express = require("express");
const dataRouter = express.Router();
const { getData } = require('../data/data.js');

const app = express();

app.use(express.json());

dataRouter.get("/matches", getData().matches)

dataRouter.get("/deliveries", getData().deliveries)

app.use("/api/data", dataRouter);

app.listen(3000, () => {
    console.log("Server runnin at http://localhost:3000")
})