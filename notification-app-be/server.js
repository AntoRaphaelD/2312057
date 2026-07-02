const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
  }));
const dotenv = require("dotenv");
dotenv.config();

const notificationRoutes = require("./routes/notificationRoutes");

app.use("/notifications", notificationRoutes);

app.listen(3000, () => {
    console.log("Server Running on the port : 3000");
});