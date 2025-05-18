import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
   messages ,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    // unsubscribeFromMessages,
  } = useChatStore();
   
  console.log("Messages in ChatContainer:", messages);

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();
    // return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="d-flex flex-column flex-grow-1 overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column flex-grow-1 overflow-auto">
      <ChatHeader />
      <div className="flex-grow-1 overflow-auto p-3">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => {
            const isCurrentUserSender = message.senderId === authUser._id;
            return (
                            <div
                  key={message._id}
                  className={`d-flex mb-4 ${
                    isCurrentUserSender ? "justify-content-end" : "justify-content-start"
                  }`}
                  ref={message._id=== messages.length - 1 ? messageEndRef : null} // Ref only on the last message
                >
                {/* Avatar */}
                <div className="me-2">
                  <img
                    src={
                      isCurrentUserSender
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser?.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="rounded-circle border"
                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                  />
                </div>

                {/* Message bubble */}
                <div>
                  <div className="text-muted small mb-1">
                    {formatMessageTime(message.createdAt)}
                  </div>
                  <div
                    className={`rounded p-2 ${
                      isCurrentUserSender ? "bg-primary text-white" : "bg-light text-dark"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="img-fluid rounded mb-2"
                        style={{ maxWidth: "200px" }}
                      />
                    )}
                    {message.text && <p className="mb-0">{message.text}</p>}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-muted">No messages to display.</div>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;