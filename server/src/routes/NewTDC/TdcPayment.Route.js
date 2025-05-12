// import express from "express";
// import crypto from "crypto";
// import { v4 as uuidv4 } from "uuid";
// import paymentTDC from "../../models/NewTdc/Payment.Model.js";
// import Registration from "../../models/NewTdc/RegisterForm.Model.js";
// import sequelize from "../../db/index.js";
// import { sendPaymentConfirmationEmail } from "../../middleware/TDCMail/mailService.js";
// const router = express.Router();
// import validatePaymentRequest from "../../utils/validatePayReq.js";
// import preCheckSchema from "../../utils/PreCheckReg.js";

// // Endpoint to pre-check registration
// router.post("/pre-check-registration", async (req, res) => {
//   const { error, value } = preCheckSchema.validate(req.body);
//   if (error) {
//     return res
//       .status(400)
//       .json({ success: false, message: error.details[0].message });
//   }

//   const transaction = await sequelize.transaction();

//   try {
//     const existingRegistration = await Registration.findOne({
//       where: { email: value.email, contactNo: value.contactNo },
//       transaction,
//     });

//     if (existingRegistration) {
//       await transaction.rollback();
//       return res.status(400).json({
//         success: false,
//         message: "You have already registered for an event.",
//       });
//     }

//     const generatePRN = () => {
//       return uuidv4().substring(0, 25);
//     };
//     const prn = generatePRN();
//     console.log("Generated PRN during registration:", prn);

//     await transaction.commit();

//     return res.status(201).json({
//       success: true,
//       message: "Please proceed to payment for Registration",
//       prn: prn,
//     });
//   } catch (err) {
//     await transaction.rollback();
//     console.error("Pre-registration check error:", err);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error." });
//   }
// });
// // Endpoint to generate HMAC-SHA512 hash
// router.post("/generate-hash", (req, res) => {
//   const { pid, md, prn, amt, crn, dt, r1, r2, ru } = req.body;
//   const validationError = validatePaymentRequest(req);
//   if (validationError) {
//     return res.status(400).json({ message: validationError });
//   }

//   const dataString = `${pid},${md},${prn},${amt},${crn},${dt},${r1},${r2},${ru}`;

//   console.log("Hash generation input:", {
//     pid,
//     md,
//     prn,
//     amt,
//     crn,
//     dt,
//     r1,
//     r2,
//     ru,
//     dataString: `${pid},${md},${prn},${amt},${crn},${dt},${r1},${r2},${ru}`,
//   });

//   let SECRET_KEY = process.env.SECRET_KEY;
//   const hmac = crypto.createHmac("sha512", SECRET_KEY);
//   hmac.update(dataString, "utf-8");
//   const dv = hmac.digest("hex");

//   res.json({
//     success: true,
//     message: " (DV) generated successfully.",
//     dv,
//   });
// });

// router.post("/verify-payment", async (req, res) => {
//   const { PRN, PID, PS, RC, UID, BC, INI, P_AMT, R_AMT, DV, formData } =
//     req.body;

//   if (
//     !PRN ||
//     !PID ||
//     !PS ||
//     !RC ||
//     !UID ||
//     !BC ||
//     !INI ||
//     !P_AMT ||
//     !R_AMT ||
//     !DV ||
//     !formData
//   ) {
//     return res.status(400).json({
//       verified: false,
//       message: "Missing required parameters ",
//     });
//   }

//   // Check payment status first (from documentation)
//   if (PS === "false" || RC !== "successful") {
//     let message = "Payment failed";
//     let reason = "unknown";

//     switch (RC) {
//       case "failed":
//         message = "Payment was cancelled by the user";
//         reason = "cancelled";
//         break;

//       case "cancel":
//         message = "Payment timed out";
//         reason = "cancel";
//         break;

//       case "successful":
//         if (PS === "false") {
//           message = "Payment status false despite success code";
//           reason = "status_false";
//         }
//         break;

//       default:
//         message = `Payment failed (Code: ${RC})`;
//         reason = "general_failure";
//     }

//     console.log("Payment verification failed:", message);

//     return res.status(400).json({
//       verified: false,
//       message,
//       reason,
//       redirectUrl: "/register",
//       paymentStatus: "failed",
//       responseCode: RC,
//     });
//   }

//   // 3. Check if this PRN was already processed
//   const existingPayment = await paymentTDC.findOne({
//     where: { transactionId: PRN },
//   });
//   if (existingPayment) {
//     return res.status(400).json({
//       verified: false,
//       message: "This payment has already been processed",
//     });
//   }

//   const verificationString = `${PRN},${PID},${PS},${RC},${UID},${BC},${INI},${P_AMT},${R_AMT}`;

//   // Debugging logs
//   console.log("Received PRN from frontend:", PRN);
//   const transaction = await sequelize.transaction();
//   let transactionCommitted = false;

