import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function Deposit() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Load Razorpay script dynamically
  function loadRazorpayScript() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  }

  async function startPayment(e) {
    e.preventDefault();

    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount!", { theme: "dark" });
      return;
    }

    setLoading(true);

    try {
      // 1) Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load Razorpay!", { theme: "dark" });
        setLoading(false);
        return;
      }

      // 2) Initialize backend order
      const res = await api.patch("/api/v1/user/deposit", {
        amount: Number(amount),
      });

      console.log("INIT RESPONSE:", res.data);

      const paymentData = res.data.data || res.data;

      if (!paymentData?.orderId) {
        toast.error("Order creation failed!", { theme: "dark" });
        return;
      }

      const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "E-Banking Deposit",
        description: "Deposit Money",
        order_id: paymentData.orderId,

        handler: async function (response) {
          try {
            await api.post(
              `/api/v1/user/confirm-deposit?amount=${paymentData.amount}&razorpay_payment_id=${response.razorpay_payment_id}`
            );

            toast.success("Deposit Successful", { theme: "dark" });
            navigate("/user/dashboard");
          } catch (err) {
            toast.error("Payment verification failed!", { theme: "dark" });
          }
        },

        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      toast.error("Payment error!", { theme: "dark" });
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

        <span className="navbar-brand fw-bold" style={{ color: "#58a6ff" }}>
          Deposit Money
        </span>

        <span></span>
      </nav>

      {/* FORM */}
      <div className="container py-5">
        <form
          className="mx-auto p-4 rounded text-light"
          style={{
            maxWidth: "500px",
            background: "#161b22",
            border: "1px solid #30363d",
            boxShadow: "0 0 20px rgba(88,166,255,0.2)",
          }}
          onSubmit={startPayment}
        >
          <label className="form-label">Enter Amount</label>

          <input
            type="number"
            className="form-control mb-3 bg-dark text-light border-secondary"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />

          <button
            className="btn btn-success w-100 fw-semibold"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>
        </form>
      </div>
    </div>
  );
}
