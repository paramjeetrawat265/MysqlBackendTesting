
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validation:{
                isAlpha:true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     is: ["^[a-z]+$", 'i']
            // }
        }
    })
    return user;
}
