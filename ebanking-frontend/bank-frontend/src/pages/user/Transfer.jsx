import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function Transfer() {
  const navigate = useNavigate();
  const [toAccountNumber, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/v1/user/transfer", {
        toAccountNumber,
        amount,
      });

      toast.success("Amount transferred successfully!", { theme: "dark" });
      navigate("/user/dashboard");
    } catch {
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
          Transfer Money
        </span>

        <span></span>
      </nav>

      <div className="container py-5">
        <div
          className="p-4 mx-auto rounded shadow-lg text-light"
          style={{
            maxWidth: "600px",
            background: "#161b22",
            border: "1px solid #30363d",
          }}
        >
          <form onSubmit={submit}>
            <label className="form-label">To Account Number</label>
            <input
              className="form-control mb-3 bg-secondary text-light border-dark"
              value={toAccountNumber}
              onChange={(e) => setToAccount(e.target.value)}
            />

            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control mb-4 bg-secondary text-light border-dark"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button className="btn btn-warning w-100 fw-semibold" disabled={loading}>
              {loading ? "Transferring..." : "Transfer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
