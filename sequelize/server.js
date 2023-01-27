const express=require("express");
const auth = require("./middleware/authentication");
const { userRoute } = require("./routes/user.route");
const app=express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Homepage");
})

app.use("/users",userRoute)

app.use("/getData",auth,userRoute)

app.listen(8000,()=>{
    console.log("Connected to port 8000");
})