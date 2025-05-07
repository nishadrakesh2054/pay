import {  TDCParticipation } from "../models/init.Model.js";
import { Components } from "./components.js";
import { generatePDF } from "./pdfgenerator.js";

export const TDCparticipationResource = {
  resource: TDCParticipation,
  options: {
    navigation: {
      name: "Thunderbolts Dev Center",
      icon: "Event",
    },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin &&
        (currentAdmin.role === "Super Admin" || currentAdmin.role === "Front desk" || currentAdmin.role === "Finance Manager"),
    },
      show: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin &&
        (currentAdmin.role === "Super Admin" || currentAdmin.role === "Front desk" || currentAdmin.role === "Finance Manager"),
    },
      edit: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin" ,
      },
      new: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "SuperAdmin",
      },

      delete: {
        isAccessible: ({ currentAdmin }) =>
          currentAdmin && currentAdmin.role === "Super Admin",
      },

      generatePDF: {
        actionType: "resource",
        component: Components.downloadPdf,
        handler: async (request, response, context) => {
          const { startDate, endDate } = request.payload;
          const pdfFileName = await generatePDF(
            new Date(startDate),
            new Date(endDate)
          );
          return {
            url: `/api/download-participations/${pdfFileName}`,
            msg: "PDF generated successfully",
          };
        },
        isAccessible: ({ currentAdmin }) =>
          currentAdmin &&
        (currentAdmin.role === "Admin" || currentAdmin.role === "Front desk" || currentAdmin.role === "Finance Manager"),
    },
    },
    properties: {
      id: {
        isVisible: {
          list: true,
          filter: false,
          show: true,
          edit: false,
        },
      },
      updatedAt: {
        isVisible: {
          list: false,
          filter: false,
          show: true,
          edit: false,
        },
      },
      schoolId: {
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
      gameId: {
        isVisible: {
          list: true,
          filter: true,
          show: true,
          edit: true,
        },
      },
    },
  },
};
