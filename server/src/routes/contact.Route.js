import express from "express";
import { Contact } from "../models/init.Model.js";
import Joi from "joi";
import { sendContactEmail } from "../middleware/emailService.js";

const router = express.Router();

// Define the validation schema
const contactSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().allow(""),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9+\-() ]*$/).required(),
    message: Joi.string().required(),
    notes: Joi.boolean().default(false)
});

// POST request handler
router.post("/contacts", async (req, res) => {
    const { error, value } = contactSchema.validate(req.body, {
      abortEarly: false,
    });
    console.log('value', value)
  
    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }
  
    try {
      const newContact = await Contact.create(value);
      console.log('newContact', newContact)
   
  
      await sendContactEmail({
        name: newContact.firstName,
        email: newContact.email,
        message: newContact.message,
        phone: newContact.phone,
      });
  
      res.status(201).json({
        status: "success",
        data: newContact,
      });
    } catch (err) {
      console.error("❌ Error:", err);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        details: err.message,
      });
    }
  });

export default router;
