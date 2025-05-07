// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.stackmail.com",
//   port: 465,
//   secure: true,
//   pool: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });
// export const sendPaymentConfirmationEmail = async (
//   recipientEmail,
//   participantName,
//   amount,
//   sports,
//   category,
//   time,
//   days,
//   parentEmail,
//   prn,contactNo
// ) => {
//   const mailOptions = {
//     from: `"THUNDERBOLTS" <${process.env.EMAIL_USER}>`,
//     to: [recipientEmail, parentEmail],
//     subject: "Registration Successful for Thunderbolts Development Center",
//     html: `
//         <html>
//           <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
//             <div style="max-width:600px; margin:20px auto; background-color:#ffffff; padding:20px; border:1px solid #ddd; border-radius:8px;">
//               <h2 style="color:#007BFF; text-align:center;">Registration Successful</h2>
//               <p>Dear <strong>${participantName}</strong>,</p>
//               <p>Congratulations on successfully registering for the <strong>${
//                 sports.charAt(0).toUpperCase() + sports.slice(1)
//               }</strong> Program at <strong>Thunderbolts Development Center</strong>! We are thrilled to welcome you to our <strong>${category}</strong> level and are excited to have you join our growing community of passionate ${sports} enthusiasts.</p>
//               <p>We are pleased to confirm that your payment of <strong>NPR ${amount} /- </strong> has been successfully processed and received. Thank you for completing your registration!</p>
//               <p>Your journey with Thunderbolts Development Center is about to begin, and we are committed to providing you with the best training, guidance, and support to help you grow both on and off the field.</p>
//               <p>Here are  Your registration details:</p>
//               <table style="width:100%; border-collapse:collapse; margin:20px 0;">
//                   <tr>
//                   <td style="border:1px solid #ddd; padding:8px;"><strong>Transaction ID:</strong></td>
//                   <td style="border:1px solid #ddd; padding:8px;">${prn}</td>
//                 </tr>
//                 <tr>
//                   <td style="border:1px solid #ddd; padding:8px;"><strong>Full Name</strong></td>
//                   <td style="border:1px solid #ddd; padding:8px;">${participantName}</td>
//                 </tr>
//                 <tr>
//                   <td style="border:1px solid #ddd; padding:8px;"><strong>Sport</strong></td>
//                   <td style="border:1px solid #ddd; padding:8px; ">${
//                     sports.charAt(0).toUpperCase() + sports.slice(1)
//                   }</td>
//                 </tr>
//                 <tr>
//                   <td style="border:1px solid #ddd; padding:8px;"><strong>Category</strong></td>
//                   <td style="border:1px solid #ddd; padding:8px;">${category}</td>
//                 </tr>
//                 <tr>
//                   <td style="border:1px solid #ddd; padding:8px;"><strong>Time</strong></td>
//                   <td style="border:1px solid #ddd; padding:8px;">${time}</td>
//                 </tr>
//                  <tr>
//                   <td style="border:1px solid #ddd; padding:8px;"><strong>Training Days</strong></td>
//                   <td style="border:1px solid #ddd; padding:8px;">${days}</td>
//                 </tr>

//                 <tr>
//                   <td style="border:1px solid #ddd; padding:8px;"><strong>Location</strong></td>
//                   <td style="border:1px solid #ddd; padding:8px;">Dhapakhel, Lalitpur</td>
//                 </tr>
//               </table>
//               <p>If you have any questions or need further assistance, feel free to reach out. Once again, welcome to the Thunderbolts family! We can’t wait to see you on the field and help you achieve your goals.</p>
//               <div style="text-align:center; margin:20px 0;">
//                 <a href="https://thunderbolts.com.np/" style="background-color:#007BFF; color:#fff; padding:10px 20px; text-decoration:none; border-radius:5px;">Visit Our Website</a>
//               </div>
//               <p style="text-align:center; font-size:14px; color:#777; margin-top:30px;">
//                 Best regards,<br>
//                 <strong>Thunderbolts Development Center</strong><br>
//                 Dhapakhel, Lalitpur.<br>
//                 Contact:<br>
//                 Tel: +977 9801973975/67<br>
//                 Email: info@thunderbolts.com.np
//               </p>
//                <p style="text-align:center; font-size:14px; color:#777;">For more updates and news, follow us on:</p>
//             <p style="text-align:center;">
//               <a href="https://thunderbolts.com.np/" style="text-decoration:none; margin-right:10px;">
//                 <img src="https://img.icons8.com/ios-filled/50/000000/domain.png" alt="Website" width="20" height="20"/> thunderbolts.com.np
//               </a>
//               |
//               <a href="https://www.instagram.com/thunderboltsdc" style="text-decoration:none; margin-left:10px;">
//                 <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram" width="20" height="20"/> thunderboltsdc
//               </a>
//             </p>
//             </div>
//           </body>
//         </html>
//       `,
//   };

