// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import { Op } from "sequelize";
// import { Participation, Game, School } from "../models/init.Model.js";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export const generatePDF = async (startDate, endDate) => {
// 	try {
// 		const registrations = await Participation.findAll({
// 			where: {
// 				createdAt: {
// 					[Op.between]: [startDate, endDate],
// 				},
// 			},
// 			include: [Game, School],
// 		});

// 		console.log("Participations found:", participations.length);
// 		if (participations.length > 0) {
// 			console.log(
// 				"Sample participation:",
// 				JSON.stringify(participations[0], null, 2)
// 			);
// 		}

// 		const doc = new PDFDocument({ margin: 50, size: "A4" });
// 		const pdfFileName = `participations_${Date.now()}.pdf`;
// 		const pdfPath = path.join(__dirname, "..", "temp", pdfFileName);

// 		const tempDir = path.join(__dirname, "..", "temp");
// 		if (!fs.existsSync(tempDir)) {
// 			fs.mkdirSync(tempDir, { recursive: true });
// 		}

// 		const stream = fs.createWriteStream(pdfPath);
// 		doc.pipe(stream);

// 		// Add title
// 		doc.font("Helvetica-Bold")
// 			.fontSize(18)
// 			.text("Participation Report", { align: "center" });
// 		doc.moveDown(0.5);

// 		// Add date range
// 		doc.font("Helvetica")
// 			.fontSize(12)
// 			.text(
// 				`Date Range: ${new Date(
// 					startDate
// 				).toLocaleDateString()} - ${new Date(
// 					endDate
// 				).toLocaleDateString()}`,
// 				{ align: "center" }
// 			);
// 		doc.moveDown(1);

// 		const columns = [
// 			{ header: "SN", width: 30 },
// 			{ header: "PID", width: 40 },
// 			{ header: "PRN", width: 80 },
// 			{ header: "School Name", width: 100 },
// 			{ header: "Game", width: 70 },
// 			{ header: "Category", width: 70 },
// 			{ header: "Amount", width: 60 },
// 			{ header: "Date", width: 70 },
// 		];

// 		// Draw table header
// 		let y = doc.y;
// 		doc.font("Helvetica-Bold").fontSize(10);
// 		columns.forEach((column, i) => {
// 			doc.text(
// 				column.header,
// 				50 +
// 					columns
// 						.slice(0, i)
// 						.reduce((sum, col) => sum + col.width, 0),
// 				y,
// 				{ width: column.width, align: "left" }
// 			);
// 		});

// 		// Draw a line under the header
// 		doc.moveTo(50, y + 15)
// 			.lineTo(550, y + 15)
// 			.stroke();
// 		y += 20;

// 		// Draw table rows
// 		doc.font("Helvetica").fontSize(9).lineGap(4);
// 		participations.forEach((participation, index) => {
// 			if (y > 750) {
// 				doc.addPage();
// 				y = 50;
// 				// Redraw the header on the new page
// 				doc.font("Helvetica-Bold").fontSize(10);
// 				columns.forEach((column, i) => {
// 					doc.text(
// 						column.header,
// 						50 +
// 							columns
// 								.slice(0, i)
// 								.reduce((sum, col) => sum + col.width, 0),
// 						y,
// 						{ width: column.width, align: "left" }
// 					);
// 				});
// 				doc.moveTo(50, y + 15)
// 					.lineTo(550, y + 15)
// 					.stroke();
// 				y += 20;
// 				doc.font("Helvetica").fontSize(9).lineGap(4);
// 			}

// 			try {
// 				let x = 50;
// 				doc.text((index + 1).toString(), x, y, {
// 					width: 30,
// 					align: "left",
// 				});
// 				x += 30;
// 				doc.text(participation.id?.toString() || "N/A", x, y, {
// 					width: 40,
// 					align: "left",
// 				});
// 				x += 40;
// 				doc.text(participation.PRN?.toString() || "N/A", x, y, {
// 					width: 80,
// 					align: "left",
// 				});
// 				x += 80;
// 				doc.text(participation.School?.name || "N/A", x, y, {
// 					width: 100,
// 					align: "left",
// 				});
// 				x += 100;
// 				doc.text(participation.Game?.name || "N/A", x, y, {
// 					width: 70,
// 					align: "left",
// 				});
// 				x += 70;
// 				doc.text(participation.Game?.category || "N/A", x, y, {
// 					width: 70,
// 					align: "left",
// 				});
// 				x += 70;
// 				doc.text(
// 					participation.paidAmount
// 						? `NPR ${participation.paidAmount.toFixed(2)}`
// 						: "N/A",
// 					x,
// 					y,
// 					{ width: 60, align: "right" }
// 				);
// 				x += 60;
// 				doc.text(
// 					participation.createdAt
// 						? new Date(participation.createdAt).toLocaleDateString()
// 						: "N/A",
// 					x,
// 					y,
// 					{ width: 70, align: "left" }
// 				);
// 			} catch (error) {
// 				console.error("Error processing participation:", error);
// 				console.error(
// 					"Problematic participation:",
// 					JSON.stringify(participation, null, 2)
// 				);
// 			}

// 			y += 20;
// 		});

// 		// Add page numbers
// 		const pageCount = doc.bufferedPageRange().count;
// 		for (let i = 0; i < pageCount; i++) {
// 			doc.switchToPage(i);
// 			doc.text(`Page ${i + 1} of ${pageCount}`, 50, 800, {
// 				align: "center",
// 			});
// 		}

