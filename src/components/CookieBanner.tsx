"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "@/contexts/UIContext";
import {
  HiCake,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";

interface CookieToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  required?: boolean;
}

export default function CookieBanner() {
  const { cookieConsent, acceptCookies, rejectCookies } = useUI();
  const [showPreferences, setShowPreferences] = useState(false);
  const [toggles, setToggles] = useState<CookieToggle[]>([
    {
      id: "essential",
      label: "Essential",
      description: "Required for the website to function properly.",
      enabled: true,
      required: true,
    },
    {
      id: "analytics",
      label: "Analytics",
      description: "Help us understand how visitors interact with our site.",
      enabled: false,
    },
    {
      id: "marketing",
      label: "Marketing",
      description: "Used to deliver personalized advertisements.",
      enabled: false,
    },
  ]);

  const handleToggle = (id: string) => {
    setToggles((prev) =>
      prev.map((t) => (t.id === id && !t.required ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const handleAcceptSelected = () => {
    acceptCookies();
  };

  if (cookieConsent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6"
      >
        <div className="max-w-6xl mx-auto glass border border-gold/10 p-5 md:p-6">
          {/* Main Row */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            {/* Left: Icon + Text */}
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gold/10 rounded-full mt-0.5">
                <HiCake className="w-5 h-5 text-gold" />
              </div>
              <p className="text-ivory/80 text-sm leading-relaxed">
                We use cookies to enhance your browsing experience and provide personalized service.
              </p>
            </div>

            {/* Right: Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="flex items-center gap-1.5 px-4 py-2.5 border border-whisper/20 text-xs uppercase tracking-[0.12em] text-ivory/70 hover:border-gold/40 hover:text-ivory transition-all duration-300"
              >
                Manage Preferences
                {showPreferences ? (
                  <HiChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <HiChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                onClick={rejectCookies}
                className="px-4 py-2.5 border border-whisper/20 text-xs uppercase tracking-[0.12em] text-ivory/70 hover:border-gold/40 hover:text-ivory transition-all duration-300"
              >
                Reject All
              </button>
              <button
                onClick={acceptCookies}
                className="px-5 py-2.5 bg-gold text-obsidian text-xs uppercase tracking-[0.12em] font-medium hover:bg-gold-light transition-colors duration-300"
              >
                Accept All
              </button>
            </div>
          </div>

          {/* Preferences Panel */}
          <AnimatePresence>
            {showPreferences && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="pt-5 mt-5 border-t border-whisper/10 space-y-4">
                  {toggles.map((toggle) => (
                    <div
                      key={toggle.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-ivory text-sm font-medium">
                          {toggle.label}
                          {toggle.required && (
                            <span className="ml-2 text-xs text-whisper/40">(Required)</span>
                          )}
                        </p>
                        <p className="text-whisper/50 text-xs mt-0.5">
                          {toggle.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle(toggle.id)}
                        disabled={toggle.required}
                        className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-300 ${
                          toggle.enabled ? "bg-gold" : "bg-whisper/20"
                        } ${toggle.required ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                        aria-label={`Toggle ${toggle.label}`}
                      >
                        <motion.div
                          animate={{ x: toggle.enabled ? 20 : 2 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-1 w-4 h-4 rounded-full bg-obsidian"
                        />
                      </button>
                    </div>
                  ))}

                  {/* Save Preferences */}
                  <div className="pt-3 flex justify-end">
                    <button
                      onClick={handleAcceptSelected}
                      className="px-5 py-2 border border-gold/40 text-xs uppercase tracking-[0.12em] text-gold hover:bg-gold hover:text-obsidian transition-all duration-300"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
