const { dataBase } = require("../models");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const addUsers = async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
            console.log("Error in Hash Bcrypt");
        }
        else {
            let info = {
                username: username,
                password: hash
            }
            try {
                const users = await dataBase.user.create(info
                    // ,{ fields: ['username'] }    //for particular row data
                );
                res.status(200).send({ msg: "Users Created", data: users });
            }
            catch (err) {
                res.send("user already exist");
            }
        }
    });
}

const getUsers = async (req, res) => {
    const users = await dataBase.user.findAll(
        // {
        //     attributes: ["username", "password", //to get the columns which you want.
        //         // [Sequelize.fn('COUNT',Sequelize.col('username')), 'Number of Users']    //to get the number of rows of any columns.
        //     ]
        // }
    );
    res.status(200).send(users);
}

const updateUsers = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const updateUser = await dataBase.user.update(req.body, { where: { id: id } });
    if (updateUser[0] === 1) {
        const users = await dataBase.user.findOne({ where: { id: id } });
        res.send({ msg: "User Updated", data: users });
    }
    else {
        res.send("Error in Updating the User");
    }
}

const deleteUsers = async (req, res) => {
    const { id } = req.params;
    const findUserOne = await dataBase.user.findOne({ where: { id: id } });
    if (findUserOne) {
        const deletedUser = await dataBase.user.destroy({ where: { id: id } });
        if (deletedUser[0] === 1) {
            res.status(200).send("User Deleted")
        }
        else {
            res.send("Error in Deleting the User");
        }
    }
    else {
        res.send("User Not Found");
    }

}

const checkUsers = async (req, res) => {
    const { username, password } = req.body;
    const checkUser = await dataBase.user.findOne({ where: { username: username } })
    if (checkUser) {
        const hash = checkUser.password;
        bcrypt.compare(password, hash).then(function (result) {
            if (result) {
                var token = jwt.sign({ foo: 'bar' }, 'shhh');
                res.send({ msg: "Valid User", token: token });
            }
            else {
                res.send("Please try again");
            }
        });
        // let result=bcrypt.compareSync(password,hash);
        // console.log(result,"res");
    }
    else {
        res.send("User is not exist");
    }
}

const rawUsersData = async (req, res) => {
    const rawUser=await dataBase.sequelize.query("select * from users");
    res.send(rawUser);
}

module.exports = {
    getUsers,
    addUsers,
    updateUsers,
    deleteUsers,
    checkUsers,
    rawUsersData
}