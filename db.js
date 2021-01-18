const Sequelize = require("sequelize");

const database = new Sequelize(process.env.NAME, "postgres", process.env.PASS, {
  host: "localhost",
  dialect: "postgres",
});

database
  .authenticate()
  .then(() => console.log("postgres db is connected"))
  .catch((err) => console.log(err));

const Review = database.import("./Models/Review");
const User = database.import("./Models/User");
const Coffee = database.import("./Models/Coffee");

User.hasMany(Review);
Review.belongsTo(User);

Coffee.hasMany(Review);
Review.belongsTo(Coffee);

module.exports = { database, User, Review, Coffee };
