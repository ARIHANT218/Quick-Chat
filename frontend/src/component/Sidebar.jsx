import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
    // console.log("Online Users from store:", onlineUsers);
  }, [getUsers, onlineUsers]);
  
  const filteredUsers = showOnlineOnly && Array.isArray(users)
    ? users.filter(user => onlineUsers.includes(String(user._id)))
    : users;

  const currentUserId = authUser?._id;
  const onlineCount = currentUserId 
    ? onlineUsers.filter(id => id !== currentUserId).length 
    : onlineUsers.length;

  if (isUsersLoading) return <SidebarSkeleton />;

  // ...existing code...
return (
  <aside
    className="d-flex flex-column border-end h-100 transition-all shadow-sm"
    style={{
      width: "5rem",
      maxWidth: "18rem",
      background: "linear-gradient(135deg, #23272f 0%, #181a20 100%)", // dark gradient
      minHeight: "100vh",
      color: "#f8fafc", // light text
    }}
  >
    <div className="border-bottom p-3 sticky-top" style={{zIndex: 2, background: "#23272f"}}>
      <div className="d-flex align-items-center gap-2 mb-2">
        <Users size={26} className="text-info" />
        <span className="fw-semibold d-none d-lg-inline fs-5" style={{color: "#f8fafc"}}>Contacts</span>
      </div>
      <div className="mt-2 d-none d-lg-flex align-items-center gap-2">
        <label className="form-check-label d-flex align-items-center gap-2" style={{color: "#ced4da"}}>
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="form-check-input"
          />
          <span className="small">Show online only</span>
        </label>
        <span className="text-success small fw-semibold">({onlineCount} online)</span>
      </div>
    </div>

    <div className="overflow-auto py-3 px-2" style={{flex: 1}}>
      {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
        filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(String(user._id));
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`btn w-100 text-start px-3 py-2 d-flex align-items-center gap-3 border-0 rounded-3 mb-2 user-card transition-all
                ${selectedUser?._id === user._id ? "bg-dark border-info border-2 shadow-sm" : "bg-secondary"}
              `}
              style={{
                boxShadow: selectedUser?._id === user._id ? "0 2px 8px rgba(0,0,0,0.18)" : "0 1px 3px rgba(0,0,0,0.10)",
                transition: "background 0.2s, box-shadow 0.2s",
                position: "relative",
                color: "#f8fafc",
              }}
            >
              <div className="position-relative mx-auto mx-lg-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="rounded-circle object-fit-cover border border-2"
                  style={{ width: "48px", height: "48px", borderColor: isOnline ? "#198754" : "#343a40" }}
                />
                {isOnline && (
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
              <div className="d-none d-lg-block text-start w-100">
                <div className="fw-semibold text-truncate fs-6" style={{color: "#f8fafc"}}>{user.fullName}</div>
                <div className={`small ${isOnline ? "text-success" : "text-muted"}`}>
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })
      ) : (
        <div className="text-center text-muted py-4">
          {showOnlineOnly ? "No online users" : "No users available"}
        </div>
      )}
    </div>
    <style>
      {`
        .user-card {
          background: #23272f !important;
          color: #f8fafc !important;
        }
        .user-card.bg-secondary {
          background: #23272f !important;
        }
        .user-card.bg-dark {
          background: #181a20 !important;
        }
        .user-card:hover {
          background: #343a40 !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          transform: translateY(-2px) scale(1.01);
        }
      `}
    </style>
  </aside>
);
// ...existing code...
};

export default Sidebar;