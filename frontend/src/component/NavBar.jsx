import React from 'react';
import { useAuthStore } from '../store/useAuthStore';

function NavBar() {
  const { logout, authUser } = useAuthStore();

  return (
    <nav
      className="navbar navbar-expand bg-white shadow-sm sticky-top"
      style={{
        minHeight: "64px",
        borderBottom: "1px solid #e9ecef",
        zIndex: 100,
      }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        <a
          className="navbar-brand fw-bold fs-3"
          href="/"
          style={{
            color: "#0d6efd",
            letterSpacing: "0.5px",
            textShadow: "0 1px 2px rgba(13,110,253,0.08)",
          }}
        >
          <i className="bi bi-chat-dots-fill me-2 fs-2 text-info"></i>
          Quick Chat
        </a>

        <ul className="navbar-nav ms-auto align-items-center d-flex flex-row gap-2">
          <li className="nav-item mx-2">
            <a
              className="nav-link text-secondary fw-semibold d-flex align-items-center"
              href="/settings"
              style={{
                fontSize: "1.05rem",
                transition: "color 0.2s",
              }}
            >
              <i className="bi bi-gear-fill me-2 fs-5"></i>
              Settings
            </a>
          </li>

          {authUser && (
            <>
              <li className="nav-item mx-2 d-flex align-items-center">
                <a
                  className="nav-link d-flex align-items-center"
                  href="/profile"
                  style={{
                    fontSize: "1.05rem",
                    transition: "color 0.2s",
                  }}
                >
                  <div
                    className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-2 shadow-sm"
                    style={{
                      width: '34px',
                      height: '34px',
                      fontSize: '18px',
                      fontWeight: 600,
                      userSelect: 'none',
                      border: "2px solid #fff",
                      boxShadow: "0 2px 8px rgba(13,110,253,0.10)",
                    }}
                  >
                    {authUser.name ? authUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  Profile
                </a>
              </li>
              <li className="nav-item mx-2">
                <button
                  onClick={logout}
                  className="btn btn-outline-danger px-3 py-1 fw-semibold shadow-sm"
                  style={{
                    borderRadius: '20px',
                    fontSize: "1.05rem",
                    borderWidth: "2px",
                    transition: "background 0.2s, color 0.2s, border 0.2s",
                  }}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
      <style>
        {`
          .navbar-brand:hover {
            color: #0dcaf0 !important;
            text-shadow: 0 2px 8px rgba(13,202,240,0.10);
          }
          .nav-link:hover {
            color: #0d6efd !important;
          }
          .btn-outline-danger:hover, .btn-outline-danger:focus {
            background: #dc3545 !important;
            color: #fff !important;
            border-color: #dc3545 !important;
          }
        `}
      </style>
    </nav>
  );
}

export default NavBar;
