import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { getUser, logout } from "../../services/auth";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    loadAccount();
  }, []);

  async function loadAccount() {
    setLoading(true);
    try {
      const res = await api.get("/api/v1/user/account/bank");

      // backend returns raw object
      const raw = res.data;

      setAccount(raw || null);
    } catch (err) {
      setAccount(null);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logout();
    toast.success("Logged out successfully.", { theme: "dark" });
    navigate("/login");
  }

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <nav
        className="navbar navbar-dark px-4"
        style={{
          background: "#161b22",
          borderBottom: "1px solid #30363d",
        }}
      >
        <span className="navbar-brand fw-bold" style={{ color: "#58a6ff" }}>
          🏦 User Dashboard
        </span>

        <button className="btn btn-danger fw-semibold" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="container py-5">
        <h2 className="text-center mb-4" style={{ color: "#79c0ff" }}>
          Welcome, {getUser()?.name}
        </h2>

        {/* LOADING */}
        {loading && <p className="text-center text-light fs-5">Loading...</p>}

        {/* USER HAS NO BANK ACCOUNT */}
        {!loading && !account && (
          <div className="text-center">
            <p className="text-secondary fs-5">
              You don't have a bank account yet.
            </p>
            <button
              className="btn btn-info fw-semibold px-4 py-2"
              onClick={() => navigate("/user/create-account")}
            >
              Create Bank Account
            </button>
          </div>
        )}

        {/* USER HAS BANK ACCOUNT */}
        {account && (
          <div
            className="p-4 rounded shadow-lg text-light mx-auto"
            style={{
              maxWidth: "600px",
              background: "#161b22",
              border: "1px solid #30363d",
              boxShadow: "0 0 20px rgba(88,166,255,0.2)",
            }}
          >
            <h4 className="fw-bold mb-3" style={{ color: "#58a6ff" }}>
              Account Details
            </h4>

            <p className="mb-2">
              <strong>Account Number:</strong> {account.accountNumber}
            </p>

            <p className="mb-4">
              <strong>Status:</strong>{" "}
              {account.blocked
                ? "❌ Blocked"
                : account.active
                ? "✅ Active"
                : "⏳ Pending"}
            </p>

            {/* ACTION BUTTONS */}
            {/* ACTION BUTTONS */}
            <div className="mt-4">
              {account.blocked && (
                <p className="text-danger fw-bold text-center mb-3">
                  ⚠️ This account is blocked. Actions are disabled.
                </p>
              )}

              <button
                className="btn btn-outline-info w-100 mb-3"
                disabled={account.blocked}
                style={
                  account.blocked ? { opacity: 0.5, cursor: "not-allowed" } : {}
                }
                onClick={() => navigate("/user/check-balance")}
              >
                Check Balance
              </button>

              <button
                className="btn btn-outline-success w-100 mb-3"
                disabled={account.blocked}
                style={
                  account.blocked ? { opacity: 0.5, cursor: "not-allowed" } : {}
                }
                onClick={() => navigate("/user/deposit")}
              >
                Deposit Money
              </button>

              <button
                className="btn btn-outline-warning w-100 mb-3"
                disabled={account.blocked}
                style={
                  account.blocked ? { opacity: 0.5, cursor: "not-allowed" } : {}
                }
                onClick={() => navigate("/user/transfer")}
              >
                Transfer Money
              </button>

              <button
                className="btn btn-outline-light w-100"
                disabled={account.blocked}
                style={
                  account.blocked ? { opacity: 0.5, cursor: "not-allowed" } : {}
                }
                onClick={() => navigate("/user/transactions")}
              >
                View Transactions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
