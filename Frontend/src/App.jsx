import { Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { ChatProvider, useChat } from "./context/ChatContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainChat from "./pages/MainChat";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/HelpCenter";
import Login from "./pages/Login";

/**
 * AppLayout Component
 * --------------------
 * The main layout that wraps all pages.
 *
 * Structure:
 * ┌──────────┬──────────────────────────────┐
 * │          │  Header                      │
 * │ Sidebar  ├──────────────────────────────┤
 * │          │  Page Content (Routes)       │
 * │          ├──────────────────────────────┤
 * │          │  Footer                      │
 * └──────────┴──────────────────────────────┘
 *
 * The sidebar can be collapsed, and the main content area
 * adjusts its left margin accordingly with a smooth transition.
 */
function AppLayout() {
  const { theme } = useTheme();

  return (
    <div
      className={`
        h-screen w-screen flex flex-col p-2 sm:p-2.5 gap-2.5 overflow-hidden
        ${theme === "dark" ? "bg-[#0a0a0a] text-gray-200" : "bg-[#f1f3f5] text-gray-800"}
      `}
    >
      {/* Top Header Bar — floating rounded card spanning top of sidebar & main area */}
      <div
        className={`
          w-full rounded-2xl border shadow-sm flex-shrink-0 overflow-hidden
          ${
            theme === "dark"
              ? "bg-[#0f0f0f] border-[#2d2d2d]"
              : "bg-white border-[#dee2e6]"
          }
        `}
      >
        <Header />
      </div>

      {/* Middle Row — Sidebar + Main Content */}
      <div className="flex-1 flex gap-2.5 min-h-0 overflow-hidden">
        {/* Sidebar (floating flex item) */}
        <Sidebar />

        {/* Main Content Floating Container */}
        <div
          className={`
            flex-1 flex flex-col h-full min-w-0 overflow-hidden
            rounded-2xl border shadow-sm transition-smooth
            ${
              theme === "dark"
                ? "bg-[#0f0f0f] border-[#2d2d2d]"
                : "bg-white border-[#dee2e6]"
            }
          `}
        >
          {/* Page content — renders matched route */}
          <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <Routes>
              <Route path="/" element={<MainChat />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/login" element={<Login />} />
              {/* Catch-all route */}
              <Route path="*" element={<MainChat />} />
            </Routes>
          </main>

          {/* Bottom footer bar */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

/**
 * App Component
 * --------------
 * The root component that wraps the entire app with providers.
 *
 * Provider order matters! ThemeProvider is on the outside because
 * ChatProvider doesn't depend on it, but both need to wrap AppLayout.
 */
export default function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <AppLayout />
      </ChatProvider>
    </ThemeProvider>
  );
}
