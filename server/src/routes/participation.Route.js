import express from "express";
import Joi from "joi";
import { sendRegistrationSuccessEmail } from "../middleware/sendRegistrationSuccessEmail.js";
import { Game, Participation, School } from "../models/init.Model.js";
const router = express.Router();

// Validation schema using Joi
const registrationSchema = Joi.object({
  schoolName: Joi.string().min(3).max(255).required(),
  contactNo: Joi.string().pattern(/^\d+$/).min(10).max(15).required().messages({
    "string.pattern.base":
      "Please provide a valid contact number (digits only).",
    "string.min": "Contact number must be at least 10 digits long.",
    "string.max": "Contact number must be at most 15 digits long.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
  }),
  type: Joi.string().valid("Individual", "Squad").required().messages({
    "any.only": "Please select a valid type (Individual or Squad).",
  }),
  game: Joi.number().required().messages({
    "number.base": "Please select a valid game.",
    "any.required": "Game ID is required.",
  }),
  numberOfParticipants: Joi.number()
    .min(1)
    .optional()
    .when("type", { is: "Individual", then: Joi.required() })
    .messages({
      "number.base": "Number of participants must be a number.",
      "number.min": "Number of participants must be at least 1.",
    }),
});

// Route for creating a new school and participation
router.post(
  "/participations",
  async (req, res, next) => {
    const { schoolName, contactNo, type, game, numberOfParticipants, email } =
      req.body;

    // Validate request data using Joi schema
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const school = await School.create({
        name: schoolName,
        contactNo,
        email,
      });

      const selectedGame = await Game.findByPk(Number(game));

      if (!selectedGame) {
        return res.status(404).json({ error: "Selected game not found." });
      }

      const fee =
        type === "Individual"
          ? selectedGame.fee * numberOfParticipants
          : selectedGame.fee;

      const participation = await Participation.create({
        numberOfParticipants:
          type === "Individual" ? numberOfParticipants : null,
        fee,
        schoolId: school.id,
        gameId: selectedGame.id,
      });

      res.locals.school = school;
      res.locals.participation = participation;

      next();
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({
        error:
          "An internal error occurred during registration. Please try again later.",
      });
    }
  },
  sendRegistrationSuccessEmail
);

export default router;
