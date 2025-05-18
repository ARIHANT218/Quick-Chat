import React, { useState } from 'react'
import {useAuthStore} from "../../store/useAuthStore"

import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, MessageSquare } from "lucide-react";
import AuthImagePattern from "../AuthImagePattern";

function Login() {
  const [showPassword , setShowPassword] = useState(false);
  const [formData , setFormData] = useState({
    email:"",
    password:""
  })
  const {login , isloggedIn} = useAuthStore();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    login(formData);

  }
   return (
    <div className="container-fluid vh-100 d-flex flex-column flex-lg-row p-0">
      {/* Left Side - Form */}
      <div className="d-flex flex-column justify-content-center align-items-center col-lg-6 px-4 py-5">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {/* Logo */}
          <div className="text-center mb-4">
            <div className="d-flex flex-column align-items-center">
              <div
                className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10 mb-2"
                style={{ width: "48px", height: "48px" }}
              >
                <MessageSquare className="text-primary" size={24} />
              </div>
              <h2 className="fw-bold">Welcome Back</h2>
              <p className="text-muted">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text">
                  <Mail className="text-muted" size={16} />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <Lock className="text-muted" size={16} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={isloggedIn}
            >
              {isloggedIn ? (
                <>
                  <Loader2 className="me-2 spinner-border spinner-border-sm" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-muted">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-decoration-none text-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="d-none d-lg-flex align-items-center justify-content-center col-lg-6 bg-light p-4">
        <AuthImagePattern
          title="Welcome back!"
          subtitle="Sign in to continue your conversations and catch up with your messages."
        />
      </div>
    </div>
  );
};

export default Login