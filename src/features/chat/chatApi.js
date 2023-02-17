import apiSlice from "../api/apiSlice";
import { setCurrentConversation, setMessages } from "./chatSlice";

const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/create-message",
        body: data,
      }),
      invalidatesTags: ["messages"],
    }),

    getMessages: builder.query({
      query: (email) => `message/${email}`,
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.status) {
            dispatch(setMessages(data.data));
          }
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["messages"],
    }),

    gerConversations: builder.query({
      query: (id) => `conversation/${id}`,
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          if (data.status) {
            dispatch(setCurrentConversation(data.data.conversations));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/send-message",
        body: data,
      }),
      invalidatesTags: ["conversations"],
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useSendMessageMutation,
  useGetMessagesQuery,
  useGerConversationsQuery,
} = chatApi;
