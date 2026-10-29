import { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import { useTheme } from "../context/ThemeContext";
import ChatMessage from "./ChatMessage";
import { HiOutlineArrowsPointingOut, HiOutlineArrowsPointingIn } from "react-icons/hi2";

/**
 * ChatArea Component
 * -------------------
 * The main scrollable area that displays all chat messages.
 */
export default function ChatArea({ isExpanded, onToggleExpand }) {
  const { messages } = useChat();
  const { theme } = useTheme();

  // Reference to the bottom of the chat — used for auto-scrolling
  const bottomRef = useRef(null);

  // Scroll to bottom every time messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`
        flex-1 overflow-y-auto
        px-3 sm:px-6 py-4
        space-y-4 bg-transparent
      `}
    >
      {/* Top Header bar for output window */}
      <div className="flex items-center justify-between mb-2">
        <div
          className={`
            inline-flex items-center gap-2 px-3 py-1 rounded-full
            text-[11px] font-medium
            ${
              theme === "dark"
                ? "bg-[#1a1a1a] text-gray-400 border border-[#2d2d2d]"
                : "bg-white text-gray-500 border border-[#e2e5e9] shadow-sm"
            }
          `}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
          ReforgeAI Output Window
        </div>
      </div>

      {/* Render each message */}
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}

      {/* Invisible div at the bottom — we scroll to this */}
      <div ref={bottomRef} />
    </div>
  );
}
