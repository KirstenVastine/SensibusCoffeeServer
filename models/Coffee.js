module.exports = (sequelize, DataTypes) => {
    const Coffee = sequelize.define('coffee', {
        coffeeOrigin: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty:true}
        },
        coffeeNotes: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty:true}
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {notEmpty:true}
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {notEmpty: false}
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {notEmpty: false}
        },
    })
    return Coffee
}