const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config/db");

const sequelize = new Sequelize(
    db.db,
    db.user,
    db.password, {
    host: db.host,
    dialect: db.dialect,
    logging: false
}
)

sequelize.authenticate()
    .then(() => {
        console.log("Connected...");
    })
    .catch(err => {
        console.log(err);
    })

const dataBase = {};
dataBase.Sequelize = Sequelize;
dataBase.sequelize = sequelize;


dataBase.user = require("./users.model")(sequelize, DataTypes)

dataBase.sequelize.sync({ force: false })

module.exports = {
    dataBase
}