//   try {
//     // Generate HMAC-SHA512 hash for verification
//     const hmac = crypto.createHmac("sha512", process.env.SECRET_KEY);
//     hmac.update(verificationString.trim(), "utf-8");
//     const generatedHash = hmac.digest("hex").toUpperCase();

//     // Compare the generated hash with the received DV
//     if (generatedHash !== DV.toUpperCase()) {
//       await transaction.rollback();
//       return res.status(400).json({
//         verified: false,
//         message: "Invalid verification. Hashes do not match.",
//       });
//     }

//     // Save the form data to the database
//     const newRegistration = await Registration.create(
//       {
//         ...formData,
//         prn: PRN,
//       },
//       { transaction }
//     );

//     // Create a payment record
//     const amount = parseFloat(P_AMT);
//     if (isNaN(amount) || amount <= 0) {
//       return res.status(400).json({
//         verified: false,
//         message: "Paid amount must be a positive number",
//       });
//     }

//     const successfulPaymentRecord = await paymentTDC.create(
//       {
//         registrationId: newRegistration.id,
//         transactionId: PRN,
//         // amount: parseFloat(P_AMT),
//         amount,
//         status: "success",
//         paymentMethod: "fonepay",
//         paymentDate: new Date(),
//         email: newRegistration.email,
//         fullName: newRegistration.fullName,
//         sports: newRegistration.sports,
//         time: newRegistration.time,
//         category: newRegistration.category,
//         days: newRegistration.days,
//       },
//       { transaction }
//     );
//     console.log("Payment record created:", successfulPaymentRecord);

//     // Commit the transaction
//     await transaction.commit();
//     transactionCommitted = true;

//     // Send payment confirmation email to the user
//     try {
//       await sendPaymentConfirmationEmail(
//         newRegistration.email,
//         newRegistration.fullName,
//         // parseFloat(P_AMT),
//         amount,
//         newRegistration.sports,
//         newRegistration.category,
//         newRegistration.time,
//         newRegistration.days,
//         newRegistration.parentEmail,
//         newRegistration.prn,
//         newRegistration.contactNo
//       );
//     } catch (emailError) {
//       console.error("Email sending failed:", emailError);
//     }
//     res.status(200).json({
//       verified: true,
//       message: "Payment verified successfully.",
//       paymentDetails: {
//         id: successfulPaymentRecord.id,
//         status: "success",
//         amount,
//         paymentMethod: "fonepay",
//         fullName: newRegistration.fullName,
//         sports: newRegistration.sports,
//         category: newRegistration.category,
//         time: newRegistration.time,
//         days: newRegistration.days,
//       },
//     });
//   } catch (error) {
//     console.error("Error during payment verification:", error);
//     // Only rollback if transaction hasn't been committed
//     if (!transactionCommitted) {
//       try {
//         await transaction.rollback();
//       } catch (rollbackError) {
//         console.error("Error rolling back transaction:", rollbackError);
//       }
//     }

//     return res
//       .status(500)
//       .json({ verified: false, message: "Internal server error." });
//   }
// });

// export default router;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import express from "express";

import Registration from "../../models/NewTdc/RegisterForm.Model.js";
import sequelize from "../../db/index.js";
import { sendPaymentConfirmationEmail } from "../../middleware/TDCMail/mailService.js";
import formSchema from "../../utils/PreCheckReg.js";
const router = express.Router();

router.post("/submit-registration", async (req, res) => {
  const { error, value } = formSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const transaction = await sequelize.transaction();
  try {
    // Check for duplicates
    const existingRegistration = await Registration.findOne({
      where: {
        email: value.email,
        contactNo: value.contactNo,
      },
      transaction,
    });

    if (existingRegistration) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "You have already registered.",
      });
    }

     // Save new registration
     const newRegistration = await Registration.create(value, { transaction });
     await transaction.commit();
 

    // Send email with QR code
    await sendPaymentConfirmationEmail(
      newRegistration.id,
      newRegistration.email,
      newRegistration.fullName,
      newRegistration.sports,
      newRegistration.category,
      newRegistration.time,
      newRegistration.days,
      newRegistration.parentEmail,
      newRegistration.contactNo,
      newRegistration.amount
    );

    return res.status(201).json({
        data:newRegistration,
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration error:", error);
    await transaction.rollback();
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});


// routes/tdcRoutes.js
// router.get("/check-availability", async (req, res) => {
//     const { sport, category } = req.query;
    
//     try {
//       const capacity = await SportCapacity.findOne({
//         where: { sport, category }
//       });
  
//       if (!capacity) {
//         return res.status(404).json({
//           success: false,
//           message: "Sport/category combination not found"
//         });
//       }
  
//       return res.json({
//         success: true,
//         data: {
//           totalSeats: capacity.totalSeats,
//           availableSeats: capacity.totalSeats - capacity.bookedSeats,
//           isAvailable: capacity.bookedSeats < capacity.totalSeats
//         }
//       });
//     } catch (error) {
//       console.error("Error checking availability:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Internal server error"
//       });
//     }
//   });


export default router;
