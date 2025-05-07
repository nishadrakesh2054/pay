// import { DataTypes } from "sequelize";
// import sequelize from "../../db/index.js";

// const Registration = sequelize.define(
//   "Registration",
//   {
//     fullName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     contactNo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     dob: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     age: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     gender: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     schoolName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     parentName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     parentEmail: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     parentContactNo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     parentAddress: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     sports: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     time: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     category: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     days: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },

//     emergencyContactname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     emergencyContactNumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     hasMedicalConditions: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     medicalDetails: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     hasMedicalInsurance: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     insuranceNo: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     transportation: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     prn: { type: DataTypes.STRING, allowNull: true, unique: true },
//     notes: { type: DataTypes.BOOLEAN, allowNull: true },
//     agreement: { type: DataTypes.BOOLEAN, allowNull: true },
//   },
//   {
//     tableName: "registrations",
//     timestamps: true,
//   }
// );

// export default Registration;

import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const Registration = sequelize.define(
  "Registration",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schoolName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    parentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentContactNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    sports: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    days: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    emergencyContactname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergencyContactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    hasMedicalConditions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medicalDetails: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    hasMedicalInsurance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    insuranceNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    transportation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: { type: DataTypes.BOOLEAN, allowNull: true },
    agreement: { type: DataTypes.BOOLEAN, allowNull: true },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 10000,
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "Success", "failed", "refunded"),
      allowNull: true,
      defaultValue: "pending",
    },
    paymentMethod: {
      type: DataTypes.ENUM("Bank", "esewa", "khalti", "fonepay"),
      allowNull: true,
    },
  },

  {
    tableName: "registrations",
    timestamps: true,
  }
);

export default Registration;
