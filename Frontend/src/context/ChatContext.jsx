import { createContext, useState, useContext } from "react";

/**
 * ChatContext
 * -----------
 * Manages the chat state for the app:
 * - messages: Array of chat messages (AI and user)
 * - selectedPlatforms: Which platforms are currently active
 * - sidebarOpen: Whether the sidebar is visible or hidden
 * - activePlatforms: The "active channels" shown in the header
 *
 * This replaces Redux with simple React Context + useState.
 * Much easier for beginners to understand!
 */

const ChatContext = createContext();

// Custom hook — use this in any component to access chat state
export function useChat() {
  return useContext(ChatContext);
}

// Provider component
export function ChatProvider({ children }) {
  // ---- Sidebar state ----
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ---- Selected platforms (for the platform selector bar) ----
  const [selectedPlatforms, setSelectedPlatforms] = useState(["linkedin", "medium"]);

  // ---- Chat messages ----
  // Each message has: id, sender ("ai" or "user"), text, timestamp, images (optional)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm ReforgeAI. I can help you automate your content across Email, LinkedIn, X, and more. What are we building today?",
      timestamp: "Just now",
      images: [],
    },
  ]);

  // ---- Chat history (sidebar items) ----
  const [chatHistory] = useState([
    { id: 1, title: "Autonomous Agent Trends 2024", active: true },
    { id: 2, title: "Social Content Strategy", active: false },
    { id: 3, title: "Email Sequence Optimization", active: false },
    { id: 4, title: "Market Research: LLM", active: false },
    { id: 5, title: "Product Launch Roadmap", active: false },
  ]);

  // ---- Platform-specific extra field values ----
  // Stores the values the user types into platform-specific fields
  const [platformFieldValues, setPlatformFieldValues] = useState({});

  // ---- Functions to modify state ----

  // Toggle sidebar open/closed
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Toggle a platform on/off in the selector
  const togglePlatform = (platformKey) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platformKey)) {
        // Remove it if already selected
        return prev.filter((p) => p !== platformKey);
      } else {
        // Add it if not selected
        return [...prev, platformKey];
      }
    });
  };

  // Add a new message to the chat
  const addMessage = (text, sender = "user") => {
    const newMessage = {
      id: Date.now(), // Simple unique ID using timestamp
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      images: [],
    };

    setMessages((prev) => [...prev, newMessage]);

    // If the user sent a message, simulate an AI response after 1 second
    if (sender === "user") {
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          sender: "ai",
          text: `I'll help you create content for ${selectedPlatforms.length > 0 ? selectedPlatforms.join(", ") : "your selected platforms"}. Let me generate that for you based on your requirements...`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          images: [],
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  // Update a platform-specific field value
  const updatePlatformField = (fieldName, value) => {
    setPlatformFieldValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Bundle everything into one value object
  const value = {
    sidebarOpen,
    toggleSidebar,
    selectedPlatforms,
    togglePlatform,
    messages,
    addMessage,
    chatHistory,
    platformFieldValues,
    updatePlatformField,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
