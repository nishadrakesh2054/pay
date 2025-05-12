import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import uploadFeature from "@adminjs/upload";
import AdminJS, { ComponentLoader } from "adminjs";

import {
  Academy,
  Contact,
  //   Game,
  Partners,
  Program,
  //   RegistrationPayment,
  //   School,
  SpecialCamps,
} from "../models/init.Model.js";
import authenticate from "./authenticateUser.js";
import { galleryResource } from "./gallery.Resource.js";
// import { participationResource } from "./participation.Resources.js";
import { userResource } from "./user.Resourse.js";
import {
  ageGroup,
  //   manualRegistration,
  //   certificateResource,
  //   pointsTableResource,
  //   gamePointsTableResource,
  //   gameGroupResource,
  applicationResource,
  careerResource,
  FixtureResource,
  ResultFixtureResource,
  TableFixtureResource,
  gameTeamResource,
  playerResource,
  GameFixtureResource,
  FootballManualRegistrationResource,
  TDCManualRegResource,
  ThundersRegistration,
  // PaymentTDC,
} from "./models.Resource.js";
import { componentLoader } from "./components.js";
import importExportFeature from "@adminjs/import-export";

AdminJS.registerAdapter(AdminJSSequelize);
// Local provider configuration for file uploads
const localProvider = {
  bucket: "public/uploads",
  opts: {
    baseUrl: "/uploads",
  },
};

// Initialize AdminJS
const admin = new AdminJS({
  componentLoader,

  resources: [
    /*----------------- Thunderbolts Development  Center Registration  start----------- */
    {
      ...ThundersRegistration,
      features: [importExportFeature({ componentLoader })],
    },
    {
      ...TDCManualRegResource,
      features: [importExportFeature({ componentLoader })],
    },
    // ThundersRegistration,
    // PaymentTDC,
    /*----------------- Thunderbolts Development  resources end----------- */

    /*----------------- Football League  resources start   RAKESH CODE   ----------- */
    FootballManualRegistrationResource,
    FixtureResource,
    GameFixtureResource,
    ResultFixtureResource,
    TableFixtureResource,
    gameTeamResource,
    playerResource,
    /*----------------- Football League  resources end   RAKESH CODE   ----------- */

    /*----------------- Thunderbolts cup resources start----------- */
    // {
    //   resource: RegistrationPayment,
    //   options: {
    //     navigation: {
    //       name: "Thunderbolts Cup",
    //       icon: "Money",
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
    //           currentAdmin && currentAdmin.role === "Admin",
    //       },
    //       list: {
    //         isAccessible: ({ currentAdmin }) =>
    //           currentAdmin && currentAdmin.role === "Admin",
    //       },
    //     },
    //   },
    // },
    // manualRegistration,
    // certificateResource,
    // {
    //   resource: Game,
    //   options: {
    //     navigation: {
    //       name: "Thunderbolts Cup",
    //       icon: "Event",
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
    // },
    // {
    //   resource: School,
    //   options: {
    //     navigation: {
    //       name: "Thunderbolts Cup",
    //       icon: "Event",
    //     },
    //     actions: {
    //       list: {
    //         isAccessible: ({ currentAdmin }) =>
    //           currentAdmin &&
    //         (currentAdmin.role === "Admin" || currentAdmin.role === "Front desk" || currentAdmin.role === "Finance Manager"),

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
    //         (currentAdmin.role === "Admin" || currentAdmin.role === "Front desk" || currentAdmin.role === "Finance Manager"),

    //       },
    //       delete: {
    //         isAccessible: ({ currentAdmin }) =>
    //           currentAdmin && currentAdmin.role === "Admin",
    //       },
    //     },
    //   },
    // },
    // participationResource,
    /*----------------- Thunderbolts cup resources end----------- */

    /*----------------- Academy Management resources start----------- */
    ageGroup,
    {
      resource: Partners,
      options: {
        navigation: { name: "Academy Management", icon: "User" },
        properties: {
          image: {
            type: "file", // Ensures the field is treated as a file upload
            isVisible: {
              list: true,
              edit: true,
              filter: true,
              show: true,
            },
          },
          imageKey: { isVisible: false },
          bucket: { isVisible: false },
          mime: { isVisible: false },
        },
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
            mimeTypes: ["image/png", "image/jpeg", "image/webp"], // Validate file types
          },
        }),
      ],
    },
    {
      resource: Academy,
      options: {
        navigation: { name: "Academy Management", icon: "Building" },
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
      },
    },
    {
      resource: Program,
      options: {
        navigation: { name: "Academy Management", icon: "Archive" },
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
            isVisible: {
              list: true,
              edit: true,
              filter: true,
              show: true,
            },
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
    },
    /*----------------- Academy Management resources end----------- */

    /*----------------- Points resources end----------- */
    // pointsTableResource,
    /*----------------- Points resources start----------- */

    /*----------------- Tournament resources start----------- */
    // gamePointsTableResource,
    // gameGroupResource,
    /*----------------- Tournament resources end----------- */

    /*----------------- Career resources start----------- */
    applicationResource,
    careerResource,
    /*----------------- Career resources end----------- */

    /*----------------- Events Media Communication   User resources start----------- */
    {
      resource: SpecialCamps,
      options: {
        navigation: { name: "Events", icon: "Flag" },
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
            isVisible: {
              list: true,
              edit: true,
              filter: true,
              show: true,
            },
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
    },
    galleryResource,

    {
      resource: Contact,
      options: {
        navigation: { name: "Communications", icon: "Chat" },
        actions: {
          list: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin &&
              (currentAdmin.role === "Super Admin" ||
                currentAdmin.role === "Admin" ||
                currentAdmin.role === "Front desk"),
          },
          edit: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin &&
              (currentAdmin.role === "Super Admin" ||
                currentAdmin.role === "Admin" ||
                currentAdmin.role === "Front desk"),
          },
          new: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin &&
              (currentAdmin.role === "Super Admin" ||
                currentAdmin.role === "Admin" ||
                currentAdmin.role === "Front desk"),
          },
          show: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin &&
              (currentAdmin.role === "Super Admin" ||
                currentAdmin.role === "Admin" ||
                currentAdmin.role === "Front desk"),
          },
          delete: {
            isAccessible: ({ currentAdmin }) =>
              currentAdmin &&
              (currentAdmin.role === "Super Admin" ||
                currentAdmin.role === "Admin" ||
                currentAdmin.role === "Front desk"),
          },
        },
        listProperties: [
          "id",
          "firstName",
          "lastName",
          "email",
          "phone",
          "notes",
          "message",
        ],
        showProperties: [
          "id",
          "firstName",
          "lastName",
          "email",
          "phone",
          "message",
          "notes",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          message: {
            type: "textarea",
            props: {
              rows: 10,
            },
          },
        },
      },
    },

    userResource,

    /*----------------- Events Media Communication   User resources end----------- */
  ],
  rootPath: "/admin",
  branding: {
    companyName: "THUNDERBOLTS",
    logo: "/tdc-logo.png",
    softwareBrothers: false,
  },
  assets: {
    css: ["/admin-custom.css"],
    js: ["/custom-editor.js"],
  },
});

admin.watch();
// Set up the authentication middleware
const auth = {
  authenticate,
  cookieName: "adminjs",
  cookiePassword: process.env.COOKIE_PASSWORD || "some-secret-password",
};

// Build AdminJS router with authentication
const router = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  auth,
  AdminJSExpress.options
);

console.log("AdminJS initialized");

export default router;
