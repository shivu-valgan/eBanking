import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [email] = useState(localStorage.getItem("reset_email") || "");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.patch("/api/v1/auth/reset-password", {
        email,
        otp: Number(otp),
        password,
      });
      toast.success("Password Reset Successful", { theme: "dark" });
      localStorage.removeItem("reset_email");
      navigate("/login");
    } catch {
      // handled globally
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#0d1117" }}
    >
      <div
        className="p-4 rounded-4 shadow-lg border border-secondary text-light"
        style={{
          width: "420px",
          background: "#161b22",
          boxShadow: "0px 0px 25px rgba(0,255,255,0.15)",
        }}
      >
        <h2
          className="mb-4 text-center fw-bold"
          style={{ letterSpacing: "1px", color: "#58a6ff" }}
        >
          🔒 Reset Password
        </h2>

        <form onSubmit={submit}>
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control mb-3 bg-dark text-light border border-secondary rounded-3 py-2"
            value={email}
            readOnly
          />

          <label className="form-label fw-semibold">OTP</label>
          <input
            type="text"
            className="form-control mb-3 bg-dark text-light border border-secondary rounded-3 py-2"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <label className="form-label fw-semibold">New Password</label>
          <input
            type="password"
            className="form-control mb-4 bg-dark text-light border border-secondary rounded-3 py-2"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn w-100 fw-semibold py-2"
            disabled={loading}
            style={{
              background: "#238636",
              color: "white",
              boxShadow: "0 0 10px rgba(35,134,54,0.4)",
            }}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
