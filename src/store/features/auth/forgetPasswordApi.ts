// authApi.ts
import { baseAPI } from "@/store/api/baseApi";

// ✅ Response types
interface ForgotPasswordResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    statusCode: number;
    message: string;
  };
}

interface ForgotPasswordInput {
  email: string;
}

interface VerifyOtpInput {
  email: string;
  otp: string;
}

interface VerifyOtpResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    token: string; // For password reset
  };
}

interface ResetPasswordInput {
  token: string;
  newPassword: string;
}

interface ResetPasswordResponse {
  statusCode: number;
  success: boolean;
  message: string;
}

export const authApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Forgot Password - Send OTP
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordInput>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // Verify OTP
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpInput>({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordInput>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;