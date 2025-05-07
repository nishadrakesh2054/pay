import { DataTypes } from "sequelize";
import sequelize from "../../db/index.js";

const ManualReg = sequelize.define("ManualReg", {
  agreement: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  paymentType: {
    type: DataTypes.ENUM("Cash", "QR"),
    allowNull: false,
  },

  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: {
        msg: "Total amount must be a valid number.",
      },
      min: {
        args: [0],
        msg: "Total amount must be a positive number.",
      },
    },
  },

  emergencyContactPersonName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emergencyContactPersonNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  medicalDetails: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isValid(value) {
        if (this.hasMedicalConditions === true && !value) {
          throw new Error("Please specify your medical conditions.");
        }
      },
    },
  },

  hasMedicalConditions: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },

  insuranceNo: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isValid(value) {
        if (this.hasMedicalInsurance === true && !value) {
          throw new Error(
            "Insurance number is required when medical insurance is Yes."
          );
        }
      },
    },
  },

  hasMedicalInsurance: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },

  transportation: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },

  trainingTime: {
    type: DataTypes.ENUM("3:00PM - 4:30PM", "4:30PM - 6:00PM"),
    allowNull: false,
  },
  trainingDays: {
    type: DataTypes.ENUM("Tuesday & Thursday", "Monday, Wednesday & Friday"),
    allowNull: false,
  },

  sportsCategory: {
    type: DataTypes.ENUM("Grassroots ", "Intermediate ", "Senior "),
    allowNull: false,
  },

  sports: {
    type: DataTypes.ENUM("Football", "Futsal", "Cricket", "Swimming", "Tennis"),
    allowNull: false,
  },

  parentAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: " address cannot be empty.",
      },
    },
  },
  parentContactNo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Parent contact number cannot be empty.",
      },
    },
  },
  parentEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Please provide a valid parent email address.",
      },
      notEmpty: {
        msg: "Parent email address cannot be empty.",
      },
    },
  },
  parentName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Parent name cannot be empty.",
      },
    },
  },

  schoolName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "School name cannot be empty.",
      },
      len: {
        args: [3, 255],
        msg: "School name must be between 3 and 255 characters.",
      },
    },
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female", "Other"),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [5],
        msg: "Age must be at least 5 years old.",
      },
    },
  },
  DateOfBirth: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  ContactNo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "  ContactNo cannot be empty.",
      },
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: " address cannot be empty.",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Please provide a valid email address.",
      },
      notEmpty: {
        msg: "Email address cannot be empty.",
      },
    },
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: " Name cannot be empty.",
      },
    },
  },
});

export default ManualReg;
