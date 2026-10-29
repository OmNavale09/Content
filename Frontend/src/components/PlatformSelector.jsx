import { useChat } from "../context/ChatContext";
import { useTheme } from "../context/ThemeContext";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import platformData from "../data/platformData";

/**
 * PlatformSelector Component
 * ---------------------------
 * A horizontal bar of platform "pills" (buttons) that the user
 * can click to select which platforms they want content for.
 *
 * Features:
 * - Shows all 8 platforms as clickable pills
 * - Selected platforms get a highlighted border and background
 * - Multiple platforms can be selected at once
 * - Settings/filter button at the end
 * - Smooth transitions on hover and selection
 */
export default function PlatformSelector() {
  const { selectedPlatforms, togglePlatform } = useChat();
  const { theme } = useTheme();

  return (
    <div
      className={`
        px-4 sm:px-6 py-3 border-t flex-shrink-0
        transition-smooth
        ${
          theme === "dark"
            ? "bg-[#181818] border-[#2d2d2d]"
            : "bg-[#f8f9fa] border-[#e2e5e9]"
        }
      `}
    >
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* Render a pill for each platform */}
        {platformData.map((platform) => {
          // Check if this platform is currently selected
          const isSelected = selectedPlatforms.includes(platform.key);

          return (
            <button
              key={platform.key}
              onClick={() => togglePlatform(platform.key)}
              className={`
                px-5 py-1.5 rounded-full
                text-xs font-medium
                border transition-all duration-300 ease-in-out
                cursor-pointer
                hover:scale-105
                ${isSelected
                  ? theme === "dark"
                    ? "bg-indigo-500/20 border-indigo-500/60 text-indigo-300 shadow-md shadow-indigo-500/10"
                    : "bg-indigo-50 border-indigo-400 text-indigo-600 shadow-md shadow-indigo-500/10"
                  : theme === "dark"
                    ? "bg-transparent border-[#3d3d3d] text-gray-400 hover:border-gray-500 hover:text-gray-300"
                    : "bg-transparent border-[#ced4da] text-gray-500 hover:border-gray-400 hover:text-gray-700"
                }
              `}
            >
              {platform.name}
            </button>
          );
        })}

        {/* Settings / Filter button */}
        <button
          className={`
            p-2 rounded-lg
            border transition-smooth cursor-pointer
            hover-lift
            ${theme === "dark"
              ? "border-[#3d3d3d] text-gray-400 hover:text-gray-200 hover:border-gray-500"
              : "border-[#ced4da] text-gray-400 hover:text-gray-600 hover:border-gray-400"
            }
          `}
          title="Platform settings"
        >
          <HiOutlineAdjustmentsHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
