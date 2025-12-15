import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/* AUTH PAGES */
import Forgot from "./pages/auth/Forgot";
import Login from "./pages/auth/Login";
import Otp from "./pages/auth/Otp";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";

/* ADMIN PAGES */
import AdminDashboard from "./pages/admin/AdminDashboard";
import PendingApprovals from "./pages/admin/PendingApprovals";
import Transactions from "./pages/admin/Transactions";
import UserBankDetails from "./pages/admin/UserBankDetails";
import UsersList from "./pages/admin/UsersList";

/* USER PAGES (Next module) */
import CheckBalance from "./pages/user/CheckBalance";
import CreateAccount from "./pages/user/CreateAccount";
import Deposit from "./pages/user/Deposit";
import Transfer from "./pages/user/Transfer";
import UserDashboard from "./pages/user/UserDashboard";
import UserTransactions from "./pages/user/Transactions";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-dark min-vh-100 text-light">
        <Routes>
          {/* DEFAULT */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password" element={<Reset />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/pending" element={<PendingApprovals />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/user/:email" element={<UserBankDetails />} />
          <Route
            path="/admin/transactions/:accountNumber"
            element={<Transactions />}
          />

          {/* USER ROUTES */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/create-account" element={<CreateAccount />} />
          <Route path="/user/check-balance" element={<CheckBalance />} />
          <Route path="/user/deposit" element={<Deposit />} />
          <Route path="/user/transfer" element={<Transfer />} />
          <Route path="/user/transactions" element={<UserTransactions />} />
        </Routes>

        {/* Global Toasts */}
        <ToastContainer theme="dark" position="top-right" />
      </div>
    </BrowserRouter>
  );
}
