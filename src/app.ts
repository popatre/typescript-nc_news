import express from "express";
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send({ msg: "success!" });
});

export default app;
