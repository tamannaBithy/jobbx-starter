import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import {
  useGerConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../../features/chat/chatApi";
import { toast } from "react-hot-toast";
import Loading from "./Loading";
import { setCurrentMessage } from "../../features/chat/chatSlice";

const DirectMessage = () => {
  const dispatch = useDispatch();
  const {
    user: { firstName, lastName, email },
  } = useSelector((state) => state.auth);
  const { messages, currentMessage } = useSelector((state) => state.chat);
  const [send] = useSendMessageMutation();
  const conversation = useGerConversationsQuery(currentMessage?._id, {
    skip: currentMessage._id ? false : true,
    pollingInterval: 5000,
  });
  const { isLoading, isError, error } = useGetMessagesQuery(email, {
    skip: email ? false : true,
  });
  const userName = firstName + " " + lastName;

  useEffect(() => {
    if (isError) {
      toast.error(error, { id: "error" });
    }
  }, [isError, error]);

  if (isLoading) {
    return <Loading />;
  }

  const handleCurrentMessage = (data) => {
    dispatch(setCurrentMessage(data));
  };

  const handleSend = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (!message) return;
    const data = { _id: currentMessage?._id, message, author: email };
    send(data);
    e.target.message.value = "";
  };

  return (
    <div className="grid h-screen grid-cols-12">
      <div className="col-span-3 bg-primary/20 py-4 px-2">
        <h3 className="text-center font-semibold">Direct Message</h3>
        <div className="mt-12 flex flex-col gap-2">
          {messages.map((item) => (
            <button
              key={item._id}
              className="flex cursor-pointer items-center gap-4 rounded bg-white p-4 duration-200 hover:bg-gray-100"
              onClick={() =>
                handleCurrentMessage({
                  _id: item._id,
                  name:
                    item.members[0].name !== userName
                      ? item.members[0].name
                      : item.members[1].name,
                  email:
                    item.members[0].email !== email
                      ? item.members[0].email
                      : item.members[1].email,
                })
              }
            >
              <FaUserAlt size={30} color="gray" />
              <div>
                <h4>
                  {item.members[0].name !== userName
                    ? item.members[0].name
                    : item.members[1].name}
                </h4>
                <p className="text-xs text-gray-600">
                  {" "}
                  {item.members[0].email !== email
                    ? item.members[0].email
                    : item.members[1].email}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Main Space */}
      {!currentMessage.email ? (
        <div className="col-span-9">
          <p className="py-8 text-center">
            Please select an user to send message
          </p>
        </div>
      ) : (
        <>
          {conversation.isLoading ? (
            <div className="col-span-9">Loading</div>
          ) : (
            <div className="col-span-9 flex flex-col justify-between">
              <div className="flex items-center gap-8 bg-gray-100 px-4 py-2 shadow-lg">
                <FaUserAlt size={40} color="gray" />
                <div className="">
                  <p className="text-xl font-medium">{currentMessage.name}</p>
                  <p className="text-md">{currentMessage.email}</p>
                </div>
              </div>
              <div className="">
                <div className="scrollbar mt-auto flex max-h-[75vh] flex-col overflow-y-auto">
                  {currentMessage?.conversation?.map((item) => (
                    <div
                      className={`my-2 mx-2 ${
                        item.author === email ? "text-right" : "text-left"
                      }`}
                    >
                      <span
                        className={`rounded-full px-3 py-1 ${
                          item.author === email
                            ? "bg-primary/40 text-white"
                            : "bg-gray-100 text-black"
                        }`}
                      >
                        {item.message}
                      </span>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={handleSend}
                  className="flex items-center gap-2 bg-gray-100 p-4"
                >
                  <input
                    type="text"
                    name="message"
                    id="message"
                    className="block w-full rounded-full bg-white"
                    placeholder="Enter your message"
                  />
                  <button type="submit" className="btn">
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DirectMessage;
