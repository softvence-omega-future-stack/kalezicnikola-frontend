import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const baseQueryApI = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    // credentials:"include",
    prepareHeaders(headers, { getState }) {
        const accessToken = (getState() as RootState).auth.accessToken;

        if(accessToken){
            headers.set("authorization", `Bearer ${accessToken}`)
        }
        return headers;
    }

})
export const baseAPI = createApi({
    reducerPath:"baseAPI",
    baseQuery:baseQueryApI,
    tagTypes: ["Doctor","Admin","User"],
    endpoints: () =>({})
})

// const baseQueryWithToasts : typeof baseQueryApI = async (
//     args,
//     api,
//     extraOptions
// ) => {
//     const result = await baseQueryApI(args,api,extraOptions);
//     console.log(result);

//     const method = typeof args === "object" && "method" in args ? args.method : "GET";
//      if(method !== "GET"){
//         if(result?.data && 
//             typeof result.data === "object" && "message" in result.data){
//                 const message = (result.data as {message?: string}).message;
//                 if(message){
//                     if(method === "DELETE"){
//                         toast.warning(message);
//                     } else {
//                         toast.success(message);
//                     }
//                 }
//             }
//             if(result?.error){
//                 const message = (result.error.data as {message?: string})?.message || "Something went wrong.please try again.";
//                 toast.error(message);
                
//             }
//         }
//         return result; 
// }

// export const baseAPI = createApi({
//     reducerPath:"baseAPI",
//     baseQuery:baseQueryWithToasts,
//     tagTypes: ["Doctor","Admin","User"],
//     endpoints: () =>({})
// })

