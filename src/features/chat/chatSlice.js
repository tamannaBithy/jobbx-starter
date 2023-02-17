import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  currentMessage: { name: "", email: "", conversation: [] },
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setCurrentMessage: (state, action) => {
      state.currentMessage = { ...action.payload, conversation: [] };
    },
    setCurrentConversation: (state, action) => {
      state.currentMessage.conversation = action.payload;
    },
  },
});

export const { setMessages, setCurrentMessage, setCurrentConversation } =
  chatSlice.actions;
export default chatSlice.reducer;
