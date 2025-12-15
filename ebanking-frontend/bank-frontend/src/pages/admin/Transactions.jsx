import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export default function Transactions() {
  const { accountNumber } = useParams();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    setLoading(true);

    try {
      const res = await api.get(`/api/v1/admin/transactions/${accountNumber}`);
      setList(res.data);
    } catch {
      // globally handled
    } finally {
      setLoading(false);
    }
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
          onClick={() => navigate(`/admin/user/${email}`)}
        >
          ⬅ Back
        </button>

        <span className="navbar-brand fw-bold" style={{ color: "#58a6ff" }}>
          Transactions
        </span>

        <span></span>
      </nav>

      <div className="container py-5">
        <h3
          className="text-center fw-bold mb-4"
          style={{ color: "#79c0ff", letterSpacing: "1px" }}
        >
          Account #{accountNumber}
        </h3>

        {loading ? (
          <p className="text-center text-light">Loading...</p>
        ) : list.length === 0 ? (
          <p className="text-center text-secondary fs-5">
            No transactions found
          </p>
        ) : (
          <div className="row g-4">
            {list.map((tx, i) => (
              <div className="col-md-6" key={i}>
                <div
                  className="p-4 rounded-4 text-light shadow-lg"
                  style={{
                    background: "#161b22",
                    border: "1px solid #30363d",
                    boxShadow: `${
                      tx.type === "CREDIT"
                        ? "0 0 20px rgba(35,134,54,0.3)"
                        : "0 0 20px rgba(218,54,51,0.3)"
                    }`,
                  }}
                >
                  <h5
                    className="fw-bold"
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
                    <strong>ID:</strong> {tx.payment_id || "N/A"}
                  </p>

                  <p className="mb-1 opacity-75">
                    <strong>Date:</strong>{" "}
                    {tx.timestamp || tx.createdTime
                      ? new Date(
                          tx.timestamp || tx.createdTime
                        ).toLocaleString()
                      : "Not Available"}
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
