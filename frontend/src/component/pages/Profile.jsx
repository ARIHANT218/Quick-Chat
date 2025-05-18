import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="container py-5 bg-dark text-light min-vh-100">
      <div className="mx-auto" style={{ maxWidth: "600px" }}>
        <div className="bg-secondary text-light rounded shadow p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="fw-semibold">Profile</h2>
            <p className="text-muted">Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="d-flex flex-column align-items-center mb-4">
            <div className="position-relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="rounded-circle border border-light"
                style={{ width: "128px", height: "128px", objectFit: "cover", borderWidth: "4px" }}
              />
              <label
                htmlFor="avatar-upload"
                className={`position-absolute bottom-0 end-0 btn btn-light btn-sm rounded-circle ${
                  isUpdatingProfile ? "disabled opacity-75" : ""
                }`}
                style={{ transform: "translate(25%, 25%)" }}
              >
                <Camera size={16} className="text-dark" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="d-none"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-muted mt-2 small">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Info */}
          <div className="mb-4">
            <div className="mb-3">
              <label className="form-label text-light d-flex align-items-center gap-2">
                <User size={16} /> Full Name
              </label>
              <p className="form-control bg-dark text-light border-light">{authUser?.fullName}</p>
            </div>

            <div className="mb-3">
              <label className="form-label text-light d-flex align-items-center gap-2">
                <Mail size={16} /> Email Address
              </label>
              <p className="form-control bg-dark text-light border-light">{authUser?.email}</p>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-dark text-light border rounded p-3">
            <h5 className="fw-medium mb-3">Account Information</h5>
            <div className="d-flex justify-content-between border-bottom border-secondary py-2">
              <span>Member Since</span>
              <span>{authUser?.createdAt?.split("T")[0]}</span>
            </div>
            <div className="d-flex justify-content-between py-2">
              <span>Account Status</span>
              <span className="text-success fw-semibold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
