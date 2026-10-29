import { useTheme } from "../context/ThemeContext";
import { useChat } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineSun, HiOutlineMoon, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import platformData from "../data/platformData";

/**
 * Header Component
 * -----------------
 * Top bar of the main content area.
 *
 * Features:
 * - Page title ("Main Content Area")
 * - Active Channels pills (shows currently selected platforms)
 * - Dark/Light theme toggle switch
 * - Login / Register link
 *
 * The header adjusts its left margin when the sidebar opens/closes.
 */
export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { selectedPlatforms, sidebarOpen, toggleSidebar } = useChat();
  const navigate = useNavigate();

  return (
    <header
      className={`
        flex items-center justify-between
        px-4 sm:px-5 py-2.5
        border-b flex-shrink-0
        transition-smooth
        ${
          theme === "dark"
            ? "bg-[#0f0f0f]/80 border-[#2d2d2d]"
            : "bg-white/80 border-[#dee2e6]"
        }
        glass
      `}
    >
      {/* Left side — Toggle Sidebar + Logo Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className={`
            w-7 h-7 rounded-lg
            flex items-center justify-center
            border transition-smooth hover-lift cursor-pointer press-effect
            ${
              theme === "dark"
                ? "bg-[#1a1a1a] border-[#3d3d3d] text-gray-400 hover:text-white hover:border-indigo-500/50"
                : "bg-white border-[#dee2e6] text-gray-500 hover:text-gray-800 hover:border-indigo-400/50"
            }
            shadow-sm
          `}
          title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
        >
          {sidebarOpen ? (
            <HiOutlineChevronLeft className="w-3.5 h-3.5" />
          ) : (
            <HiOutlineChevronRight className="w-3.5 h-3.5" />
          )}
        </button>

        <h1 className="text-lg font-bold tracking-wide cursor-pointer" onClick={() => navigate("/")}>
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Reforge
          </span>
          <span className={theme === "dark" ? "text-white" : "text-gray-800"}>
            AI
          </span>
        </h1>
      </div>

      {/* Center — Active Channels */}
      <div className="hidden md:flex items-center gap-2">
        <span
          className={`text-[11px] font-semibold uppercase tracking-widest mr-1 ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Active Channels:
        </span>
        {/* Show pills for each selected platform */}
        {selectedPlatforms.map((key) => {
          const platform = platformData.find((p) => p.key === key);
          if (!platform) return null;

          return (
            <span
              key={key}
              className={`
                px-2.5 py-0.5 rounded-full text-[11px] font-medium
                border transition-smooth
                ${
                  theme === "dark"
                    ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                    : "bg-indigo-50 border-indigo-200 text-indigo-600"
                }
              `}
            >
              {platform.name}
            </span>
          );
        })}
      </div>

      {/* Right side — Theme toggle + Login */}
      <div className="flex items-center gap-4">
        {/* Theme label */}
        <span
          className={`text-xs font-semibold uppercase tracking-widest hidden sm:block ${theme === "dark" ? "text-gray-500" : "text-gray-400"
            }`}
        >
          Theme
        </span>

        {/* Theme toggle switch */}
        <button
          onClick={toggleTheme}
          className={`
            relative w-14 h-7 rounded-full
            flex items-center
            transition-smooth cursor-pointer
            ${theme === "dark"
              ? "bg-indigo-600"
              : "bg-gray-300"
            }
          `}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {/* Sliding circle */}
          <div
            className={`
              absolute w-5 h-5 rounded-full
              flex items-center justify-center
              transition-all duration-300 ease-in-out
              shadow-md
              ${theme === "dark"
                ? "translate-x-8 bg-white"
                : "translate-x-1 bg-white"
              }
            `}
          >
            {theme === "dark" ? (
              <HiOutlineMoon className="w-3 h-3 text-indigo-600" />
            ) : (
              <HiOutlineSun className="w-3 h-3 text-amber-500" />
            )}
          </div>
        </button>

        {/* Login / Register button */}
        <button
          onClick={() => navigate("/login")}
          className={`
            text-sm font-medium
            transition-smooth cursor-pointer
            hover:text-indigo-400
            ${theme === "dark" ? "text-gray-300" : "text-gray-600"}
          `}
        >
          Login / Register
        </button>
      </div>
    </header>
  );
}
