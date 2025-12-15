import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.patch(`/api/v1/auth/forgot-password/${email}`);
      toast.success("OTP sent to your email", { theme: "dark" });
      localStorage.setItem("reset_email", email);
      navigate("/reset-password");
    } catch {
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
          width: "380px",
          background: "#161b22",
          boxShadow: "0px 0px 25px rgba(0,255,255,0.15)",
        }}
      >
        <h2
          className="mb-4 text-center fw-bold"
          style={{ letterSpacing: "1px", color: "#58a6ff" }}
        >
          🔁 Forgot Password
        </h2>

        <form onSubmit={submit}>
          <label className="form-label fw-semibold">Enter Email</label>
          <input
            type="email"
            className="form-control mb-3 bg-dark text-light border border-secondary rounded-3 py-2"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
