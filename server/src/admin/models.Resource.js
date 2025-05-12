import AdminJSSequelize from "@adminjs/sequelize";
import uploadFeature from "@adminjs/upload";
import AdminJS from "adminjs";

import path from "path";

import {
  //   Certificate,
  //   ManualRegistration,
  //   PointsTable,
  //   GamePointsTable,
  //   GameGroup,
  Career,
  Application,
  AgeGroup,
} from "../models/init.Model.js";
// import { generateCertificates } from "./certificateGenerator.js";
import { Components, componentLoader } from "./components.js";
// import fs from "fs";

import Fixture from "../models/RKmodel/dateFixtures.Model.js";
import ResultFixture from "../models/RKmodel/resultFixture.Model.js";
import GameFixture from "../models/RKmodel/gameFixture.Model.js";
import TableFixture from "../models/RKmodel/tableFixture.Model.js";
import gameTeam from "../models/RKmodel/team.Model.js";
import Player from "../models/RKmodel/player.Model.js";
import FootballManualRegistration from "../models/RKmodel/Registration.Model.js";

import FootballManualReg from "../models/NewTdc/manualReg.Model.js";
import ThunderBoltsReg from "../models/NewTdc/RegisterForm.Model.js";
// import NewPaymentTDC from "../models/NewTdc/Payment.Model.js";

// import { generatePDF } from "./pdfgenerator.js";

AdminJS.registerAdapter(AdminJSSequelize);

// Local provider configuration for file uploads
const localProvider = {
  bucket: "public/uploads", // Directory to store uploaded files
  opts: {
    baseUrl: "/uploads", // The URL base to access the uploaded files
  },
};

/*-------------------- New TDC Registration model start--------------------*/
// export const ThundersRegistration = {
//   resource: ThunderBoltsReg,
//   options: {
//     navigation: {
//       name: "TDC REGISTRATION",
//     },
//     listProperties: [
//       "fullName",
//       "email",
//       "contactNo",
//       "gender",
//       "age",
//       "sports",
//       "category",
//       "days",
//       "time",
//     ],
//     editProperties: [
//       "fullName",
//       "address",
//       "contactNo",
//       "email",
//       "dob",
//       "age",
//       "gender",
//       "schoolName",
//       "parentName",
//       "parentEmail",
//       "parentContactNo",
//       "parentAddress",
//       "sports",
//       "category",
//       "days",
//       "time",
//       "emergencyContactname",
//       "emergencyContactNumber",
//       "hasMedicalConditions",
//       "medicalDetails",
//       "hasMedicalInsurance",
//       "insuranceNo",
//       "transportation",
//       "notes",
//       "agreement",

//       "prn",
//     ],
//     showProperties: [
//       "fullName",
//       "address",
//       "contactNo",
//       "email",
//       "dob",
//       "age",
//       "gender",
//       "schoolName",
//       "parentName",
//       "parentEmail",
//       "parentContactNo",
//       "parentAddress",
//       "sports",
//       "category",
//       "time",
//       "days",
//       "emergencyContactname",
//       "emergencyContactNumber",
//       "hasMedicalConditions",
//       "medicalDetails",
//       "hasMedicalInsurance",
//       "insuranceNo",
//       "transportation",
//       "notes",
//       "agreement",
//       "prn",
//     ],

//     actions: {
//       list: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       edit: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       new: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       show: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       delete: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//     },
//   },
// };