//   const mailOptionsAdmin = {
//     from: `"THUNDERBOLTS" <${process.env.EMAIL_USER}>`,
//     to: "nishadrakesh2054@gmail.com",
//     subject: `New Registration: ${participantName} (${sports})`,
//     html: `<html>
//       <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
//         <div style="background-color: #ffffff; padding: 20px; border-radius: 8px;">
//           <h2 style="color: #007BFF;">New Registration Notification</h2>
//                     <p><strong>Transaction ID:</strong> ${prn}</p>
//                      <p><strong>contactNo:</strong> ${contactNo}</p>
//           <p><strong>Participant Email:</strong> ${recipientEmail}</p>
//           <p><strong>Participant Name:</strong> ${participantName}</p>
//           <p><strong>Sport:</strong> ${
//             sports.charAt(0).toUpperCase() + sports.slice(1)
//           }</p>
//           <p><strong>Category:</strong> ${category}</p>

//           <p><strong>Amount Paid:</strong> NPR ${amount}</p>

//         </div>
//       </body>
//     </html>`,
//   };

//   try {
//     await Promise.all([
//       transporter.sendMail(mailOptions),
//       transporter.sendMail(mailOptionsAdmin),
//     ]);
//     console.log(
//       `Payment confirmation emails sent successfully to ${recipientEmail}, ${parentEmail}, and admin.`
//     );
//   } catch (error) {
//     console.error("Error sending payment confirmation emails:", error);
//     throw new Error(
//       "Failed to send payment confirmation emails: " + error.message
//     );
//   }
// };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.stackmail.com",
  port: 465,
  secure: true,
  pool: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPaymentConfirmationEmail = async (
  id,
  recipientEmail,
  participantName,
  sports,
  category,
  time,
  days,
  parentEmail,
  contactNo
) => {
  const capitalizedSport = sports.charAt(0).toUpperCase() + sports.slice(1);
  const qrImageUrl =
    "https://res.cloudinary.com/doaiilrxn/image/upload/v1745397095/gemsqr_ixnlyz.png";

  const mailOptions = {
    from: `"THUNDERBOLTS" <${process.env.EMAIL_USER}>`,
    to: [recipientEmail, parentEmail],
    subject:
      "Registration Successful - Welcome to Thunderbolts Development Center",
    html: `
      <html>
        <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <div style="max-width:600px; margin:20px auto; background-color:#ffffff; padding:20px; border:1px solid #ddd; border-radius:8px;">
            <h2 style="color:#007BFF; text-align:center;">🎉 Registration Successful</h2>
            <p>Dear <strong>${participantName}</strong>,</p>
            <p>Welcome to the <strong>${capitalizedSport}</strong> program at <strong>Thunderbolts Development Center</strong>!</p>
            <p>We're thrilled to have you join us under the  <strong>${category}</strong> category. </p>

            <table style="width:100%; border-collapse:collapse; margin:20px 0;">
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Full Name</strong></td><td style="padding:8px; border:1px solid #ddd;">${participantName}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Sport</strong></td><td style="padding:8px; border:1px solid #ddd;">${capitalizedSport}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Category</strong></td><td style="padding:8px; border:1px solid #ddd;">${category}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Training Time</strong></td><td style="padding:8px; border:1px solid #ddd;">${time}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Days</strong></td><td style="padding:8px; border:1px solid #ddd;">${days}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Fee</strong></td><td style="padding:8px; border:1px solid #ddd;">NPR. 10,000 /-  </td></tr>
                <tr><td style="padding:8px; border:1px solid #ddd;"><strong>ID</strong></td><td style="padding:8px; border:1px solid #ddd;"> ${id}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Location</strong></td><td style="padding:8px; border:1px solid #ddd;">Dhapakhel, Lalitpur</td></tr>
            </table>

            <p style="margin: 20px 0;"><strong>📌 To complete your registration, please scan the QR code below to make your payment:</strong></p>
            <div style="text-align:center;">
              <p style="margin-top:10px;"><strong>Amount:</strong>NPR. 10,000 /-</p>
              <img src="${qrImageUrl}" alt="QR Code" style="max-width:200px; border-radius:10px; border:1px solid #ccc;" />
            </div>

            <p>After making the payment,Kindly reply to this email  with a copy of your payment slip to confirm your registration . </p>
            
            <p>Once again, welcome to the Thunderbolts family! feel free to reach out to us . </p>
            <p>Warm regards</p><br/>
            <ul>
              <li>Email: <a href="mailto:info@thunderbolts.com.np">info@thunderbolts.com.np</a></li>
              <li>WhatsApp: <a href="https://wa.me/9779801973975">+977 9801973975</a></li>
            </ul>
          </div>
        </body>
      </html>
    `,
  };

  const mailOptionsAdmin = {
    from: `"THUNDERBOLTS" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `📥 New Registration: ${participantName} `,
    html: `
      <html>
        <body style="margin:0; padding:0; font-family: 'Segoe UI', sans-serif; background-color:#f9f9f9;">
          <div style="max-width:700px; margin:30px auto; background-color:#ffffff; padding:30px; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
            
            <h2 style="color:#007BFF; border-bottom:2px solid #eee; padding-bottom:10px;">📋 New Registration Alert</h2>
<strong>Dear Admin,</strong>
            <p style="font-size:16px;">A new registration has been recieved for the Thunderbolts Development Center .</p>
  
                 <table style="width:100%; border-collapse:collapse; margin:20px 0;">
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Full Name</strong></td><td style="padding:8px; border:1px solid #ddd;">${participantName}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Sport</strong></td><td style="padding:8px; border:1px solid #ddd;">${capitalizedSport}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Category</strong></td><td style="padding:8px; border:1px solid #ddd;">${category}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Training Time</strong></td><td style="padding:8px; border:1px solid #ddd;">${time}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Days</strong></td><td style="padding:8px; border:1px solid #ddd;">${days}</td></tr>
              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Fee</strong></td><td style="padding:8px; border:1px solid #ddd;">NPR. 10,000 /-  </td></tr>
            <tr><td style="padding:8px; border:1px solid #ddd;"><strong>ID</strong></td><td style="padding:8px; border:1px solid #ddd;"> ${id}</td></tr>
            <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Phone</strong></td><td style="padding:8px; border:1px solid #ddd;"> ${contactNo}</td></tr>

              <tr><td style="padding:8px; border:1px solid #ddd;"><strong>Location</strong></td><td style="padding:8px; border:1px solid #ddd;">Dhapakhel, Lalitpur</td></tr>
            </table>
  
            <p style="margin-top:30px; font-size:14px; color:#555;">Please check for the payment confirmation. The participant has been instructed to respond to the registration success email with their payment slip.</p>
            <p style="margin-top:30px; font-size:14px; color:#555;">Kindly verify the payment manually and update the registration status to confirm their participation. </p>
  
           
  
           
          </div>
        </body>
      </html>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(mailOptionsAdmin),
    ]);
    console.log(
      `✅ Emails sent successfully to ${recipientEmail}, ${parentEmail}, and Admin`
    );
  } catch (error) {
    console.error("❌ Failed to send emails:", error);
    throw new Error("Email send error: " + error.message);
  }
};
