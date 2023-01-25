const express = require("express");
const { connection } = require("./config/db");
const { StudentRoute } = require("./Routes/Student.Route");
require("dotenv").config();
const PORT = process.env.Port;
const app = express();
app.use(express.json())

app.get("/", (req, res) => {
    console.log("HomePage");
    res.send("Homepage");
})

app.use("/student", StudentRoute)

app.listen(PORT, async () => {
    try {
        await connection.connect();
        console.log("Connection is Established");
    }
    catch (err) {
        console.log("error occured")
    }
    console.log("Port is Ready");
})
