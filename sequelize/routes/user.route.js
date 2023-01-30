const { Router } = require("express");
const { getUsers, addUsers, updateUsers, deleteUsers, checkUsers, rawUsersData, oneToOne, oneToMany, manyToMany, postManyToMany, getManyToMany } = require("../controllers/users.controller");

const userRoute = Router();

// userRoute.get("/", getUsers);
// userRoute.post("/", addUsers);
// userRoute.patch("/:id", updateUsers);
// userRoute.delete("/:id", deleteUsers);
// userRoute.post("/checkUser", checkUsers);
// userRoute.get("/rawUser", rawUsersData);
// userRoute.post("/oneToOne", oneToOne); //to create the user and contact at the same time.
// userRoute.get("/oneToOne", oneToOne);
// userRoute.post("/oneToMany", oneToMany);
// userRoute.get("/oneToMany", oneToMany);
userRoute.post("/manyToMany", postManyToMany);
userRoute.get("/manyToMany", getManyToMany);
module.exports = {
    userRoute
}