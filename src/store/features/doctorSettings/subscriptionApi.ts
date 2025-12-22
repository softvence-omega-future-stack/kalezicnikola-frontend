import { baseAPI } from "@/store/api/baseApi";

export const subscriptionApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentPlan: builder.query({
      query: () => "/subscription/current",
    }),
    getPlans: builder.query({
      query: () => "/subscription/plans",
    }),
    generatePaymentLink: builder.mutation<{ url: string }, { planType: string }>({
      query: ({ planType }) => ({
        url: `/subscription/checkout?planType=${planType}`,
        method: "POST",
      }),
    }),
    confirmSubscription: builder.query({
      query: (session_id: string) => `/subscription/success?session_id=${session_id}`,
    }),
  }),
});

export const {
  useGetCurrentPlanQuery,
  useGetPlansQuery,
  useGeneratePaymentLinkMutation,
  useConfirmSubscriptionQuery,
} = subscriptionApi;
