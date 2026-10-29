import { useChat } from "../context/ChatContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlinePlus,
  HiOutlineCog6Tooth,
  HiOutlineQuestionMarkCircle,
  HiOutlineUserCircle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineEnvelope,
  HiOutlineGlobeAlt,
  HiOutlineMagnifyingGlass,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

/**
 * Sidebar Component
 * ------------------
 * The left navigation panel of the app.
 *
 * Features:
 * - ReforgeAI logo/title
 * - New Chat button
 * - Recent activity list
 * - Category shortcuts
 * - Bottom navigation (Settings, Help, Account, Logout)
 * - Collapse/expand button with smooth slide animation
 *
 * All items have hover effects for a polished feel.
 */
export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, chatHistory } = useChat();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Category shortcuts shown in the sidebar
  const categories = [
    { icon: HiOutlineGlobeAlt, label: "Social Content Strategy" },
    { icon: HiOutlineEnvelope, label: "Email Sequence Optimization" },
    { icon: HiOutlineMagnifyingGlass, label: "Market Research: LLM" },
    { icon: HiOutlineRocketLaunch, label: "Product Launch Roadmap" },
  ];

  // Bottom navigation items
  const bottomNav = [
    {
      icon: HiOutlineCog6Tooth,
      label: "Settings",
      path: "/settings",
    },
    {
      icon: HiOutlineQuestionMarkCircle,
      label: "Help Center",
      path: "/help",
    },
    {
      icon: HiOutlineUserCircle,
      label: "My Account",
      path: "/account",
    },
  ];

  return (
    <aside
      className={`
        relative h-full flex-shrink-0 z-30
        flex flex-col rounded-2xl border shadow-sm
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "w-64 border" : "w-0 border-0"}
        ${
          theme === "dark"
            ? "bg-[#141414] border-[#2d2d2d]"
            : "bg-[#ffffff] border-[#dee2e6]"
        }
        overflow-hidden
      `}
    >
      {/* Inner content — has a min-width so text doesn't wrap during animation */}
      <div className="min-w-[256px] flex flex-col h-full pt-3">
        {/* ---- New Chat Button ---- */}
        <div className="px-4 pb-3">
          <button
            onClick={() => navigate("/")}
            className={`
              w-full flex items-center justify-center gap-2
              py-3 rounded-full shadow-sm hover:shadow-md
              font-semibold text-sm
              border transition-smooth hover-lift press-effect
              cursor-pointer
              ${
                theme === "dark"
                  ? "border-[#3d3d3d] text-white hover:bg-[#2a2a2a] hover:border-indigo-500/50"
                  : "border-[#ced4da] text-gray-700 hover:bg-white hover:border-indigo-400/50"
              }
            `}
          >
            <HiOutlinePlus className="w-5 h-5" />
            New Chat
          </button>
        </div>

        {/* ---- Recent Activity ---- */}
        <div className="px-4 pb-2">
          <p
            className={`text-xs font-semibold uppercase tracking-widest mb-2 ${
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Recent Activity
          </p>
        </div>

        {/* Scrollable chat history list */}
        <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
          {/* Chat history items */}
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              className={`
                w-full text-left px-3 py-2 rounded-lg text-sm
                flex items-center gap-2
                transition-smooth cursor-pointer
                ${
                  chat.active
                    ? theme === "dark"
                      ? "bg-[#2a2a2a] text-white"
                      : "bg-white text-gray-800 shadow-sm"
                    : theme === "dark"
                    ? "text-gray-400 hover:bg-[#222222] hover:text-gray-200"
                    : "text-gray-600 hover:bg-white hover:text-gray-800"
                }
              `}
            >
              <HiOutlineChatBubbleLeftRight className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{chat.title}</span>
            </button>
          ))}

          {/* ---- Category Shortcuts ---- */}
          <div className="pt-4 pb-2 px-1">
            <div
              className={`border-t mb-3 ${
                theme === "dark" ? "border-[#2d2d2d]" : "border-[#dee2e6]"
              }`}
            />
            {categories.map((cat, index) => (
              <button
                key={index}
                className={`
                  w-full text-left px-3 py-2 rounded-lg text-sm
                  flex items-center gap-2
                  transition-smooth cursor-pointer
                  ${
                    theme === "dark"
                      ? "text-gray-400 hover:bg-[#222222] hover:text-gray-200"
                      : "text-gray-600 hover:bg-white hover:text-gray-800"
                  }
                `}
              >
                <cat.icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ---- Bottom Navigation ---- */}
        <div
          className={`border-t px-2 py-3 space-y-0.5 ${
            theme === "dark" ? "border-[#2d2d2d]" : "border-[#dee2e6]"
          }`}
        >
          {bottomNav.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                w-full text-left px-3 py-2 rounded-lg text-sm
                flex items-center gap-2
                transition-smooth cursor-pointer
                ${
                  location.pathname === item.path
                    ? theme === "dark"
                      ? "bg-[#2a2a2a] text-white"
                      : "bg-white text-gray-800 shadow-sm"
                    : theme === "dark"
                    ? "text-gray-400 hover:bg-[#222222] hover:text-gray-200"
                    : "text-gray-600 hover:bg-white hover:text-gray-800"
                }
              `}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}

          {/* Logout button (red text) */}
          <button
            className={`
              w-full text-left px-3 py-2 rounded-lg text-sm
              flex items-center gap-2
              transition-smooth cursor-pointer
              text-red-400 hover:text-red-300
              ${
                theme === "dark"
                  ? "hover:bg-red-500/10"
                  : "hover:bg-red-50"
              }
            `}
          >
            <HiOutlineArrowRightOnRectangle className="w-4 h-4" />
            Log Out
          </button>
        </div>

        {/* ---- Copyright ---- */}
        <div
          className={`px-4 py-3 text-xs ${
            theme === "dark" ? "text-gray-600" : "text-gray-400"
          }`}
        >
          © 2024 ReforgeAI Automation
        </div>
      </div>
    </aside>
  );
}
