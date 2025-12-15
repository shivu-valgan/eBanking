import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { saveAuth } from "../../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/v1/auth/login", { email, password });
      const { token, user } = res.data;
      toast.success("Login Successful", { theme: "dark" });
      saveAuth(token, user);

      if (user.role === "ADMIN") navigate("/admin/dashboard");
      else navigate("/user/dashboard");
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
          width: "400px",
          background: "#161b22",
          boxShadow: "0px 0px 25px rgba(0,255,255,0.15)",
        }}
      >
        <h2
          className="mb-4 text-center fw-bold"
          style={{ letterSpacing: "1px", color: "#58a6ff" }}
        >
          🔐 Login
        </h2>

        <form onSubmit={submit}>
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control mb-3 bg-dark text-light border border-secondary rounded-3 py-2"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ transition: "0.2s" }}
          />

          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control mb-3 bg-dark text-light border border-secondary rounded-3 py-2"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ transition: "0.2s" }}
          />

          <div className="d-flex justify-content-between mb-3">
            <Link
              to="/forgot-password"
              className="text-decoration-none"
              style={{ color: "#79c0ff" }}
            >
              Forgot Password?
            </Link>

            <Link
              to="/register"
              className="text-decoration-none"
              style={{ color: "#79c0ff" }}
            >
              Register
            </Link>
          </div>

          <button
            className="btn w-100 fw-semibold py-2"
            disabled={loading}
            style={{
              background: "#238636",
              color: "white",
              boxShadow: "0 0 10px rgba(35,134,54,0.4)",
            }}
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
