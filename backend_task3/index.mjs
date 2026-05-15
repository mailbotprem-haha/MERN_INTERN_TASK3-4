import router from "./src/routes/routes.mjs";
import authRoutes from "./src/routes/authRoutes.mjs";

import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const PORT =
  process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://merninterninternspark.netlify.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/tasks", router);

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log(
      "Connected to database"
    )
  )
  .catch((err) =>
    console.log(err)
  );

app.get("/", (req, res) => {
  res.status(200).send({
    msg: "Hello I'm MERN Intern",
  });
});

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
