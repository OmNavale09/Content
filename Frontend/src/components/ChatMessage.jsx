import { useTheme } from "../context/ThemeContext";
import { HiOutlineCpuChip, HiOutlineUser } from "react-icons/hi2";

/**
 * ChatMessage Component
 * ----------------------
 * Renders a single chat message bubble.
 *
 * Props:
 * - message: Object with { id, sender, text, timestamp, images }
 *   - sender: "ai" or "user"
 *   - text: The message content
 *   - timestamp: Time string to display
 *   - images: Array of image URLs (optional)
 *
 * AI messages appear on the left with a robot icon.
 * User messages appear on the right with a user icon.
 * Each message fades in with a smooth animation.
 */
export default function ChatMessage({ message }) {
  const { theme } = useTheme();
  const isAI = message.sender === "ai";

  return (
    <div
      className={`
        flex gap-3 animate-fade-in-up
        ${isAI ? "justify-start" : "justify-end"}
      `}
    >
      {/* AI avatar (left side) */}
      {isAI && (
        <div
          className={`
            w-9 h-9 rounded-full flex-shrink-0
            flex items-center justify-center
            transition-smooth
            ${
              theme === "dark"
                ? "bg-indigo-500/20 text-indigo-400"
                : "bg-indigo-100 text-indigo-600"
            }
          `}
        >
          <HiOutlineCpuChip className="w-5 h-5" />
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`
          max-w-[70%] rounded-[24px] px-5 py-3.5
          transition-smooth hover-lift shadow-sm hover:shadow-md
          ${
            isAI
              ? theme === "dark"
                ? "bg-[#1e1e1e] border border-[#2d2d2d] text-gray-200"
                : "bg-white border border-[#e2e5e9] text-gray-700"
              : theme === "dark"
                ? "bg-indigo-600 text-white border border-indigo-500"
                : "bg-indigo-500 text-white border border-indigo-400"
          }
        `}
      >
        {/* Message text */}
        <p className="text-sm leading-relaxed">{message.text}</p>

        {/* Images (if any) */}
        {message.images && message.images.length > 0 && (
          <div className="flex gap-2 mt-3">
            {message.images.map((img, index) => (
              <div
                key={index}
                className={`
                  w-40 h-28 rounded-lg overflow-hidden
                  border transition-smooth hover-lift
                  ${
                    theme === "dark"
                      ? "border-[#3d3d3d]"
                      : "border-[#dee2e6]"
                  }
                `}
              >
                <img
                  src={img}
                  alt={`Generated content ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p
          className={`
            text-xs mt-2
            ${
              isAI
                ? theme === "dark"
                  ? "text-gray-500"
                  : "text-gray-400"
                : "text-indigo-200"
            }
          `}
        >
          {message.timestamp}
        </p>
      </div>

      {/* User avatar (right side) */}
      {!isAI && (
        <div
          className={`
            w-9 h-9 rounded-full flex-shrink-0
            flex items-center justify-center
            transition-smooth
            ${
              theme === "dark"
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-600"
            }
          `}
        >
          <HiOutlineUser className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
