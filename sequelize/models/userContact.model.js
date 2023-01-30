const { db } = require("../config/db")

module.exports = (sequelize, DataTypes,dbUser,dbContact) => {
    const userContact = sequelize.define("user_contact", {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: dbUser,
                key: 'id'
            }
        },
        contactId: {
            type: DataTypes.INTEGER,
            references: {
                model: dbContact,
                key: 'id'
            }
        }
    })
    return userContact
}