const express = require("express");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const notificationRoutes = require("./routes/notificationRoutes");

app.use("/notifications", notificationRoutes);

app.listen(3000, () => {
    console.log("Server Running on the port : 3000");
});