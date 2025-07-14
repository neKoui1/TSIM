import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import sequelize from "./config/postgre.config";

const app: Application = express();

app.use(cors()).use(helmet()).use(morgan("dev")).use(express.json());
app.get("/", function (req, res) {
  res.json({
    message: "Hello World!",
  });
});

const PORT = process.env.PORT || 9090;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    await sequelize.sync({
      force: false,
    });
    console.log("Database synchronized successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
