import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send(`${process.env.NODE_ENV} Server has started....`);
});

export default app;