import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import ChatArea from "../components/ChatArea";
import PlatformSelector from "../components/PlatformSelector";
import PlatformInputFields from "../components/PlatformInputFields";
import MessageInput from "../components/MessageInput";

/**
 * MainChat Page
 * --------------
 * The main page of the app — this is where users chat with ReforgeAI.
 */
export default function MainChat() {
  const { theme } = useTheme();

  return (
    <div className="flex-1 flex flex-col min-h-0 p-3 sm:p-4 gap-3 overflow-y-auto">
      {/* Mouse Resizable Floating Card containing ChatArea & PlatformSelector */}
      <div
        className={`
          flex flex-col rounded-2xl border shadow-sm flex-shrink-0
          resize-y overflow-auto min-h-[240px] h-[340px] max-h-[70vh]
          ${
            theme === "dark"
              ? "bg-[#141414] border-[#2d2d2d]"
              : "bg-white border-[#e2e5e9]"
          }
        `}
      >
        {/* Scrollable message history */}
        <ChatArea />

        {/* Platform pills bar pinned at bottom of chat card */}
        <PlatformSelector />
      </div>

      {/* Platform-specific extra fields */}
      <PlatformInputFields />

      {/* Floating message input bar */}
      <MessageInput />
    </div>
  );
}
