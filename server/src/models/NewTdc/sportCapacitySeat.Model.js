// models/SportCapacity.js
import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const SportCapacity = sequelize.define("SportCapacity", {
  sport: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookedSeats: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default SportCapacity;