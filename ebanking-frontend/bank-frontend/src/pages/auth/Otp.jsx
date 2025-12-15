import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function Otp() {
  const [email, setEmail] = useState(
    localStorage.getItem("pending_user_email") || ""
  );
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/v1/auth/verify-otp", {
        email,
        otp: Number(otp),
      });
      toast.success("OTP verified successfully", { theme: "dark" });
      localStorage.removeItem("pending_user_email");
      navigate("/login");
    } catch {
    } finally {
      setLoading(false);
    }
  }

  async function resendOtp() {
    try {
      await api.patch(`/api/v1/auth/resend-otp/${email}`);
      toast.success("OTP resent successfully", { theme: "dark" });
    } catch {}
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#0d1117" }}
    >
      <div
        className="p-4 rounded-4 shadow-lg border border-secondary text-light"
        style={{
          width: "380px",
          background: "#161b22",
          boxShadow: "0px 0px 25px rgba(0,255,255,0.15)",
        }}
      >
        <h2
          className="mb-4 text-center fw-bold"
          style={{ letterSpacing: "1px", color: "#58a6ff" }}
        >
          🔑 Verify OTP
        </h2>

        <form onSubmit={submit}>
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control mb-3 bg-dark text-light border border-secondary rounded-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
          />

          <label className="form-label fw-semibold">Enter OTP</label>
          <input
            type="text"
            className="form-control mb-3 bg-dark text-light border border-secondary rounded-3 py-2"
            placeholder="4-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            type="submit"
            className="btn w-100 fw-semibold py-2 mt-1"
            disabled={loading}
            style={{
              background: "#238636",
              color: "white",
              boxShadow: "0 0 10px rgba(35,134,54,0.4)",
            }}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            className="btn w-100 fw-semibold py-2 mt-3"
            onClick={resendOtp}
            style={{
              background: "#30363d",
              color: "#79c0ff",
              border: "1px solid #30363d",
            }}
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  );
}
