
import { baseAPI } from "../../api/baseApi";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // Doctor Endpoints
    login: build.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/auth/doctor/login",
        method: "POST",
        body: data,
      }),
    }),
    registerUser: build.mutation({
      query: (data) => ({
        url: "/auth/doctor/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),

    // Admin Endpoints
    adminLogin: build.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: data,
      }),
    }),
    adminRegister: build.mutation({
      query: (data: { 
        email: string; 
        password: string; 
        firstName: string; 
        lastName: string 
      }) => ({
        url: "/auth/admin/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useAdminLoginMutation,
  useAdminRegisterMutation,
} = userAPI;



// import { baseAPI } from "../../api/baseApi";
// // import type { getUserResponse } from "../storeTypes/user";
// // import { getUserResponse } from "@/store/storeTypes/user";

// export const userAPI = baseAPI.injectEndpoints({
//   endpoints: (build) => ({
//     login: build.mutation({
//       query: (data: { email: string; password: string }) => ({
//         url: "/auth/doctor/login",
//         method: "POST",
//         body: data,
//       }),
//     }),
//     registerUser: build.mutation({
//       query: (data) => ({
//         url: "/auth/doctor/register",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: [],
//     }),

//     // verifyOTP: build.mutation({
//     //   query: (data) => ({
//     //     url: "/auth/verified-account",
//     //     method: "POST",
//     //     body: data,
//     //   }),
//     // }),

//     // resendOTP: build.mutation({
//     //   query: (data) => ({
//     //     url: "/auth/new-verification-otp",
//     //     method: "POST",
//     //     body: data,
//     //   }),
//     // }),

//     // updateInitialProfile: build.mutation({
//     //   query: (data) => ({
//     //     url: "/auth/update-initial-profile",
//     //     method: "PATCH",
//     //     body: data,
//     //   }),
//     // }),

//     // updatePassword: build.mutation({
//     //   query: (payload) => ({
//     //     url: "/user/update-password",
//     //     method: "PUT",
//     //     body: payload,
//     //   }),
//     // }),

//     // getMe: build.query<getUserResponse, void>({
//     //   query: () => ({
//     //     url: "/auth/me",
//     //     method: "GET",
//     //   }),
//     // }),

//     // forgotPassword: build.mutation({
//     //   query: (data) => ({
//     //     url: "/auth/forgot-password",
//     //     method: "POST",
//     //     body: data,
//     //   }),
//     // }),

//     // resetPassword: build.mutation({
//     //   query: (data) => ({
//     //     url: "/auth/reset-password",
//     //     method: "POST",
//     //     body: data,
//     //   }),
//     // }),
//     // end
//   }),
// });

// export const {
//   useLoginMutation,
//   useRegisterUserMutation,
// //   useForgotPasswordMutation,
// //   useResetPasswordMutation,
// //   useVerifyOTPMutation,
// //   useLazyGetMeQuery,
// //   useGetMeQuery,
// //   useResendOTPMutation,
// //   useUpdateInitialProfileMutation,
// } = userAPI;
