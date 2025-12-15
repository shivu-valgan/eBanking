import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [pan, setPan] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/v1/user/account/bank", {
        fullName,
        address,
        pan,
        aadhar,
      });
      navigate("/user/dashboard");
    } catch (err) {
      // errors handled globally
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
          onClick={() => navigate("/user/dashboard")}
        >
          ⬅ Back
        </button>

        <span
          className="navbar-brand fw-bold"
          style={{ color: "#58a6ff", letterSpacing: "1px" }}
        >
          Create Bank Account
        </span>

        <span></span>
      </nav>

      {/* FORM */}
      <div className="container py-5">
        <div
          className="p-4 mx-auto rounded shadow-lg text-light"
          style={{
            maxWidth: "600px",
            background: "#161b22",
            border: "1px solid #30363d",
          }}
        >
          <h3 className="text-center mb-4" style={{ color: "#79c0ff" }}>
            Enter Account Details
          </h3>

          <form onSubmit={submit}>
            <label className="form-label">Full Name</label>
            <input
              className="form-control mb-3 bg-secondary text-light border-dark"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <label className="form-label">Address</label>
            <textarea
              className="form-control mb-3 bg-secondary text-light border-dark"
              placeholder="Full residential address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label className="form-label">PAN</label>
            <input
              className="form-control mb-3 bg-secondary text-light border-dark"
              placeholder="ABCDE1234F"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
            />

            <label className="form-label">Aadhar</label>
            <input
              className="form-control mb-4 bg-secondary text-light border-dark"
              placeholder="12-digit Aadhar number"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
            />

            <button
              className="btn btn-info w-100 fw-semibold"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
