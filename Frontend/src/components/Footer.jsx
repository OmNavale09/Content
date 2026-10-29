import { useTheme } from "../context/ThemeContext";

/**
 * Footer Component
 * -----------------
 * Bottom bar of the app.
 *
 * Shows:
 * - Copyright notice
 * - Engine version
 * - Legal links (Privacy, Terms, API Status)
 *
 * All links have hover effects.
 */
export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`
        flex flex-wrap items-center justify-between
        px-6 py-2.5
        border-t text-xs
        transition-smooth
        ${
          theme === "dark"
            ? "bg-[#0f0f0f] border-[#2d2d2d] text-gray-500"
            : "bg-[#f8f9fa] border-[#dee2e6] text-gray-400"
        }
      `}
    >
      {/* Left — Copyright */}
      <span>© 2024 ReforgeAI Automation</span>

      {/* Center — Engine version */}
      <span className="uppercase tracking-widest font-medium hidden sm:block">
        Powered by ReforgeAI Engine V4.0.2
      </span>

      {/* Right — Links */}
      <div className="flex items-center gap-4">
        <a
          href="#"
          className="hover:text-indigo-400 transition-smooth cursor-pointer"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="hover:text-indigo-400 transition-smooth cursor-pointer"
        >
          Terms of Service
        </a>
        <span className="flex items-center gap-1">
          {/* Green dot for API status */}
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          <a
            href="#"
            className="hover:text-indigo-400 transition-smooth cursor-pointer"
          >
            API Status
          </a>
        </span>
      </div>
    </footer>
  );
}
