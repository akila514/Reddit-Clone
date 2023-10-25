import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res, next) => {
  res.send("API is running");
});

app.listen(port);
