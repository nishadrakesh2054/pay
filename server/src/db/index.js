// import { Sequelize } from "sequelize";
// import "dotenv/config";

// let sequelize;

// if (process.env.NODE_ENV === "development") {
//   sequelize = new Sequelize({
//     dialect: "sqlite",
//     storage: "./database.sqlite",
//     logging: false,
//   });
//   console.log("Using SQLite for development.");
// } else {
//   sequelize = new Sequelize(
//     process.env.DBNAME,
//     process.env.DBUSER,
//     process.env.DBPASSWORD,
//     {
//       host: process.env.DBHOST,
//       dialect: "mysql",
//       logging: false,
//     }
//   );
//   console.log("Using MySQL for production.");
// }

// const connect = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log(" Database Connected successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// connect();

// export default sequelize;

import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: "mysql",
    logging: false,
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log(" MySQL Database  Connected  successfully.");
  } catch (error) {
    console.error("Unable to connect to the MySQL database:", error);
  }
};

connect();

export default sequelize;
