const { Router } = require("express");
const { getUsers, addUsers, updateUsers, deleteUsers, checkUsers, rawUsersData } = require("../controllers/users.controller");

const userRoute = Router();

userRoute.get("/", getUsers);
userRoute.post("/", addUsers);
userRoute.patch("/:id", updateUsers);
userRoute.delete("/:id", deleteUsers);
userRoute.post("/checkUser", checkUsers);
userRoute.get("/rawUser", rawUsersData)

module.exports = {
    userRoute
}