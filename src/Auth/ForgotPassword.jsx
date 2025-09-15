import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BaseUrl from "../Utilities/BaseUrl";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!email.trim()) {
      setErrorMsg("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${BaseUrl}/auth/forgotPassword`, {
        email: email.trim(),
      });

      setSuccessMsg(
        data?.message ||
          "If this email exists, we've sent password reset instructions. Check your inbox."
      );
      setEmail("");
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your account email and we'll send you instructions to reset your
          password.
        </p>

        {successMsg && (
          <div className="mb-4 px-4 py-3 rounded bg-green-50 border border-green-200 text-green-800">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 px-4 py-3 rounded bg-red-50 border border-red-200 text-red-800">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="mt-2 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>

          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 rounded-md text-white ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Back to login
            </Link>
          </div>
        </form>

        <div className="mt-6 text-xs text-gray-400">
          Tip: Check your spam/junk folder if you don't see the email.
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
