import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineCog6Tooth,
  HiOutlineBell,
  HiOutlineShieldCheck,
  HiOutlinePaintBrush,
  HiOutlineArrowLeft,
} from "react-icons/hi2";

/**
 * Settings Page
 * --------------
 * A placeholder settings page with common sections.
 * In a real app, these would link to actual functionality.
 *
 * Sections: General, Notifications, Privacy & Security, Appearance
 */
export default function Settings() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Settings sections with icons and descriptions
  const sections = [
    {
      icon: HiOutlineCog6Tooth,
      title: "General",
      description: "Language, region, and account preferences",
    },
    {
      icon: HiOutlineBell,
      title: "Notifications",
      description: "Email alerts, push notifications, digest settings",
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Privacy & Security",
      description: "Password, two-factor auth, data management",
    },
    {
      icon: HiOutlinePaintBrush,
      title: "Appearance",
      description: "Theme, font size, layout preferences",
    },
  ];

  return (
    <div
      className={`
        flex-1 overflow-y-auto p-6 sm:p-10
        ${theme === "dark" ? "bg-[#0f0f0f]" : "bg-[#f8f9fa]"}
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

      {/* Page title */}
      <h1
        className={`text-2xl font-bold mb-2 ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        Settings
      </h1>
      <p
        className={`text-sm mb-8 ${
          theme === "dark" ? "text-gray-500" : "text-gray-400"
        }`}
      >
        Manage your account and application preferences
      </p>

      {/* Settings cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className={`
              p-5 rounded-xl border
              transition-smooth hover-lift cursor-pointer
              group
              ${
                theme === "dark"
                  ? "bg-[#1a1a1a] border-[#2d2d2d] hover:border-indigo-500/30"
                  : "bg-white border-[#e2e5e9] hover:border-indigo-300 shadow-sm"
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div
                className={`
                  p-3 rounded-lg transition-smooth
                  ${
                    theme === "dark"
                      ? "bg-[#2a2a2a] text-gray-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10"
                      : "bg-gray-100 text-gray-400 group-hover:text-indigo-500 group-hover:bg-indigo-50"
                  }
                `}
              >
                <section.icon className="w-5 h-5" />
              </div>
              <div>
                <h3
                  className={`font-semibold mb-1 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {section.title}
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {section.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
