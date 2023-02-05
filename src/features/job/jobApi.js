import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/job",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    applyJob: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/apply",
        body: data,
      }),
    }),
    getJobs: builder.query({
      query: () => ({
        url: "/jobs",
      }),
      providesTags: ["Jobs"],
    }),
    getAppliedJobs: builder.query({
      query: (email) => ({
        url: `/applied-jobs/${email}`,
      }),
    }),
    jobById: builder.query({
      query: (id) => ({
        url: `/job/${id}`,
      }),
      providesTags: ["Job"],
    }),
    question: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/query",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
    reply: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/reply",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
    postedJobById: builder.query({
      query: (id) => ({
        url: `/posted-jobs/${id}`,
      }),
      providesTags: ["JobList"],
    }),
    closeJob: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/close",
        body: data,
      }),
      invalidatesTags: ["JobList"],
    }),

    getCandidateById: builder.query({
      query: (id) => ({
        url: `/candidate/${id}`,
      }),
    }),
    approveStatus: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/approve",
        body: data,
      }),
      invalidatesTags: ["JobList"],
    }),

    getApprovedJob: builder.query({
      query: ({ email, status }) => ({
        url: `/approved-jobs?email=${email}&status=${status}`,
      }),
    }),

    getJobByDate: builder.query({
      query: ({ email, appliedDate }) => ({
        url: `/searchByDate?email=${email}&appliedDate=${appliedDate}`,
      }),
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetJobsQuery,
  useJobByIdQuery,
  useApplyJobMutation,
  useGetAppliedJobsQuery,
  useQuestionMutation,
  useReplyMutation,
  usePostedJobByIdQuery,
  useCloseJobMutation,
  useGetCandidateByIdQuery,
  useApproveStatusMutation,
  useGetApprovedJobQuery,
  useGetJobByDateQuery,
} = jobApi;