export const ThundersRegistration = {
  resource: ThunderBoltsReg,
  options: {
    navigation: {
      name: "TDC REGISTRATION",
    },
    listProperties: [
      "id",
      "fullName",
      "email",
      "contactNo",
      "sports",
      "category",
      "days",
      "time",
      "paymentStatus",
    ],
    editProperties: [
      "fullName",
      "address",
      "contactNo",
      "email",
      "dob",
      "age",
      "gender",
      "schoolName",
      "parentName",
      "parentEmail",
      "parentContactNo",
      "parentAddress",
      "sports",
      "category",
      "days",
      "time",
      "emergencyContactname",
      "emergencyContactNumber",
      "hasMedicalConditions",
      "medicalDetails",
      "hasMedicalInsurance",
      "insuranceNo",
      "transportation",
      "notes",
      "agreement",
      "amount",
      "paymentStatus",
      "paymentMethod",
    ],
    showProperties: [
      "fullName",
      "address",
      "contactNo",
      "email",
      "dob",
      "age",
      "gender",
      "schoolName",
      "parentName",
      "parentEmail",
      "parentContactNo",
      "parentAddress",
      "sports",
      "category",
      "time",
      "days",
      "emergencyContactname",
      "emergencyContactNumber",
      "hasMedicalConditions",
      "medicalDetails",
      "hasMedicalInsurance",
      "insuranceNo",
      "transportation",
      "notes",
      "agreement",
      "amount",
      "paymentStatus",
      "paymentMethod",
      "createdAt",
      "updatedAt"
    ],

    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          (currentAdmin && currentAdmin.role === "Super Admin") ||
          currentAdmin.role === "Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          (currentAdmin && currentAdmin.role === "Super Admin") ||
          currentAdmin.role === "Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          (currentAdmin && currentAdmin.role === "Super Admin") ||
          currentAdmin.role === "Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          (currentAdmin && currentAdmin.role === "Super Admin") ||
          currentAdmin.role === "Admin",
      },
    //   generatePDF: {
    //     actionType: "resource",
    //     component: Components.downloadPdf,
    //     handler: async (request, response, context) => {
    //       const { startDate, endDate } = request.payload;
    //       const pdfFileName = await generatePDF(
    //         new Date(startDate),
    //         new Date(endDate)
    //       );
    //       return {
    //         url: `/api/download-registrations/${pdfFileName}`,
    //         msg: "PDF generated successfully",
    //       };
    //     },
    //     isAccessible: ({ currentAdmin }) =>
    //       currentAdmin &&
    //       (currentAdmin.role === "Admin" ||
    //         currentAdmin.role === "Front desk" ||
    //         currentAdmin.role === "Finance Manager"),
    //   },
    },
  },
};

// export const PaymentTDC = {
//   resource: NewPaymentTDC,
//   options: {
//     navigation: {
//       name: "TDC REGISTRATION",
//     },
//     listProperties: [
//       "id",
//       "fullName",
//       "email",
//       "sports",
//       "amount",
//       "category",
//       "time",
//       "days",
//       "paymentMethod",
//       "status",
//     ],
//     editProperties: ["status"],
//     properties: {
//       updatedAt: { isVisible: false },
//       createdAt: { isVisible: false },
//     },
//     actions: {
//       list: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin &&
//           (currentAdmin.role === "Admin" ||
//             currentAdmin.role === "Front desk" ||
//             currentAdmin.role === "Finance Manager"),
//       },
//       edit: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       new: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       show: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin &&
//           (currentAdmin.role === "Admin" ||
//             currentAdmin.role === "Front desk" ||
//             currentAdmin.role === "Finance Manager"),
//       },
//       delete: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//     },
//   },
// };
export const TDCManualRegResource = {
  resource: FootballManualReg,
  options: {
    navigation: {
      name: "TDC REGISTRATION",
    },
    properties: {
      agreement: { isVisible: true },
      paymentType: { isVisible: true },
      totalAmount: { isVisible: true },

      emergencyContactPersonName: { isVisible: true },
      emergencyContactPersonNumber: { isVisible: true },
      trainingTime: { isVisible: true },
      trainingDays: { isVisible: true },
      hasMedicalConditions: {
        type: "boolean",
        isVisible: true,
      },
      medicalDetails: {
        isVisible: true,
      },

      hasMedicalInsurance: {
        type: "boolean",
        isVisible: true,
      },
      insuranceNo: {
        isVisible: true,
      },
      transportation: {
        isVisible: true,
        type: "boolean",
        labels: {
          true: "Yes",
          false: "No",
        },
      },

      sportsCategory: { isVisible: true },
      sports: { isVisible: true },
      parentAddress: { isVisible: true },
      parentContactNo: { isVisible: true },
      parentEmail: {
        isVisible: { list: false, filter: true, show: true, edit: true },
      },
      parentName: { isVisible: true },
      schoolName: { isVisible: true },
      gender: { isVisible: true },
      age: { isVisible: true },

      DateOfBirth: { isVisible: true },
      ContactNo: { isVisible: true },
      address: { isVisible: true },
      fullName: { isVisible: true, position: 1, label: "Full Name" },
      email: { isVisible: true, position: 2, label: "Email Address" },
      updatedAt: { isVisible: false },
      createdAt: { isVisible: false },
    },

    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          (currentAdmin && currentAdmin.role === "Super Admin") ||
          currentAdmin.role === "Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          (currentAdmin && currentAdmin.role === "Super Admin") ||
          currentAdmin.role === "Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          (currentAdmin && currentAdmin.role === "Super Admin") ||
          currentAdmin.role === "Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          (currentAdmin && currentAdmin.role === "Super Admin") ||
          currentAdmin.role === "Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          (currentAdmin && currentAdmin.role === "Super Admin") ||
          currentAdmin.role === "Admin",
      },
    },
  },
};

