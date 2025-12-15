import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function PendingApprovals() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadPending();
  }, []);

  async function loadPending() {
    setLoading(true);
    try {
      const res = await api.get("/api/v1/admin/banks/pending");

      console.log("RAW RESPONSE:", res.data);

      const arr = Array.isArray(res.data) ? res.data : [];

      console.log("FINAL ARRAY:", arr);

      setPending(arr);
    } catch (err) {
      console.log("ERROR:", err);
      setPending([]);
    } finally {
      setLoading(false);
    }
  }

  async function approve(accountNumber) {
    try {
      await api.patch("/api/v1/admin/approve/saving", { accountNumber });

      toast.success("Account Approved Successfully 🎉", { theme: "dark" });

      loadPending();
    } catch {}
  }

  const empty = pending.length === 0;

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
          Pending Approvals
        </span>

        <span></span>
      </nav>

      {/* CONTENT */}
      <div className="container py-5">
        <h3
          className="text-center fw-bold mb-4"
          style={{ color: "#79c0ff", letterSpacing: "1px" }}
        >
          Pending Bank Account Approvals
        </h3>

        {loading ? (
          <p className="text-center text-light fs-5">Loading...</p>
        ) : empty ? (
          <p className="text-center text-secondary fs-5">
            🎉 No pending accounts
          </p>
        ) : (
          <div className="row g-4">
            {pending.map((acc) => (
              <div className="col-md-6" key={acc.accountNumber}>
                <div
                  className="p-4 rounded-4 text-light shadow-lg"
                  style={{
                    background: "#161b22",
                    border: "1px solid #30363d",
                    boxShadow: "0px 0px 20px rgba(0,255,255,0.1)",
                  }}
                >
                  <h5 style={{ color: "#58a6ff" }}>
                    Account #{acc.accountNumber}
                  </h5>

                  <p className="mb-1 opacity-75">
                    <strong>Name:</strong> {acc.fullName}
                  </p>

                  <p className="mb-1 opacity-75">
                    <strong>Address:</strong> {acc.address}
                  </p>

                  <p className="mb-1 opacity-75">
                    <strong>PAN:</strong> {acc.panNumber}
                  </p>

                  <p className="mb-1 opacity-75">
                    <strong>Aadhar:</strong> {acc.aadharNumber}
                  </p>

                  <p className="mb-1 opacity-75">
                    <strong>IFSC:</strong> {acc.ifscCode}
                  </p>

                  <p className="mb-3 opacity-75">
                    <strong>Branch:</strong> {acc.branch}
                  </p>

                  <button
                    className="btn fw-semibold w-100"
                    onClick={() => approve(acc.accountNumber)}
                    style={{
                      background: "#238636",
                      color: "white",
                      boxShadow: "0 0 10px rgba(35,134,54,0.4)",
                    }}
                  >
                    Approve Account
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
