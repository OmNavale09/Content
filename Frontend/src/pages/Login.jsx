import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi2";

/**
 * Login Page
 * -----------
 * A clean login/register page with toggle between login and register modes.
 *
 * Features:
 * - Toggle between "Login" and "Register" tabs
 * - Input fields for email, password (and name for register)
 * - Submit button with hover effects
 * - Back to chat link
 */
export default function Login() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Toggle between "login" and "register" mode
  const [mode, setMode] = useState("login");

  return (
    <div
      className={`
        flex-1 flex items-center justify-center
        p-6 overflow-y-auto
        ${theme === "dark" ? "bg-[#0f0f0f]" : "bg-[#f8f9fa]"}
      `}
    >
      <div
        className={`
          w-full max-w-md rounded-2xl border p-8
          transition-smooth
          ${
            theme === "dark"
              ? "bg-[#1a1a1a] border-[#2d2d2d]"
              : "bg-white border-[#e2e5e9] shadow-lg"
          }
        `}
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className={`
            flex items-center gap-2 mb-6
            text-sm font-medium
            transition-smooth cursor-pointer
            hover:text-indigo-400
            ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
          `}
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Back to Chat
        </button>

        {/* Logo */}
        <h1 className="text-2xl font-bold mb-1 text-center">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Reforge
          </span>
          <span className={theme === "dark" ? "text-white" : "text-gray-800"}>
            AI
          </span>
        </h1>
        <p
          className={`text-sm text-center mb-6 ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {mode === "login"
            ? "Sign in to your account"
            : "Create a new account"}
        </p>

        {/* Login / Register tabs */}
        <div
          className={`
            flex rounded-lg mb-6 p-1
            ${theme === "dark" ? "bg-[#141414]" : "bg-gray-100"}
          `}
        >
          <button
            onClick={() => setMode("login")}
            className={`
              flex-1 py-2 rounded-md text-sm font-medium
              transition-smooth cursor-pointer
              ${
                mode === "login"
                  ? theme === "dark"
                    ? "bg-[#2a2a2a] text-white shadow-sm"
                    : "bg-white text-gray-800 shadow-sm"
                  : theme === "dark"
                  ? "text-gray-500 hover:text-gray-300"
                  : "text-gray-400 hover:text-gray-600"
              }
            `}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`
              flex-1 py-2 rounded-md text-sm font-medium
              transition-smooth cursor-pointer
              ${
                mode === "register"
                  ? theme === "dark"
                    ? "bg-[#2a2a2a] text-white shadow-sm"
                    : "bg-white text-gray-800 shadow-sm"
                  : theme === "dark"
                  ? "text-gray-500 hover:text-gray-300"
                  : "text-gray-400 hover:text-gray-600"
              }
            `}
          >
            Register
          </button>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          {/* Name field (only for register) */}
          {mode === "register" && (
            <div className="animate-slide-down">
              <label
                className={`block text-xs font-medium mb-1.5 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Full Name
              </label>
              <div
                className={`
                  flex items-center gap-2 px-3 py-2.5 rounded-lg
                  border transition-smooth
                  focus-within:border-indigo-500/50
                  ${
                    theme === "dark"
                      ? "bg-[#141414] border-[#2d2d2d]"
                      : "bg-[#f8f9fa] border-[#dee2e6]"
                  }
                `}
              >
                <HiOutlineUser
                  className={`w-4 h-4 ${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`
                    flex-1 bg-transparent outline-none text-sm
                    ${theme === "dark" ? "text-gray-200" : "text-gray-700"}
                    placeholder:text-gray-500
                  `}
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div>
            <label
              className={`block text-xs font-medium mb-1.5 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Email Address
            </label>
            <div
              className={`
                flex items-center gap-2 px-3 py-2.5 rounded-lg
                border transition-smooth
                focus-within:border-indigo-500/50
                ${
                  theme === "dark"
                    ? "bg-[#141414] border-[#2d2d2d]"
                    : "bg-[#f8f9fa] border-[#dee2e6]"
                }
              `}
            >
              <HiOutlineEnvelope
                className={`w-4 h-4 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <input
                type="email"
                placeholder="you@example.com"
                className={`
                  flex-1 bg-transparent outline-none text-sm
                  ${theme === "dark" ? "text-gray-200" : "text-gray-700"}
                  placeholder:text-gray-500
                `}
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label
              className={`block text-xs font-medium mb-1.5 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Password
            </label>
            <div
              className={`
                flex items-center gap-2 px-3 py-2.5 rounded-lg
                border transition-smooth
                focus-within:border-indigo-500/50
                ${
                  theme === "dark"
                    ? "bg-[#141414] border-[#2d2d2d]"
                    : "bg-[#f8f9fa] border-[#dee2e6]"
                }
              `}
            >
              <HiOutlineLockClosed
                className={`w-4 h-4 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <input
                type="password"
                placeholder="••••••••"
                className={`
                  flex-1 bg-transparent outline-none text-sm
                  ${theme === "dark" ? "text-gray-200" : "text-gray-700"}
                  placeholder:text-gray-500
                `}
              />
            </div>
          </div>
        </div>

        {/* Submit button */}
        <button
          className={`
            w-full mt-6 py-2.5 rounded-lg
            text-sm font-semibold text-white
            bg-indigo-600 hover:bg-indigo-500
            transition-smooth hover-lift press-effect
            shadow-lg shadow-indigo-500/20
            cursor-pointer
          `}
        >
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div
            className={`flex-1 h-px ${
              theme === "dark" ? "bg-[#2d2d2d]" : "bg-[#dee2e6]"
            }`}
          />
          <span
            className={`text-xs ${
              theme === "dark" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            or continue with
          </span>
          <div
            className={`flex-1 h-px ${
              theme === "dark" ? "bg-[#2d2d2d]" : "bg-[#dee2e6]"
            }`}
          />
        </div>

        {/* Social login buttons */}
        <div className="flex gap-3">
          <button
            className={`
              flex-1 py-2.5 rounded-lg border
              text-sm font-medium
              transition-smooth hover-lift cursor-pointer
              ${
                theme === "dark"
                  ? "border-[#2d2d2d] text-gray-300 hover:bg-[#2a2a2a]"
                  : "border-[#dee2e6] text-gray-600 hover:bg-gray-50"
              }
            `}
          >
            Google
          </button>
          <button
            className={`
              flex-1 py-2.5 rounded-lg border
              text-sm font-medium
              transition-smooth hover-lift cursor-pointer
              ${
                theme === "dark"
                  ? "border-[#2d2d2d] text-gray-300 hover:bg-[#2a2a2a]"
                  : "border-[#dee2e6] text-gray-600 hover:bg-gray-50"
              }
            `}
          >
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