// Ensure to add the componentLoader in this resource
// export const manualRegistration = {
//   resource: ManualRegistration,
//   options: {
//     navigation: {
//       name: "Thunderbolts Cup",
//     },
//     properties: {
//       noOfParticipants: {
//         isVisible: ({ record }) => record && record.gameType === "Individual",
//       },
//       totalAmount: {
//         isVisible: true,
//         isDisabled: true,
//       },
//       updatedAt: {
//         isVisible: {
//           list: false,
//           filter: false,
//           show: true,
//           edit: false,
//         },
//       },
//       schoolEmail: {
//         isVisible: {
//           list: false,
//           filter: true,
//           show: true,
//           edit: true,
//         },
//       },
//       createdAt: {
//         isVisible: {
//           list: false,
//           filter: false,
//           show: true,
//           edit: false,
//         },
//       },
//     },
//     listProperties: [
//       "id",
//       "schoolName",
//       "schoolContactNo",
//       "gameName",
//       "gameType",
//       "gameCategory",
//       "noOfParticipants",
//       "gameFee",
//       "totalAmount",
//     ],
//     actions: {
//       new: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin &&
//           (currentAdmin.role === "Admin" ||
//             currentAdmin.role === "Front desk" ||
//             currentAdmin.role === "Finance Manager"),
//         before: async (request) => {
//           if (request.payload.gameType === "Individual") {
//             request.payload.totalAmount =
//               request.payload.gameFee * (request.payload.noOfParticipants || 1);
//           } else {
//             request.payload.totalAmount = request.payload.gameFee;
//           }
//           return request;
//         },
//       },
//       edit: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//         before: async (request) => {
//           if (request.payload.gameType === "Individual") {
//             request.payload.totalAmount =
//               request.payload.gameFee * (request.payload.noOfParticipants || 1);
//           } else {
//             request.payload.totalAmount = request.payload.gameFee;
//           }
//           return request;
//         },
//       },
//       delete: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       show: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin &&
//           (currentAdmin.role === "Admin" ||
//             currentAdmin.role === "Front desk" ||
//             currentAdmin.role === "Finance Manager"),
//       },
//       list: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin &&
//           (currentAdmin.role === "Admin" ||
//             currentAdmin.role === "Front desk" ||
//             currentAdmin.role === "Finance Manager"),
//       },
//     },
//   },
// };

// export const pointsTableResource = {
//   resource: PointsTable,
//   options: {
//     navigation: { name: "Points" },

//     properties: {
//       schoolName: { position: 1 },
//       goldFirst: { position: 2 },
//       silverSecond: { position: 3 },
//       bronzeThird: { position: 4 },
//       totalPoints: {
//         position: 5,
//         isDisabled: true,
//       },
//       position: {
//         position: 6,
//         isDisabled: true,
//       },
//       id: {
//         isVisible: false,
//       },
//       createdAt: {
//         isVisible: false,
//       },
//       updatedAt: {
//         isVisible: false,
//       },
//     },
//     actions: {
//       new: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       edit: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       delete: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       show: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin &&
//           (currentAdmin.role === "Admin" ||
//             currentAdmin.role === "Front desk" ||
//             currentAdmin.role === "Finance Manager"),
//       },
//       list: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin &&
//           (currentAdmin.role === "Admin" ||
//             currentAdmin.role === "Front desk" ||
//             currentAdmin.role === "Finance Manager"),
//       },
//     },
//   },
// };

export const ageGroup = {
  resource: AgeGroup,
  options: {
    navigation: { name: "Academy Management" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
    },
    properties: {
      description: {
        type: "textarea",
        props: {
          rows: 10,
        },
      },
      image: {
        type: "file", // Ensures the field is treated as a file upload
        isVisible: { list: true, edit: true, filter: true, show: true },
      },
      imageKey: { isVisible: false },
      bucket: { isVisible: false },
      mime: { isVisible: false },
    },
  },
  features: [
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        file: "image", // Model field where the file is stored
        key: "imageKey", // Field to store file key/path
        bucket: "bucket", // Field to store the bucket/folder name
        mimeType: "mime", // Field to store MIME type
      },
      validation: {
        mimeTypes: ["image/png", "image/jpeg"], // Validate file types
      },
    }),
  ],
};

