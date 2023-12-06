import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://restcountries.com/v3.1",
        fetchFn: async (...args) => {
            // await new Promise(resolve => setTimeout(resolve, 2_000));
            return fetch(...args);
        },
    }),
    endpoints: () => ({}),
});
