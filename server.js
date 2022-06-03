const express= require("express");
const cors= require("cors");
require("dotenv").config({path: "./config/.env"})
require("./config/db");
require("./models/person");
const app = express();

app.use(cors());
app.use(express.json());

const port= process.env.PORT 

app.listen(port , () => {
    console.log(`server is renning on ${port}...`);
})
