import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);

    try {
      const res = await api.get("/api/v1/admin/users");

      console.log("RAW USERS RESPONSE:", res.data);

      // Backend returns ARRAY directly
      const arr = Array.isArray(res.data) ? res.data : [];

      setUsers(arr);
    } catch (err) {
      console.log("ERROR USERS:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  function openBankAccount(email) {
    navigate(`/admin/user/${email}`);
  }

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <nav
        className="navbar navbar-dark px-4"
        style={{ background: "#161b22", borderBottom: "1px solid #30363d" }}
      >
        <button
          className="btn btn-outline-info fw-semibold"
          onClick={() => navigate("/admin/dashboard")}
        >
          ⬅ Back
        </button>

        <span className="navbar-brand fw-bold" style={{ color: "#58a6ff" }}>
          All Users
        </span>

        <span></span>
      </nav>

      <div className="container py-5">
        <h3
          className="text-center fw-bold mb-4"
          style={{ color: "#79c0ff", letterSpacing: "1px" }}
        >
          Registered Users
        </h3>

        {loading ? (
          <p className="text-center text-light">Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-secondary fs-5">No users found</p>
        ) : (
          <div className="row g-4">
            {users.map((user) => (
              <div className="col-md-6" key={user.email}>
                <div
                  className="p-4 rounded-4 text-light shadow-lg"
                  style={{
                    background: "#161b22",
                    border: "1px solid #30363d",
                    boxShadow: "0px 0px 18px rgba(0,255,255,0.1)",
                  }}
                >
                  <h5 style={{ color: "#58a6ff" }}>{user.name}</h5>

                  <p className="mb-1 opacity-75">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="mb-1 opacity-75">
                    <strong>Mobile:</strong> {user.mobile}
                  </p>
                  <p className="mb-3 opacity-75">
                    <strong>Role:</strong> {user.role}
                  </p>

                  <button
                    className="btn fw-semibold w-100"
                    onClick={() => openBankAccount(user.email)}
                    style={{
                      background: "#238636",
                      color: "white",
                      boxShadow: "0 0 10px rgba(35,134,54,0.4)",
                    }}
                  >
                    View Bank Account
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}