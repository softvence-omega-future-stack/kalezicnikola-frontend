
import { baseAPI } from "@/store/api/baseApi";

// ✅ Define proper types
interface SecuritySettingsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: SecuritySettingsData;
}

interface SecuritySettingsData {
  id: string;
  doctorId: string;
  passwordPolicy: boolean;
  passwordExpiry: string;
  minPasswordLength: string;
  requireUpperLower: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  loginSecurity: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: string;
  maxLoginAttempts: string;
  dataProtection: boolean;
  encryptData: boolean;
  auditLogs: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SecuritySettingsInput {
  passwordPolicy: boolean;
  passwordExpiry: string;
  minPasswordLength: string;
  requireUpperLower: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  loginSecurity: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: string;
  maxLoginAttempts: string;
  dataProtection: boolean;
  encryptData: boolean;
  auditLogs: boolean;
}

export const securitySettingsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSecuritySettings: builder.query<SecuritySettingsData, void>({
      query: () => ({
        url: "/settings/doctor/security",
        method: "GET",
      }),
      providesTags: ["SecuritySettings"],
      transformResponse: (response: SecuritySettingsResponse) => {
        console.log("Security settings response:", response);
        return response.data;
      },
    }),

    updateSecuritySettings: builder.mutation<SecuritySettingsResponse, Partial<SecuritySettingsData>>({
      query: (body) => {
        // ✅ Only send settings fields, remove metadata
        const settings: SecuritySettingsInput = {
          passwordPolicy: body.passwordPolicy!,
          passwordExpiry: body.passwordExpiry!,
          minPasswordLength: body.minPasswordLength!,
          requireUpperLower: body.requireUpperLower!,
          requireNumbers: body.requireNumbers!,
          requireSpecialChars: body.requireSpecialChars!,
          loginSecurity: body.loginSecurity!,
          twoFactorAuth: body.twoFactorAuth!,
          sessionTimeout: body.sessionTimeout!,
          maxLoginAttempts: body.maxLoginAttempts!,
          dataProtection: body.dataProtection!,
          encryptData: body.encryptData!,
          auditLogs: body.auditLogs!,
        };
        
        console.log("Sending security settings:", settings);
        
        return {
          url: "/settings/doctor/security-update",
          method: "PATCH",
          body: settings,
        };
      },
      invalidatesTags: ["SecuritySettings"],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          securitySettingsApi.util.updateQueryData(
            'getSecuritySettings',
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
  useGetSecuritySettingsQuery,
  useUpdateSecuritySettingsMutation,
} = securitySettingsApi;