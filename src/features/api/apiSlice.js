import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://slim-touch-production.up.railway.app",
  }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Jobs", "Job", "JobList", "messages", "conversations"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
