import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import Connection from "./db.js";
import { router as userRouter } from "./routes/user.js";
import { router as accountRouter } from "./routes/account.js";

const app = express();

config();
Connection(process.env.MONGODB_URL);

app.use(cors());
app.use(json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(3000, () => {
	console.log("Server is running...");
});
