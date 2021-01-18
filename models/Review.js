module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define ('review', {
        reviewHeader: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty:true}
        },
        reviewComment: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {notEmpty:true}
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            // validate: {
            //     isBefore: "2005-01-01"
            // }
        },
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {notEmpty:true}
        }
     })
   return Review
}

