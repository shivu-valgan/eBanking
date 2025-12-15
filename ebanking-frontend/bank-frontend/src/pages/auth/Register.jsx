import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    role: "USER",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/v1/auth/register", form);
      localStorage.setItem("pending_user_email", form.email);
      toast.success("Registration successful! Please verify your OTP.");
      navigate("/otp");
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
          width: "600px",
          background: "#161b22",
          boxShadow: "0px 0px 25px rgba(0,255,255,0.15)",
        }}
      >
        <h2
          className="mb-4 text-center fw-bold"
          style={{ letterSpacing: "1px", color: "#58a6ff" }}
        >
          📝 Create Account
        </h2>

        <form onSubmit={submit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className="form-control bg-dark text-light border border-secondary rounded-3 py-2"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control bg-dark text-light border border-secondary rounded-3 py-2"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Mobile</label>
              <input
                type="text"
                className="form-control bg-dark text-light border border-secondary rounded-3 py-2"
                placeholder="10-digit number"
                value={form.mobile}
                onChange={(e) => setField("mobile", e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">DOB</label>
              <input
                type="text"
                className="form-control bg-dark text-light border border-secondary rounded-3 py-2"
                placeholder="DD-MM-YYYY"
                value={form.dob}
                onChange={(e) => setField("dob", e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control bg-dark text-light border border-secondary rounded-3 py-2"
                placeholder="Strong password"
                value={form.password}
                onChange={(e) => setField("password", e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Role</label>
              <select
                className="form-control bg-dark text-light border border-secondary rounded-3 py-2"
                value={form.role}
                onChange={(e) => setField("role", e.target.value)}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          <button
            className="btn w-100 fw-semibold py-2 mt-2"
            disabled={loading}
            style={{
              background: "#238636",
              color: "white",
              boxShadow: "0 0 10px rgba(35,134,54,0.4)",
            }}
          >
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
