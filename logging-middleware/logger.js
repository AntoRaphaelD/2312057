

const express = require("express");
const axios=require("axios")
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
const logRoutes=require("./routes/logRoutes")
app.use("/api/log",logRoutes)

const port = 6000;
app.use(cors());

app.listen(port,() => {
    console.log(`server started a ${port}`)

})

