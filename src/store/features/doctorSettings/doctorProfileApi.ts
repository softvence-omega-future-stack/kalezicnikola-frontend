// // profileApi.ts
// import { baseAPI } from "@/store/api/baseApi";

// // ✅ Define proper types
// interface ProfileResponse {
//   statusCode: number;
//   success: boolean;
//   message: string;
//   data: ProfileData;
// }

// interface ProfileData {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   photo: string | null;
//   specialization: string;
//   licenseNumber: string;
//   dateOfBirth: string;
//   gender: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface UpdateProfileInput {
//   firstName?: string;
//   lastName?: string;
//   phone?: string;
//   photo?: string | null;
//   specialization?: string;
//   licenseNumber?: string;
//   dateOfBirth?: string;
//   gender?: string;
//   address?: string;
//   city?: string;
//   state?: string;
//   zipCode?: string;
// }

// interface DeleteAccountInput {
//   password: string;
// }

// interface DeleteAccountResponse {
//   statusCode: number;
//   success: boolean;
//   message: string;
// }

// export const profileApi = baseAPI.injectEndpoints({
//   endpoints: (builder) => ({
//     // GET profile
//     getMyProfile: builder.query<ProfileData, void>({
//       query: () => ({
//         url: "/doctor/my-profile",
//         method: "GET",
//       }),
//       providesTags: ["DoctorProfile"],
//       transformResponse: (response: ProfileResponse) => {
//         console.log("Profile data:", response);
//         return response.data;
//       },
//     }),

//     // UPDATE profile
//     updateMyProfile: builder.mutation<ProfileResponse, UpdateProfileInput>({
//       query: (body) => {
//         console.log("Updating profile:", body);
        
//         return {
//           url: "/doctor/update-my-profile",
//           method: "PATCH",
//           body,
//         };
//       },
//       invalidatesTags: ["DoctorProfile"],
//       async onQueryStarted(body, { dispatch, queryFulfilled }) {
//         const patchResult = dispatch(
//           profileApi.util.updateQueryData(
//             'getMyProfile',
//             undefined,
//             (draft) => {
//               Object.assign(draft, body);
//             }
//           )
//         );
        
//         try {
//           await queryFulfilled;
//         } catch (error) {
//           patchResult.undo();
//           console.error("Update profile failed:", error);
//         }
//       },
//     }),

//     // DELETE account
//     deleteMyAccount: builder.mutation<DeleteAccountResponse, DeleteAccountInput>({
//       query: (body) => {
//         console.log("Deleting account with password");
        
//         return {
//           url: "/auth/delete-my-account",
//           method: "DELETE",
//           body,
//         };
//       },
//       invalidatesTags: ["DoctorProfile"],
//     }),
//   }),
// });

// export const {
//   useGetMyProfileQuery,
//   useUpdateMyProfileMutation,
//   useDeleteMyAccountMutation,
// } = profileApi;


// ==================== profileApi.ts (Updated) ====================
import { baseAPI } from "@/store/api/baseApi";

// ✅ Updated types based on actual API response
interface ProfileResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    profile: ProfileData;
  };
}

interface ProfileData {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  licenceNo: string | null;
  specialities: string[];
  experience: string;
  dob: string;
  photo: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  address: string;
  emailVerifiedAt: string | null;
  twoFactorEnabled: boolean | null;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  photo?: string | null;
  specialities?: string[];
  licenceNo?: string;
  dob?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  address?: string;
  experience?: string;
}

interface DeleteAccountInput {
  password: string;
}

interface DeleteAccountResponse {
  statusCode: number;
  success: boolean;
  message: string;
}

export const profileApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // GET profile
    getMyProfile: builder.query<ProfileData, void>({
      query: () => ({
        url: "/doctor/my-profile",
        method: "GET",
      }),
      providesTags: ["DoctorProfile"],
      transformResponse: (response: ProfileResponse) => {
        console.log("Profile data:", response);
        // ✅ Extract profile from nested data.profile
        return response.data.profile;
      },
    }),

    // UPDATE profile
    updateMyProfile: builder.mutation<ProfileResponse, UpdateProfileInput>({
      query: (body) => {
        console.log("Updating profile:", body);
        
        return {
          url: "/doctor/update-my-profile",
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["DoctorProfile"],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          profileApi.util.updateQueryData(
            'getMyProfile',
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
          console.error("Update profile failed:", error);
        }
      },
    }),

    // DELETE account
    deleteMyAccount: builder.mutation<DeleteAccountResponse, DeleteAccountInput>({
      query: (body) => {
        console.log("Deleting account with password");
        
        return {
          url: "/auth/delete-my-account",
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["DoctorProfile"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useDeleteMyAccountMutation,
} = profileApi;