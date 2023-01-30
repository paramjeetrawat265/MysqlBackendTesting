module.exports = (sequelize, DataTypes) => {
    const contact = sequelize.define("contact", {
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        }

        // no need of userId in many to many association.
        // ,  
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
    })
    return contact
}