// 		return new Promise((resolve, reject) => {
// 			doc.end();
// 			stream.on("finish", () => {
// 				resolve(pdfFileName);
// 			});
// 			stream.on("error", reject);
// 		});
// 	} catch (error) {
// 		console.error("Error generating PDF:", error);
// 		throw error;
// 	}
// };

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { Op } from "sequelize";
import Registration from "../models/NewTdc/RegisterForm.Model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generatePDF = async (startDate, endDate) => {
  try {
    console.log("Generating PDF with date range:", { startDate, endDate });

    // Parse dates more robustly
    const start = new Date(startDate);
    const end = new Date(endDate);

    console.log("Parsed dates:", { start, end });

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid date format provided");
    }

    // Set time to start and end of day
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const registrations = await Registration.findAll({
      where: {
        createdAt: {
          [Op.between]: [start, end],
        },
      },
      raw: true, // Get plain objects instead of model instances
    });

    console.log("Number of registrations found:", registrations.length);

    if (registrations.length === 0) {
      console.log("No registrations found for the given date range");
      throw new Error("No registrations found for the selected date range");
    } else {
      console.log(
        "Sample registration data:",
        JSON.stringify(registrations[0], null, 2)
      );
    }

    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const pdfFileName = `registrations_${Date.now()}.pdf`;
    const pdfPath = path.join(__dirname, "..", "temp", pdfFileName);

    const tempDir = path.join(__dirname, "..", "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // Add title
    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .text("Thunderbolts Development Center Registration Data", {
        align: "center",
      });
    doc.moveDown(0.5);

    // Add date range
    doc
      .font("Helvetica")
      .fontSize(12)
      .text(
        `Date Range: ${start.toLocaleDateString()} - ${end.toLocaleDateString()}`,
        { align: "center" }
      );
    doc.moveDown(1);

    const columns = [
      { header: "SN", width: 30 },
      { header: "Name", width: 100 },
      { header: "Email", width: 120 },
      { header: "Contact", width: 80 },
      { header: "Sports", width: 80 },
      { header: "Category", width: 80 },
      { header: "Payment Status", width: 80 },
      { header: "Date", width: 80 },
    ];

    // Draw table header
    let y = doc.y;
    doc.font("Helvetica-Bold").fontSize(10);
    columns.forEach((column, i) => {
      doc.text(
        column.header,
        50 + columns.slice(0, i).reduce((sum, col) => sum + col.width, 0),
        y,
        { width: column.width, align: "left" }
      );
    });

    // Draw a line under the header
    doc
      .moveTo(50, y + 15)
      .lineTo(550, y + 15)
      .stroke();
    y += 20;

    // Draw table rows
    doc.font("Helvetica").fontSize(9).lineGap(4);
    registrations.forEach((registration, index) => {
      if (y > 750) {
        doc.addPage();
        y = 50;
        // Redraw the header on the new page
        doc.font("Helvetica-Bold").fontSize(10);
        columns.forEach((column, i) => {
          doc.text(
            column.header,
            50 + columns.slice(0, i).reduce((sum, col) => sum + col.width, 0),
            y,
            { width: column.width, align: "left" }
          );
        });
        doc
          .moveTo(50, y + 15)
          .lineTo(550, y + 15)
          .stroke();
        y += 20;
        doc.font("Helvetica").fontSize(9).lineGap(4);
      }

      try {
        let x = 50;

        // SN (Serial Number)
        doc.text((index + 1).toString(), x, y, {
          width: columns[0].width,
          align: "left",
        });
        x += columns[0].width;

        // Name
        doc.text(registration.fullName || "N/A", x, y, {
          width: columns[1].width,
          align: "left",
        });
        x += columns[1].width;

        // Email
        doc.text(registration.email || "N/A", x, y, {
          width: columns[2].width,
          align: "left",
        });
        x += columns[2].width;

        // Contact
        doc.text(registration.contactNo || "N/A", x, y, {
          width: columns[3].width,
          align: "left",
        });
        x += columns[3].width;

        // Sports
        doc.text(registration.sports || "N/A", x, y, {
          width: columns[4].width,
          align: "left",
        });
        x += columns[4].width;

        // Category
        doc.text(registration.category || "N/A", x, y, {
          width: columns[5].width,
          align: "left",
        });
        x += columns[5].width;

        // Payment Status
        doc.text(registration.paymentStatus || "N/A", x, y, {
          width: columns[6].width,
          align: "left",
        });
        x += columns[6].width;

        // Date
        doc.text(
          registration.createdAt
            ? new Date(registration.createdAt).toLocaleDateString()
            : "N/A",
          x,
          y,
          {
            width: columns[7].width,
            align: "left",
          }
        );
      } catch (error) {
        console.error("Error processing registration:", error);
        console.error(
          "Problematic registration:",
          JSON.stringify(registration, null, 2)
        );
      }
      y += 20;
    });

    // Add page numbers
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc.text(`Page ${i + 1} of ${pageCount}`, 50, 800, {
        align: "center",
      });
    }

    return new Promise((resolve, reject) => {
      doc.end();
      stream.on("finish", () => {
        resolve(pdfFileName);
      });
      stream.on("error", (error) => {
        console.error("Error writing PDF file:", error);
        reject(error);
      });
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
