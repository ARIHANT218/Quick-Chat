import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    try {
      await signup(formData);
      toast.success("Account created successfully");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex">
      <div className="row flex-grow-1 w-100">
        {/* Left side */}
        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center p-4 p-sm-5">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            {/* Logo */}
            <div className="text-center mb-4">
              <div className="d-inline-flex flex-column align-items-center gap-2">
                <div className="rounded-3 bg-primary bg-opacity-10 d-flex justify-content-center align-items-center"
                     style={{ width: "48px", height: "48px" }}>
                  <MessageSquare className="text-primary" size={24} />
                </div>
                <h1 className="h4 fw-bold mt-2">Create Account</h1>
                <p className="text-secondary">Get started with your free account</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mb-3">
              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label fw-medium">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <User size={20} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    id="fullName"
                    className="form-control"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-medium">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Mail size={20} className="text-muted" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-medium">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <Lock size={20} className="text-muted" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="me-2" size={20} style={{ animation: "spin 1s linear infinite" }} />
                    Loading...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="text-center">
              <p className="text-secondary mb-0">
                Already have an account?{" "}
                <Link to="/login" className="text-primary text-decoration-none">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-4">
          <AuthImagePattern
            title="Join our community"
            subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
          />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;