// export const certificateResource = {
//   resource: Certificate,
//   options: {
//     navigation: { name: "Thunderbolts Cup" },
//     actions: {
//       list: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       edit: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       new: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       show: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       delete: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       generateCertificates: {
//         actionType: "record",
//         component: Components.GenerateCertificates,
//         handler: async (request, response, context) => {
//           const { record, currentAdmin } = context;

//           try {
//             if (!record.params.excelFileKey) {
//               throw new Error(
//                 "Excel file not found. Please upload an Excel file before generating certificates."
//               );
//             }

//             const excelFilePath = path.join(
//               process.cwd(),
//               record.params.bucket,
//               record.params.excelFileKey
//             );

//             if (!fs.existsSync(excelFilePath)) {
//               throw new Error(`Excel file not found at path: ${excelFilePath}`);
//             }

//             const { outputDir, generatedFiles } = await generateCertificates(
//               excelFilePath
//             );

//             // Update the record with the paths to the generated PNGs
//             await record.update({
//               generatedCertificates: JSON.stringify(generatedFiles),
//             });

//             return {
//               record: record.toJSON(),
//               msg: "Certificate overlays generated successfully!",
//               overlayUrls: generatedFiles.map(
//                 (file) => `/generated_certificates/${path.basename(file)}`
//               ),
//             };
//           } catch (error) {
//             console.error("Error generating certificates:", error);
//             throw new Error(
//               `Failed to generate certificates: ${error.message}`
//             );
//           }
//         },
//       },
//     },
//     properties: {
//       excelFile: {
//         type: "file",
//         isVisible: { list: true, edit: true, filter: true, show: true },
//       },
//       generatedCertificates: {
//         type: "file",
//         isVisible: {
//           list: true,
//           edit: false,
//           filter: true,
//           show: true,
//         },
//       },
//       excelFileKey: { isVisible: false },
//       bucket: { isVisible: false },
//       mime: { isVisible: false },
//     },
//   },
//   features: [
//     uploadFeature({
//       componentLoader,
//       provider: { local: localProvider },
//       properties: {
//         file: "excelFile", // Model field where the file is stored
//         key: "excelFileKey", // Field to store file key/path
//         bucket: "bucket", // Field to store the bucket/folder name
//         mimeType: "mime", // Field to store MIME type
//       },
//       validation: {
//         mimeTypes: [
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//           "application/vnd.ms-excel",
//         ],
//       },
//     }),
//   ],
// };

// export const gamePointsTableResource = {
//   resource: GamePointsTable,
//   options: {
//     navigation: {
//       name: "Tournament Management",
//     },
//     properties: {
//       schoolId: {
//         isVisible: {
//           list: true,
//           filter: true,
//           show: true,
//           edit: true,
//         },
//       },
//       gameId: {
//         isVisible: { list: true, filter: true, show: true, edit: true },
//         reference: "Game",
//         availableValues: async () => {
//           const games = await Game.findAll();
//           return games.map((game) => ({
//             value: game.id,
//             label: game.nameWithCategory,
//           }));
//         },
//       },
//       groupId: {
//         isVisible: { list: true, filter: true, show: true, edit: true },
//       },
//       played: {
//         isVisible: {
//           list: true,
//           filter: true,
//           show: true,
//           edit: true,
//         },
//       },
//       won: {
//         isVisible: {
//           list: true,
//           filter: true,
//           show: true,
//           edit: true,
//         },
//       },
//       lost: {
//         isVisible: {
//           list: true,
//           filter: true,
//           show: true,
//           edit: true,
//         },
//       },
//       drawn: {
//         isVisible: {
//           list: true,
//           filter: true,
//           show: true,
//           edit: true,
//         },
//       },
//       points: {
//         isVisible: {
//           list: true,
//           filter: true,
//           show: true,
//           edit: true,
//         },
//       },
//       additionalStats: {
//         isVisible: {
//           list: false,
//           filter: false,
//           show: true,
//           edit: true,
//         },
//       },
//     },
//     actions: {
//       new: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       edit: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       delete: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       show: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin &&
//           (currentAdmin.role === "Admin" ||
//             currentAdmin.role === "Front desk" ||
//             currentAdmin.role === "Finance Manager"),
//       },
//       list: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin &&
//           (currentAdmin.role === "Admin" ||
//             currentAdmin.role === "Front desk" ||
//             currentAdmin.role === "Finance Manager"),
//       },
//     },
//   },
// };

