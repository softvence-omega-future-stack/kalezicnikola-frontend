import { baseAPI } from "../../api/baseApi";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    
    // ✅ Existing endpoints
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

    // ============================================
    // ✅ Forget Password Flow - 3 Steps
    // ============================================

    // Step 1: Send OTP to email
    forgotPassword: build.mutation({
      query: (data: { email: string }) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // Step 2: Verify OTP → Get reset token
    verifyOtp: build.mutation({
      query: (data: { email: string; otp: string }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    // Step 3: Reset password with token (backend field name check koro)
    resetPassword: build.mutation({
      query: (data: { token: string; email: string; password: string; confirmPassword?: string }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { 
          token: data.token,              // Ya resetToken?
          email: data.email, 
          password: data.password,        // Ya newPassword?
          confirmPassword: data.password  // Backend confirm password o chahiye ki?
        },
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = userAPI;


// // authApi.ts
// import { baseAPI } from "@/store/api/baseApi";

// // ✅ Response types
// interface ForgotPasswordResponse {
//   statusCode: number;
//   success: boolean;
//   message: string;
//   data: {
//     statusCode: number;
//     message: string;
//   };
// }

// interface ForgotPasswordInput {
//   email: string;
// }

// interface VerifyOtpInput {
//   email: string;
//   otp: string;
// }

// interface VerifyOtpResponse {
//   statusCode: number;
//   success: boolean;
//   message: string;
//   data: {
//     token: string; // For password reset
//   };
// }

// interface ResetPasswordInput {
//   token: string;
//   newPassword: string;
// }

// interface ResetPasswordResponse {
//   statusCode: number;
//   success: boolean;
//   message: string;
// }

// export const authApi = baseAPI.injectEndpoints({
//   endpoints: (builder) => ({
//     // Forgot Password - Send OTP
//     forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordInput>({
//       query: (body) => ({
//         url: "/auth/forgot-password",
//         method: "POST",
//         body,
//       }),
//     }),

//     // Verify OTP
//     verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpInput>({
//       query: (body) => ({
//         url: "/auth/verify-otp",
//         method: "POST",
//         body,
//       }),
//     }),

//     // Reset Password
//     resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordInput>({
//       query: (body) => ({
//         url: "/auth/reset-password",
//         method: "POST",
//         body,
//       }),
//     }),
//   }),
// });

// export const {
//   useForgotPasswordMutation,
//   useVerifyOtpMutation,
//   useResetPasswordMutation,
// } = authApi;