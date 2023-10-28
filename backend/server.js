import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/routes.js";
import communityRouter from "./routes/communityRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

connectDB();

app.get("/", (req, res, next) => {
  res.send("API is running");
});

app.use("/api/users", userRouter);
app.use("/api/communities", communityRouter);

app.listen(port);
