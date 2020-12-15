module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        firstName: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{notEmpty:true}
        },
        lastName: {
            type:DataTypes.STRING,
            allowNull: true,
            validate:{notEmpty:true}
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false,
            validate:{notEmpty:true}
        },
        isAdmin: {
            type:DataTypes.STRING,
            allowNull: true,
            validate:{notEmpty:false}
        }
    })
    return User
}