// export const gameGroupResource = {
//   resource: GameGroup,
//   options: {
//     navigation: {
//       name: "Tournament Management",
//       icon: "Group",
//     },
//     properties: {
//       name: {
//         isTitle: true,
//       },
//       description: {
//         type: "textarea",
//       },
//       gameId: {
//         isVisible: { list: true, filter: true, show: true, edit: true },
//       },
//     },
//     actions: {
//       new: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       edit: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       delete: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin && currentAdmin.role === "Admin",
//       },
//       show: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin &&
//           (currentAdmin.role === "Admin" ||
//             currentAdmin.role === "Front desk" ||
//             currentAdmin.role === "Finance Manager"),
//       },
//       list: {
//         isAccessible: ({ currentAdmin }) =>
//           currentAdmin &&
//           (currentAdmin.role === "Admin" ||
//             currentAdmin.role === "Front desk" ||
//             currentAdmin.role === "Finance Manager"),
//       },
//     },
//   },
// };

export const careerResource = {
  resource: Career,
  options: {
    navigation: { name: "Careers", icon: "Briefcase" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
    },
    properties: {
      description: {
        type: "richtext",
        custom: {
          quill: {
            modules: {
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{ header: 1 }, { header: 2 }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ direction: "rtl" }],
                [{ size: ["small", false, "large", "huge"] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],
                ["clean"],
              ],
            },
            theme: "snow",
            placeholder: "Type your content here...",
            bounds: ".admin-bro_Edit",
          },
        },
      },
    },
  },
};

// Application resource configuration
export const applicationResource = {
  resource: Application,
  options: {
    navigation: { name: "Careers", icon: "Briefcase" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },
    },
    properties: {
      resumeUrl: {
        components: {
          list: Components.ResumeDownloadButton,
          show: Components.ResumeDownloadButton,
        },
      },
      status: {
        availableValues: [
          { value: "pending", label: "Pending" },
          { value: "reviewed", label: "Reviewed" },
          { value: "interviewed", label: "Interviewed" },
          { value: "accepted", label: "Accepted" },
          { value: "rejected", label: "Rejected" },
        ],
      },
      appliedDate: {
        isVisible: {
          list: true,
          edit: false,
          filter: true,
          show: true,
        },
      },
      careerId: {
        isVisible: { list: true, edit: true, filter: true, show: true },
        reference: "careers",
      },
    },
  },
};

/*-------------------- Football League  model start--------------------*/

export const FixtureResource = {
  resource: Fixture,
  options: {
    navigation: { name: "Football League", icon: "School" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
    },
    properties: {
      date: {
        isVisible: true,
      },
    },
  },
};

export const ResultFixtureResource = {
  resource: ResultFixture,
  options: {
    navigation: { name: "Football League", icon: "School" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
    },
    properties: {
      id: { isVisible: false },
      fixture_date: { isVisible: true },
      location: { isVisible: true },
      time: { isVisible: true },
      image1: {
        type: "file",
        isVisible: { list: true, edit: true, filter: true, show: true },
      },
      imageKey1: { isVisible: false },
      bucket1: { isVisible: false },
      mime1: { isVisible: false },

      image2: {
        type: "file",
        isVisible: { list: true, edit: true, filter: true, show: true },
      },
      imageKey2: { isVisible: false },
      bucket2: { isVisible: false },
      mime2: { isVisible: false },
    },
  },
  features: [
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        file: "image1",
        key: "imageKey1",
        bucket: "bucket1",
        mimeType: "mime1",
        filePath: "filePath1",
        filesToDelete: "filesToDelete1",
      },
      validation: {
        mimeTypes: ["image/png", "image/jpeg"],
      },
    }),

    // Second upload feature for image2
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        file: "image2",
        key: "imageKey2",
        bucket: "bucket2",
        mimeType: "mime2",
        filePath: "filePath2",
        filesToDelete: "filesToDelete2",
      },
      validation: {
        mimeTypes: ["image/png", "image/jpeg"],
      },
    }),
  ],
};

