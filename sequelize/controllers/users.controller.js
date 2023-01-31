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
    const rawUser = await dataBase.sequelize.query("select * from users");
    res.send(rawUser);
}

const oneToOne = async (req, res) => {
    // const { username, password, address, city } = req.body;
    // const data = await dataBase.user.create({ "username": username, "password": password });
    // if (data && data.id) {
    //     const contact = await dataBase.contact.create({ "address": address, "city": city, "userId"=data.id});
    // }
    // res.send(data)

    // to retrieve the data from the user as well as the contact table

    // console.log("one to one get req")
    const data2 = await dataBase.user.findAll({
        attributes: ["username"],
        include: [{
            model: dataBase.contact,
            as: "contactDetails",
            // attributes: ["city"]
        }]
    })
    res.status(200).send({ msg: "User Data along with details", data: data2 });
}

const oneToMany = async (req, res) => {

    // const { address, city } = req.body;
    // const data = await dataBase.contact.create({ address: address, city: city, user_id: 1});
    // res.status(200).send({ data: data, msg: "Multiple data is added" });

    const data2 = await dataBase.user.findAll({
        attributes: ["username"],
        include: [{
            model: dataBase.contact,
            // as: "contactDetails",
            // attributes: ["city"]
        }]
    })
    res.status(200).send({ msg: 'Retrieving Data', data: data2 })
}

const postManyToMany = async (req, res) => {
    const { username, password, address, city } = req.body;
    const data = await dataBase.user.create({ username: username, password: password });
    // console.log(data);
    if (data && data.id) {
        const data2 = await dataBase.contact.create({ address: address, city: city, userId: data.id });
        res.status(200).send({ msg: "Data Inserted", data: { data, data2 } });
    }

    // to get all the data of many to many
}

const getManyToMany = async (req, res) => {
    const data = await dataBase.user.findAll({
        // attributes: ["username", "password",
        //     dataBase.sequelize.fn("Min", dataBase.sequelize.col("id"))
        // ],
        include: [{
            model: dataBase.contact,
            attributes:[
                "city","address"
            ]
        }],
        // raw: true
    })

    // const data2 = await dataBase.user.findAll({
    //     // where:
    //     //     dataBase.sequelize.where(dataBase.sequelize.fn("MAX", dataBase.sequelize.col("id")))
    //     attributes: [
    //         "username"
    //     ],
    //     where: { id: dataBase.sequelize.fn("Max", dataBase.sequelize.col("id")) },
    //     raw: true
    // })
    res.status(200).send({ data: data });
}

module.exports = {
    getUsers,
    addUsers,
    updateUsers,
    deleteUsers,
    checkUsers,
    rawUsersData,
    oneToOne,
    oneToMany,
    getManyToMany,
    postManyToMany
}