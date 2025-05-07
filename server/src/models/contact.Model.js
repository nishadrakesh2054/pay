import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Contact = sequelize.define(
  "Contact",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9+\-() ]*$/, // Phone number format
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    notes: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "contacts",
    paranoid: true
  }
);

export default Contact;
