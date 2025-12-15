import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function UserTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [accountNumber, setAccountNumber] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    setLoading(true);
    try {
      const res = await api.get("/api/v1/user/account/bank");

      const acc = res.data;
      setAccountNumber(acc.accountNumber);

      const list = Array.isArray(acc.bankTransactions)
        ? acc.bankTransactions
        : [];

      setTransactions(list);
    } catch (err) {
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh" }}>
      {/* NAV */}
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
          Transactions
        </span>

        <span></span>
      </nav>

      <div className="container py-5">
        <h3 className="text-center fw-bold mb-4" style={{ color: "#79c0ff" }}>
          Account #{accountNumber}
        </h3>

        {/* LOADING */}
        {loading ? (
          <p className="text-center text-light fs-5">Loading...</p>
        ) : transactions.length === 0 ? (
          <p className="text-center text-secondary fs-5">
            No transactions found
          </p>
        ) : (
          <div className="row g-4">
            {transactions.map((tx, i) => (
              <div className="col-md-6" key={i}>
                <div
                  className="p-4 rounded-4 text-light shadow-lg"
                  style={{
                    background: "#161b22",
                    border: "1px solid #30363d",
                    boxShadow:
                      tx.type === "CREDIT"
                        ? "0 0 20px rgba(35,134,54,0.4)"
                        : "0 0 20px rgba(248,81,73,0.4)",
                  }}
                >
                  <h5
                    className="fw-bold mb-2"
                    style={{
                      color: tx.type === "CREDIT" ? "#2ea043" : "#f85149",
                    }}
                  >
                    {tx.type}
                  </h5>

                  <p className="mb-1 opacity-75">
                    <strong>Amount:</strong> ₹{tx.amount}
                  </p>
                  <p className="mb-1 opacity-75">
                    <strong>Before:</strong> ₹{tx.balanceBeforeTransaction}
                  </p>
                  <p className="mb-1 opacity-75">
                    <strong>After:</strong> ₹{tx.balanceAfterTransaction}
                  </p>

                  <p className="mb-1 opacity-75">
                    <strong>Txn ID:</strong> {tx.payment_id || "N/A"}
                  </p>

                  <p className="mb-1 opacity-75">
                    <strong>Date:</strong>{" "}
                    {tx.createdTime
                      ? new Date(tx.createdTime).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}