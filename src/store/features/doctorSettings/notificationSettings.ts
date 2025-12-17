// import { baseAPI } from "@/store/api/baseApi";


// export const notificationSettingsApi = baseAPI.injectEndpoints({
//   endpoints: (builder) => ({
//     // GET notification settings
//     getNotificationSettings: builder.query({
//       query: () =>  "/settings/doctor/notification", 
//       providesTags: ["Doctor"],
//     }),

//     // UPDATE notification settings
//     updateNotificationSettings: builder.mutation({
//       query: (body) => ({
//         url:  "/settings/doctor/notification", 
//         method: "PATCH",
//         body,
//       }),
//       invalidatesTags: ["Doctor"],
//     }),
//   }),
// });

// export const {
//   useGetNotificationSettingsQuery,
//   useUpdateNotificationSettingsMutation,
// } = notificationSettingsApi;




import { baseAPI } from "@/store/api/baseApi";

// ✅ Define proper types
interface NotificationSettingsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: NotificationSettingsData;
}

interface NotificationSettingsData {
  id: string;
  doctorId: string;
  appointmentReminders: boolean;
  patientUpdates: boolean;
  callLogs: boolean;
  taskDeadlines: boolean;
  securityAlerts: boolean;
  emailNotifications: boolean;
  createdAt: string;
  updatedAt: string;
}

// interface NotificationSettingsInput {
//   appointmentReminders: boolean;
//   patientUpdates: boolean;
//   callLogs: boolean;
//   taskDeadlines: boolean;
//   securityAlerts: boolean;
//   emailNotifications: boolean;
// }

export const notificationSettingsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationSettings: builder.query<NotificationSettingsData, void>({
      query: () => ({
        url: "/settings/doctor/notification",
        method: "GET",
      }),
      providesTags: ["NotificationSettings"],
      transformResponse: (response: NotificationSettingsResponse) => {
        console.log("Backend response:", response);
        return response.data;
      },
    }),



    updateNotificationSettings: builder.mutation<NotificationSettingsResponse, Partial<NotificationSettingsData>>({
      query: (body) => {
        // ✅ Destructure and use underscore for unused variables
        const { id: _id, doctorId: _doctorId, createdAt: _createdAt, updatedAt: _updatedAt, ...settings } = body;
        
        console.log("Sending to backend:", settings);
        
        return {
          url: "/settings/doctor/notification-update",
          method: "PATCH",
          body: settings,
        };
      },
      invalidatesTags: ["NotificationSettings"],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notificationSettingsApi.util.updateQueryData(
            'getNotificationSettings',
            undefined,
            (draft) => {
              Object.assign(draft, body);
            }
          )
        );
        
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.error("Update failed:", error);
        }
      },
    }),
  }),
});

export const {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} = notificationSettingsApi;