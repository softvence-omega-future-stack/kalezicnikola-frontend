// // profileApi.ts
// import { baseAPI } from "@/store/api/baseApi";

import { baseAPI } from "@/store/api/baseApi";

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


//import { baseAPI } from "@/store/api/baseApi";

// Profile data type

export interface ProfileData {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  specialities: string[];
  experience: string;
  dob: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  address: string;
  photo: string | null;
}

// Input type for update
export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  dob?: string;
  experience?: string;
  specialities?: string[];
  photo?: string | null;
}

// Input type for delete
export interface DeleteAccountInput {
  password: string;
}

export const profileApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // 1️⃣ Get profile
    getMyProfile: builder.query<ProfileData, void>({
      query: () => ({
        url: "/doctor/my-profile",
        method: "GET",
      }),
      providesTags: ["DoctorProfile"],
      transformResponse: (response: any) => response.data.profile,
    }),

    // 2️⃣ Update profile
    updateMyProfile: builder.mutation<ProfileData, UpdateProfileInput>({
      query: (body) => ({
        url: "/doctor/update-my-profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["DoctorProfile"],
    }),

    // 3️⃣ Delete account
    deleteMyAccount: builder.mutation<any, DeleteAccountInput>({
      query: (body) => ({
        url: "/auth/delete-my-account",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["DoctorProfile"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useDeleteMyAccountMutation,
} = profileApi;
