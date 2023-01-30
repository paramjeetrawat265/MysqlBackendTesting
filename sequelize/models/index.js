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
dataBase.contact = require("./contact.model")(sequelize, DataTypes)
dataBase.userContact = require("./userContact.model")(sequelize, DataTypes, dataBase.user, dataBase.contact)

// dataBase.user.hasOne(dataBase.contact); //to post the data dont need to pass any attribute
// dataBase.user.hasOne(dataBase.contact, { foreignKey: "user_id", as: "contactDetails" }); //to retrive the data we have to pass the foreign key 

// dataBase.user.hasMany(dataBase.contact, { foreignKey: "user_id" })
// dataBase.contact.belongsTo(dataBase.user);

dataBase.user.belongsToMany(dataBase.contact, { through: dataBase.userContact });
dataBase.contact.belongsToMany(dataBase.user, { through: dataBase.userContact });

dataBase.sequelize.sync({ force: false })

module.exports = {
    dataBase
}