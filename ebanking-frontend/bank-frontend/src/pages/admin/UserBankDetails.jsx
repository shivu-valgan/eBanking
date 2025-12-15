import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function UserBankDetails() {
  const { email } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccount();
  }, []);

  async function loadAccount() {
    setLoading(true);

    try {
      const res = await api.get(`/api/v1/admin/bank/${email}`);

      console.log("RAW ACCOUNT RESPONSE:", res.data);

      // backend may send raw object OR {message, data}
      const data = res.data && res.data.data ? res.data.data : res.data;

      setAccount(data);
    } catch (err) {
      console.log("ERROR:", err);
      setAccount(null);
    } finally {
      setLoading(false);
    }
  }

  async function toggleBlock() {
    try {
      const id = account.accountNumber;

      if (account.blocked) {
        await api.patch(`/api/v1/admin/unblock/${id}`);
        toast.success("Account Unblocked 🎉", { theme: "dark" });
      } else {
        await api.patch(`/api/v1/admin/block/${id}`);
        toast.success("Account Blocked ❌", { theme: "dark" });
      }

      loadAccount();
    } catch {}
  }

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh" }}>
      <nav
        className="navbar navbar-dark px-4"
        style={{ background: "#161b22", borderBottom: "1px solid #30363d" }}
      >
        <button
          className="btn btn-outline-info fw-semibold"
          onClick={() => navigate("/admin/users")}
        >
          ⬅ Back
        </button>

        <span className="navbar-brand fw-bold" style={{ color: "#58a6ff" }}>
          Bank Account Details
        </span>

        <span></span>
      </nav>

      <div className="container py-5">
        {loading ? (
          <p className="text-center text-light">Loading...</p>
        ) : !account ? (
          <p className="text-center text-secondary fs-5">
            No bank account found
          </p>
        ) : (
          <div
            className="p-4 rounded-4 text-light shadow-lg mx-auto"
            style={{
              width: "500px",
              background: "#161b22",
              border: "1px solid #30363d",
              boxShadow: "0px 0px 25px rgba(0,255,255,0.1)",
            }}
          >
            <h4 style={{ color: "#58a6ff" }} className="fw-bold">
              Account #{account.accountNumber}
            </h4>

            <p className="mt-3 opacity-75">
              <strong>Status:</strong>{" "}
              {account.active ? (
                account.blocked ? (
                  <span className="text-danger fw-bold">Blocked</span>
                ) : (
                  <span className="text-success fw-bold">Active</span>
                )
              ) : (
                <span className="text-warning fw-bold">Pending</span>
              )}
            </p>

            <p className="opacity-75">
              <strong>Balance:</strong> ₹{account.balance}
            </p>

            <p className="opacity-75">
              <strong>IFSC:</strong> {account.ifscCode}
            </p>

            <p className="opacity-75">
              <strong>Branch:</strong> {account.branch}
            </p>

            <div className="d-flex gap-2 mt-4">
              <button
                className="btn flex-grow-1 fw-semibold"
                onClick={() =>
                  navigate(
                    `/admin/transactions/${account.accountNumber}?email=${email}`
                  )
                }
                style={{
                  background: "#238636",
                  color: "white",
                  boxShadow: "0 0 10px rgba(35,134,54,0.4)",
                }}
              >
                Transactions
              </button>

              <button
                className="btn flex-grow-1 fw-semibold"
                onClick={toggleBlock}
                style={{
                  background: account.blocked ? "#1f6feb" : "#da3633",
                  color: "white",
                  boxShadow: `0 0 10px ${
                    account.blocked
                      ? "rgba(31,111,235,0.4)"
                      : "rgba(218,54,51,0.4)"
                  }`,
                }}
              >
                {account.blocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
