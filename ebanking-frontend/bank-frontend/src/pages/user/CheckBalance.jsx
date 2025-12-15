import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function CheckBalance() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);

  useEffect(() => {
    loadBalance();
  }, []);

  async function loadBalance() {
    setLoading(true);
    try {
      const res = await api.get("/api/v1/user/bank-balance");
      setBalance(res.data.balance);
      setAccountNumber(res.data.accountNumber);
    } catch (err) {
      console.log("ERROR:", err);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh" }}>
      <nav
        className="navbar navbar-dark px-4"
        style={{ background: "#161b22", borderBottom: "1px solid #30363d" }}
      >
        <button
          className="btn btn-outline-info fw-semibold"
          onClick={() => navigate("/user/dashboard")}
        >
          ⬅ Back
        </button>

        <span className="navbar-brand fw-bold" style={{ color: "#58a6ff" }}>
          Check Balance
        </span>

        <span></span>
      </nav>

      <div className="container py-5">
        <h3
          className="text-center fw-bold mb-4"
          style={{ color: "#79c0ff", letterSpacing: "1px" }}
        >
          Account Balance
        </h3>

        {loading ? (
          <p className="text-center text-light fs-5">Loading...</p>
        ) : balance === null ? (
          <p className="text-center text-secondary fs-5">
            Unable to fetch balance. Please retry.
          </p>
        ) : (
          <div
            className="p-4 rounded-4 text-light shadow-lg mx-auto"
            style={{
              width: "400px",
              background: "#161b22",
              border: "1px solid #30363d",
              boxShadow: "0px 0px 25px rgba(0,255,255,0.1)",
            }}
          >
            <h5 style={{ color: "#58a6ff" }} className="fw-bold text-center">
              Account #{accountNumber}
            </h5>

            <p className="text-center mt-4 fs-4 fw-bold text-success">
              ₹ {balance}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
