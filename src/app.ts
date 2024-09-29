import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (_req, res) => {
  res.sendFile(__dirname+'/modules/reels/views/index.html')
});

export default app;