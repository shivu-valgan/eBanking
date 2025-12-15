import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    toast.success("Logout Success", { theme: "dark" });
    navigate("/login");
  }

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <nav
        className="navbar navbar-dark px-4"
        style={{ background: "#161b22", borderBottom: "1px solid #30363d" }}
      >
        <span className="navbar-brand fw-bold" style={{ color: "#58a6ff" }}>
          ⚙️ Admin Panel
        </span>

        <button className="btn btn-danger px-3 fw-semibold" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <div className="container py-5">
        <h2
          className="text-center mb-5 fw-bold"
          style={{ color: "#58a6ff", letterSpacing: "1px" }}
        >
          Welcome, Admin 🛡️
        </h2>

        <div className="row justify-content-center g-4">
          {/* Pending Approvals */}
          <div className="col-md-4">
            <div
              className="p-4 rounded-4 text-light shadow-lg"
              style={{
                background: "#161b22",
                border: "1px solid #30363d",
                cursor: "pointer",
                transition: "0.3s",
                boxShadow: "0px 0px 20px rgba(0,255,255,0.1)",
              }}
              onClick={() => navigate("/admin/pending")}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1.0)")
              }
            >
              <h4 style={{ color: "#79c0ff" }}>Pending Approvals</h4>
              <p className="opacity-75">
                View and approve users’ bank account applications.
              </p>
            </div>
          </div>

          {/* All Users */}
          <div className="col-md-4">
            <div
              className="p-4 rounded-4 text-light shadow-lg"
              style={{
                background: "#161b22",
                border: "1px solid #30363d",
                cursor: "pointer",
                transition: "0.3s",
                boxShadow: "0px 0px 20px rgba(0,255,255,0.1)",
              }}
              onClick={() => navigate("/admin/users")}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1.0)")
              }
            >
              <h4 style={{ color: "#79c0ff" }}>All Users</h4>
              <p className="opacity-75">
                View all registered users and their bank accounts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
