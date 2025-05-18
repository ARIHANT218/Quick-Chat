import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div
      className="border-bottom p-3"
      style={{
        background: "rgba(35, 39, 47, 0.95)",
        borderTopLeftRadius: "1rem",
        borderTopRightRadius: "1rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
      }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          {/* Avatar */}
          <div className="position-relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="rounded-circle border border-2"
              style={{
                width: "48px",
                height: "48px",
                objectFit: "cover",
                borderColor: onlineUsers.includes(selectedUser._id) ? "#198754" : "#343a40",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                transition: "border-color 0.2s",
              }}
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span
                className="position-absolute bg-success rounded-circle border border-white shadow"
                style={{
                  width: "14px",
                  height: "14px",
                  bottom: "2px",
                  right: "2px",
                  borderWidth: "2px",
                  boxShadow: "0 0 0 2px #23272f",
                }}
              ></span>
            )}
          </div>

          {/* User info */}
          <div>
            <h6 className="mb-0 fw-semibold" style={{ color: "#f8fafc", fontSize: "1.1rem" }}>
              {selectedUser.fullName}
            </h6>
            <small className={onlineUsers.includes(selectedUser._id) ? "text-success" : "text-muted"}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </small>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-sm"
          style={{
            background: "#23272f",
            color: "#f8fafc",
            border: "none",
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            transition: "background 0.2s, color 0.2s",
          }}
          title="Close chat"
        >
          <X size={18} />
        </button>
      </div>
      <style>
        {`
          .btn.btn-sm:hover {
            background: #181a20 !important;
            color: #0dcaf0 !important;
          }
        `}
      </style>
    </div>
  );
};

export default ChatHeader;
