const Sequelize = require("sequelize");
const database = new Sequelize(process.env.DATABASE_URL)
//    {
//   dialect: "postgres",
// });

// const database = new Sequelize(process.env.NAME, "postgres", process.env.PASS, {
//   host: "localhost",
//   dialect: "postgres",
// });

database
  .authenticate()
  .then(() => console.log("postgres db is connected"))
  .catch((err) => console.log(err));

const Review = database.import("./models/Review");
const User = database.import("./models/User");
const Coffee = database.import("./models/Coffee");

User.hasMany(Review);
Review.belongsTo(User);

Coffee.hasMany(Review);
Review.belongsTo(Coffee);

module.exports = { database, User, Review, Coffee };
