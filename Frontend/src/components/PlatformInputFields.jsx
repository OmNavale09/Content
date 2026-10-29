import { useChat } from "../context/ChatContext";
import { useTheme } from "../context/ThemeContext";
import platformData from "../data/platformData";

/**
 * PlatformInputFields Component
 * -------------------------------
 * Shows extra input fields based on which platforms are selected.
 *
 * For example:
 * - If "YouTube" is selected → shows "Video Title", "Description Topic", "Content Type"
 * - If "Instagram" is selected → shows "Content Type", "Post Description", "Hashtag toggle"
 *
 * Features:
 * - Dynamically renders fields based on selectedPlatforms
 * - Groups fields by platform with a header showing platform name + tone badge
 * - Supports text inputs and dropdown selects
 * - Smooth slide-down animation when fields appear
 * - All fields have hover effects
 *
 * The field values are stored in ChatContext (platformFieldValues).
 */
export default function PlatformInputFields() {
  const { selectedPlatforms, platformFieldValues, updatePlatformField } =
    useChat();
  const { theme } = useTheme();

  // Filter platformData to only include selected platforms
  const activePlatforms = platformData.filter((p) =>
    selectedPlatforms.includes(p.key)
  );

  // Don't render anything if no platforms are selected
  if (activePlatforms.length === 0) return null;

  return (
    <div
      className={`
        flex-shrink-0 rounded-2xl border p-5 sm:p-6
        animate-slide-down shadow-sm hover:shadow-md
        transition-smooth max-h-64 overflow-y-auto
        ${
          theme === "dark"
            ? "bg-[#141414] border-[#2d2d2d]"
            : "bg-white border-[#e2e5e9]"
        }
      `}
    >
        {/* Section title */}
        <p
          className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Platform-Specific Details
        </p>

        {/* Render fields grouped by platform */}
        <div className="space-y-4">
          {activePlatforms.map((platform) => (
            <div key={platform.key} className="animate-slide-down">
              {/* Platform header with name and tone badge */}
              <div className="flex items-center gap-2 mb-2">
                <h4
                  className={`text-sm font-semibold ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {platform.name}
                </h4>

                {/* Tone badge */}
                <span
                  className={`
                    px-2 py-0.5 rounded-full text-[10px] font-medium
                    ${
                      theme === "dark"
                        ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                        : "bg-purple-50 text-purple-600 border border-purple-200"
                    }
                  `}
                >
                  {platform.tone}
                </span>

                {/* Text formats hint */}
                <span
                  className={`text-[10px] ${
                    theme === "dark" ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  Formats: {platform.textFormats.join(", ")}
                </span>
              </div>

              {/* Render each extra field for this platform */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {platform.extraFields.map((field) => (
                  <div key={field.name}>
                    {/* Field label */}
                    <label
                      className={`block text-xs font-medium mb-1 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {field.label}
                    </label>

                    {/* Render either a mouse resizable text field or a select dropdown */}
                    {field.type === "text" ? (
                      <textarea
                        rows={1}
                        value={platformFieldValues[field.name] || ""}
                        onChange={(e) =>
                          updatePlatformField(field.name, e.target.value)
                        }
                        placeholder={field.placeholder}
                        className={`
                          w-full px-3 py-1.5 rounded-lg text-sm
                          border outline-none resize-y min-h-[38px] max-h-[140px]
                          transition-smooth
                          focus:border-indigo-500/50
                          hover:border-indigo-500/30
                          ${
                            theme === "dark"
                              ? "bg-[#141414] border-[#2d2d2d] text-gray-200 placeholder:text-gray-600"
                              : "bg-[#f8f9fa] border-[#dee2e6] text-gray-700 placeholder:text-gray-400"
                          }
                        `}
                      />
                    ) : (
                      <select
                        value={platformFieldValues[field.name] || ""}
                        onChange={(e) =>
                          updatePlatformField(field.name, e.target.value)
                        }
                        className={`
                          w-full px-3 py-2 rounded-lg text-sm
                          border outline-none
                          transition-smooth cursor-pointer
                          focus:border-indigo-500/50
                          hover:border-indigo-500/30
                          ${
                            theme === "dark"
                              ? "bg-[#141414] border-[#2d2d2d] text-gray-200"
                              : "bg-[#f8f9fa] border-[#dee2e6] text-gray-700"
                          }
                        `}
                      >
                        <option value="">Select...</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>

              {/* Divider between platforms (except the last one) */}
              {activePlatforms.indexOf(platform) <
                activePlatforms.length - 1 && (
                <div
                  className={`border-t mt-4 ${
                    theme === "dark" ? "border-[#2d2d2d]" : "border-[#e9ecef]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
    </div>
  );
}
