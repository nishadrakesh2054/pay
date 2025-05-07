import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Users = sequelize.define(
  "Users",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "This email is already registered.",
      },
      validate: {
        isEmail: {
          msg: "Please provide a valid email address.",
        },
        notNull: {
          msg: "Email is a required field.",
        },
        notEmpty: {
          msg: "Email cannot be empty.",
        },
      },
    },
    role: {
      type: DataTypes.ENUM( "Super Admin","Admin", "Front desk","Finance Manager","Event Manager"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role is a required field.",
        },
        isIn: {
          args: [[  "Super Admin" ,"Admin", "Front desk","Finance Manager","Event Manager"]],
          msg: "Role must be either 'Admin' or 'Front desk' or 'Finance Manager' or 'Event Manager'.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is a required field.",
        },
        notEmpty: {
          msg: "Password cannot be empty.",
        },
        len: {
          args: [8, 100],
          msg: "Password must be at least 8 characters long.",
        },
      },
    },
  },
  {
    timestamps: true,
    tableName: "Users",
  }
);

export default Users;
