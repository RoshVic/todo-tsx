import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";

const app = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

dotenv.config();

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("error", (error) => {
    console.log(error, "MongoDB connection error. Please make sure MongoDB is running.");
});

app.use("/", router());
