// app.ts or index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import userRoutes from "./modules/user/user.route";
import bookRoutes from "./modules/book/book.route";
import borrowRoutes from "./modules/borrow/borrow.route";

const app = express();

app.use(cors());
app.use(express.json());

// Mount user routes under /api
app.use("/api", userRoutes);
app.use("/api", bookRoutes);
app.use("/api", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome to library management system",
  });
});

app.listen(config.port, () => {
  console.log(`😎 Server is running.`);
});

async function server() {
  try {
    await mongoose.connect(config.database_url!);
    console.log(`DB Connected on port ${config.port}`);
  } catch (error) {
    console.error(`Server Error`, error);
  }
}

server();
