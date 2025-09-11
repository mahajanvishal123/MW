import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../Utilities/BaseUrl";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!showOtp) {
        // Step 1: Login
        const res = await fetch(
          `${BaseUrl}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");

        // Store role from response (assuming API returns it)
        setUserRole(data.role || "doctor");
        setShowOtp(true);
      } else {
        // Step 2: Verify OTP
        const res = await fetch(
          `${BaseUrl}/auth/verify-otp`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "OTP verification failed");
         localStorage.setItem("authToken", data.token);
         localStorage.setItem("user", JSON.stringify(data.user)  );
        // Redirect based on role
        if (userRole === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/doctor/doctorDashboard");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setShowOtp(false);
    setOtp("");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Medical Certificate Portal
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {!showOtp ? (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-2 outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-2 outline-none transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 text-center">
                Enter 6-digit OTP
              </label>
              <div className="flex gap-2 justify-center">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-10 h-12 text-center border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg text-lg font-semibold"
                    value={otp[i] || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      const newOtp =
                        otp.substring(0, i) + val + otp.substring(i + 1);
                      setOtp(newOtp);
                      if (val && e.target.nextSibling) {
                        e.target.nextSibling.focus();
                      }
                    }}
                    disabled={isSubmitting}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                Code has been sent to your registered email
              </p>
            </div>
          )}

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting || (showOtp && otp.length !== 6)}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSubmitting
              ? showOtp
                ? "Verifying..."
                : "Logging in..."
              : showOtp
              ? "Verify OTP"
              : "Login"}
          </button>
        </form>

        {showOtp && (
          <div className="text-center mt-5">
            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to credentials
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
