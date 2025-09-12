import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../Utilities/BaseUrl";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!showOtp) {
        const res = await fetch(`${BaseUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");
        setShowOtp(true);
      } else {
        const res = await fetch(`${BaseUrl}/auth/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "OTP verification failed");

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        const role = data.user.user_type;
        if (role === "admin") navigate("/admin/dashboard");
        else navigate("/doctor/doctorDashboard");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 p-4">
      <div className="w-full max-w-lg bg-white p-10 rounded-3xl shadow-2xl">
        {/* Logo */}
       
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-8">
          Medical Certificate Portal
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {!showOtp ? (
            <>
              <div className="space-y-1">
                <label className="block text-md font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-md outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="relative space-y-1">
                <label className="block text-md font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-md outline-none transition pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 mt-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <label className="block text-md font-semibold text-gray-700 text-center">
                Enter 6-digit OTP
              </label>
              <div className="flex gap-3 justify-center">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-14 text-center border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg text-lg font-semibold"
                    value={otp[i] || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      const newOtp =
                        otp.substring(0, i) + val + otp.substring(i + 1);
                      setOtp(newOtp);
                      if (val && e.target.nextSibling) e.target.nextSibling.focus();
                    }}
                    disabled={isSubmitting}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center mt-2">
                Code has been sent to your registered email. <br />
                (Default OTP: <span className="font-semibold">123456</span>)
              </p>
            </div>
          )}

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting || (showOtp && otp.length !== 6)}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50 text-lg"
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
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="text-md text-gray-500 hover:text-gray-700"
            >
              ← Back to credentials
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
