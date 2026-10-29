import { useState, useRef } from "react";
import { useChat } from "../context/ChatContext";
import { useTheme } from "../context/ThemeContext";
import {
  HiOutlinePaperClip,
  HiOutlineArrowUp,
  HiOutlineArrowsPointingOut,
  HiOutlineArrowsPointingIn,
} from "react-icons/hi2";

/**
 * MessageInput Component
 * -----------------------
 * The text input area at the bottom of the chat.
 *
 * Features:
 * - Expandable textarea supporting Shift+Enter or Ctrl+Enter to expand multiline input
 * - Normal Enter key to send message
 * - Manual expand/collapse button
 * - Send button & attachment button
 */
export default function MessageInput() {
  const [inputText, setInputText] = useState("");
  const { addMessage } = useChat();
  const { theme } = useTheme();

  // Handle sending a message
  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    addMessage(trimmed, "user");
    setInputText("");
  };

  // Handle KeyDown: Enter sends message, Shift+Enter or Ctrl+Enter inserts newline
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`
        w-full flex-shrink-0 flex items-end gap-2.5
        px-4 py-2.5 rounded-2xl transition-all duration-300
        border shadow-sm hover:shadow-md
        focus-within:border-indigo-500/50
        ${
          theme === "dark"
            ? "bg-[#141414] border-[#2d2d2d]"
            : "bg-white border-[#e2e5e9]"
        }
      `}
    >
      {/* Mouse Resizable Multiline Textarea */}
      <textarea
        rows={1}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message ReforgeAI... (Mouse drag bottom-right corner to expand, Shift+Enter for newline)"
        className={`
          flex-1 bg-transparent outline-none
          text-sm resize-y min-h-[36px] max-h-[180px] py-1.5
          placeholder:text-gray-500
          ${theme === "dark" ? "text-gray-200" : "text-gray-700"}
        `}
      />

      {/* Attachment button */}
      <button
        className={`
          p-2 rounded-lg transition-smooth cursor-pointer mb-0.5
          hover-lift flex-shrink-0
          ${
            theme === "dark"
              ? "text-gray-500 hover:text-gray-300 hover:bg-[#2a2a2a]"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          }
        `}
        title="Attach file"
      >
        <HiOutlinePaperClip className="w-4 h-4" />
      </button>

      {/* Send button */}
      <button
        onClick={handleSend}
        disabled={!inputText.trim()}
        className={`
          px-4 py-2 rounded-full mb-0.5
          flex items-center gap-1.5
          text-xs font-medium flex-shrink-0
          transition-smooth press-effect cursor-pointer
          ${
            inputText.trim()
              ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-500/20"
              : theme === "dark"
              ? "bg-[#2a2a2a] text-gray-500 cursor-not-allowed"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        <span>Send</span>
        <HiOutlineArrowUp className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
