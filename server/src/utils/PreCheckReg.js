// import Joi from "joi";
// const preCheckSchema = Joi.object({
//   fullName: Joi.string().min(3).max(255).required(),
//   address: Joi.string().min(3).max(255).required(),
//   contactNo: Joi.string().pattern(/^\d+$/).min(10).max(15).required().messages({
//     "string.pattern.base":
//       "Please provide a valid contact number (digits only).",
//     "string.min": "Contact number must be at least 10 digits long.",
//     "string.max": "Contact number must be at most 15 digits long.",
//   }),
//   email: Joi.string().email().required().messages({
//     "string.email": "Please provide a valid email address.",
//   }),
//   dob: Joi.date().required(),
//   age: Joi.number().required(),
//   gender: Joi.string().required(),
//   schoolName: Joi.string().min(3).max(255).required(),
//   parentName: Joi.string().min(3).max(255).required(),
//   parentEmail: Joi.string().email().required(),
//   parentContactNo: Joi.string()
//     .pattern(/^\d+$/)
//     .min(10)
//     .max(15)
//     .required()
//     .messages({
//       "string.pattern.base":
//         "Please provide a valid contact number (digits only).",
//       "string.min": "Contact number must be at least 10 digits long.",
//       "string.max": "Contact number must be at most 15 digits long.",
//     }),
//   parentAddress: Joi.string().min(3).max(255).required(),
//   sports: Joi.string().required(),
//   time: Joi.string().required(),
//   category: Joi.string().required(),
//   days: Joi.string().required(),
//   emergencyContactname: Joi.string().min(3).max(255).required(),
//   emergencyContactNumber: Joi.string()
//     .pattern(/^\d+$/)
//     .min(10)
//     .max(15)
//     .required()
//     .messages({
//       "string.pattern.base":
//         "Please provide a valid contact number (digits only).",
//       "string.min": "Contact number must be at least 10 digits long.",
//       "string.max": "Contact number must be at most 15 digits long.",
//     }),

//   hasMedicalConditions: Joi.string().valid("yes", "no").required().messages({
//     "any.required": "Please indicate if you have any medical conditions.",
//     "any.only": "Please select 'yes' or 'no'.",
//   }),
//   medicalDetails: Joi.string().allow("").optional().messages({
//     "string.base": "Medical details should be a string.",
//     "string.empty": ", please provide medical details.",
//   }),
//   hasMedicalInsurance: Joi.string().valid("yes", "no").required().messages({
//     "any.required": "Please indicate if you have medical insurance.",
//     "any.only": "Please select 'yes' or 'no'.",
//   }),
//   insuranceNo: Joi.string().allow("").optional().messages({
//     "string.base": "Insurance number should be a string.",
//     "string.empty":
//       "If you have medical insurance, please provide your insurance number.",
//   }),
//   transportation: Joi.string().valid("yes", "no").required().messages({
//     "any.required": "Please specify if you need transportation.",
//     "any.only": " Please select transportation 'yes' or 'no'.",
//   }),
//   amount: Joi.number().min(1).required().messages({
//     "number.min": "Payment amount must be at least 1.",
//   }),
//   paymentMethod: Joi.string()
//     .valid("fonepay", "esewa", "khalti")
//     .required()
//     .messages({
//       "any.only": "Please select a valid payment method.",
//     }),
//   prn: Joi.string().optional(),
//   notes: Joi.boolean().optional(),
//   agreement: Joi.boolean().valid(true).required().messages({
//     "any.only": "Please accept the agreement.",
//     "boolean.base": "Agreement must be a boolean value.",
//   }),
// });
// export default preCheckSchema;

import Joi from "joi";
const preCheckSchema = Joi.object({
  fullName: Joi.string().min(3).max(255).required(),
  address: Joi.string().min(3).max(255).required(),
  contactNo: Joi.string().pattern(/^\d+$/).min(10).max(15).required().messages({
    "string.pattern.base":
      "Please provide a valid contact number (digits only).",
    "string.min": "Contact number must be at least 10 digits long.",
    "string.max": "Contact number must be at most 15 digits long.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
  }),
  dob: Joi.date().required(),
  age: Joi.number().required(),
  gender: Joi.string().required(),
  schoolName: Joi.string().min(3).max(255).required(),
  parentName: Joi.string().min(3).max(255).required(),
  parentEmail: Joi.string().email().required(),
  parentContactNo: Joi.string()
    .pattern(/^\d+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      "string.pattern.base":
        "Please provide a valid contact number (digits only).",
      "string.min": "Contact number must be at least 10 digits long.",
      "string.max": "Contact number must be at most 15 digits long.",
    }),
  parentAddress: Joi.string().min(3).max(255).required(),
  sports: Joi.string().required(),
  time: Joi.string().required(),
  category: Joi.string().required(),
  days: Joi.string().required(),
  emergencyContactname: Joi.string().min(3).max(255).required(),
  emergencyContactNumber: Joi.string()
    .pattern(/^\d+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      "string.pattern.base":
        "Please provide a valid contact number (digits only).",
      "string.min": "Contact number must be at least 10 digits long.",
      "string.max": "Contact number must be at most 15 digits long.",
    }),

  hasMedicalConditions: Joi.string().valid("yes", "no").required().messages({
    "any.required": "Please indicate if you have any medical conditions.",
    "any.only": "Please select 'yes' or 'no'.",
  }),
  medicalDetails: Joi.string().allow("").optional().messages({
    "string.base": "Medical details should be a string.",
    "string.empty": ", please provide medical details.",
  }),
  hasMedicalInsurance: Joi.string().valid("yes", "no").required().messages({
    "any.required": "Please indicate if you have medical insurance.",
    "any.only": "Please select 'yes' or 'no'.",
  }),
  insuranceNo: Joi.string().allow("").optional().messages({
    "string.base": "Insurance number should be a string.",
    "string.empty":
      "If you have medical insurance, please provide your insurance number.",
  }),
  transportation: Joi.string().valid("yes", "no").required().messages({
    "any.required": "Please specify if you need transportation.",
    "any.only": " Please select transportation 'yes' or 'no'.",
  }),
  amount: Joi.number().messages({
    "number.min": "Payment amount must be at least 1.",
  }),
  paymentMethod: Joi.string()
    .valid("fonepay", "esewa", "khalti")

    .messages({
      "any.only": "Please select a valid payment method.",
    }),
  paymentStatus: Joi.string().valid(),
  notes: Joi.boolean().optional(),
  agreement: Joi.boolean().valid(true).required().messages({
    "any.only": "Please accept the agreement.",
    "boolean.base": "Agreement must be a boolean value.",
  }),
});
export default preCheckSchema;