export const TableFixtureResource = {
  resource: TableFixture,
  options: {
    navigation: { name: "Football League", icon: "School" },
    properties: {
      // Define the order of fields
      id: { isVisible: false },
      position: { position: 1 },
      teamName: { position: 2 },
      played: { position: 3 },
      won: { position: 4 },
      drawn: { position: 5 },
      lost: { position: 6 },
      GF: { position: 7 },
      GA: { position: 8 },
      GD: { position: 9 },
      points: { position: 10 },
    },
    listProperties: [
      "position",
      "teamName",
      "played",
      "won",
      "drawn",
      "lost",
      "GF",
      "GA",
      "GD",
      "points", // Include points in the list view
    ],
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
    },
  },
};

export const gameTeamResource = {
  resource: gameTeam,
  options: {
    navigation: { name: "Football League", icon: "School" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
    },
    properties: {
      id: { isVisible: false },
      team_name: { isVisible: true },

      team_logo: {
        type: "file",
        isVisible: { list: true, edit: true, filter: true, show: true },
      },

      team_details: {
        type: "textarea",
        props: {
          rows: 6,
        },
      },

      updatedAt: { isVisible: false },
      createdAt: { isVisible: false },
      imageKey: { isVisible: false },
      bucket: { isVisible: false },
      mime: { isVisible: false },
    },
  },

  features: [
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        file: "team_logo",
        key: "imageKey",
        bucket: "bucket",
        mimeType: "mime",
      },
      validation: {
        mimeTypes: ["image/png", "image/jpeg"],
      },
    }),
  ],
};

export const playerResource = {
  resource: Player,
  options: {
    navigation: { name: "Football League", icon: "School" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
    },
    properties: {
      id: { isVisible: false },
      teamId: {
        isVisible: true,
      },
      player_image: {
        type: "file",
        isVisible: { list: true, edit: true, filter: true, show: true },
      },
      player_name: { isVisible: true },
      updatedAt: { isVisible: false },
      createdAt: { isVisible: false },
      imageKey: { isVisible: false },
      bucket: { isVisible: false },
      mime: { isVisible: false },
    },
  },

  features: [
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        file: "player_image",
        key: "imageKey",
        bucket: "bucket",
        mimeType: "mime",
      },
      validation: {
        mimeTypes: ["image/png", "image/jpeg"],
      },
    }),
  ],
};
export const GameFixtureResource = {
  resource: GameFixture,
  options: {
    navigation: { name: "Football League", icon: "School" },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
    },
    properties: {
      id: { isVisible: false },
      fixture_date: { isVisible: true },
      location: { isVisible: true },
      time: { isVisible: true },
      image1: {
        type: "file",
        isVisible: { list: true, edit: true, filter: true, show: true },
      },
      imageKey1: { isVisible: false },
      bucket1: { isVisible: false },
      mime1: { isVisible: false },

      image2: {
        type: "file",
        isVisible: { list: true, edit: true, filter: true, show: true },
      },
      imageKey2: { isVisible: false },
      bucket2: { isVisible: false },
      mime2: { isVisible: false },
    },
  },
  features: [
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        file: "image1",
        key: "imageKey1",
        bucket: "bucket1",
        mimeType: "mime1",
        filePath: "filePath1",
        filesToDelete: "filesToDelete1",
      },
      validation: {
        mimeTypes: ["image/png", "image/jpeg"],
      },
    }),

    // Second upload feature for image2
    uploadFeature({
      componentLoader,
      provider: { local: localProvider },
      properties: {
        file: "image2",
        key: "imageKey2",
        bucket: "bucket2",
        mimeType: "mime2",
        filePath: "filePath2",
        filesToDelete: "filesToDelete2",
      },
      validation: {
        mimeTypes: ["image/png", "image/jpeg"],
      },
    }),
  ],
};

export const FootballManualRegistrationResource = {
  resource: FootballManualRegistration,
  options: {
    navigation: {
      name: "Football League",
    },
    properties: {
      gameFee: { isVisible: true },
      paymentType: { isVisible: true },
      noOfParticipants: { isVisible: true },
      gameCategory: { isVisible: true },
      gameName: { isVisible: true },
      schoolEmail: {
        isVisible: { list: false, filter: true, show: true, edit: true },
      },
      schoolContactNo: { isVisible: true },
      schoolName: { isVisible: true },
      updatedAt: {
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
      createdAt: {
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
    },
    //   listProperties: [
    //     "id",
    //     "schoolName",
    //     "schoolContactNo",
    //     "gameName",
    //     "gameCategory",
    //     "noOfParticipants",
    //     "gameFee",
    //     "totalAmount",
    //   ],
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" || currentAdmin.role === "Event Manager",
      },
    },
  },
};
/*-------------------- Football League  model end--------------------*/
