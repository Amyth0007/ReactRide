import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/routes.js";
const App = express()
App.use(express.json())
App.use(cors())
App.use("/", router);

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected");
}).catch((err) => {
  console.log(err);
})
const PORT = process.env.PORT || 3001;
App.listen(PORT, () => {
  console.log("server running pn port 3000");
})