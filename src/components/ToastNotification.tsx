"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "@/contexts/UIContext";
import {
  HiCheckCircle,
  HiXCircle,
  HiInformationCircle,
  HiXMark,
} from "react-icons/hi2";

const ICONS = {
  success: HiCheckCircle,
  error: HiXCircle,
  info: HiInformationCircle,
} as const;

const ACCENT_COLORS = {
  success: "border-l-gold",
  error: "border-l-red-500",
  info: "border-l-gold-light",
} as const;

const ICON_COLORS = {
  success: "text-gold",
  error: "text-red-400",
  info: "text-gold-light",
} as const;

export default function ToastNotification() {
  const { notification, clearNotification } = useUI();

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`fixed top-6 right-6 z-[200] max-w-sm w-full glass border-l-4 ${ACCENT_COLORS[notification.type]} p-4`}
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            {(() => {
              const Icon = ICONS[notification.type];
              return <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${ICON_COLORS[notification.type]}`} />;
            })()}

            {/* Message */}
            <p className="text-ivory text-sm leading-relaxed flex-1">
              {notification.message}
            </p>

            {/* Close */}
            <button
              onClick={clearNotification}
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-whisper/40 hover:text-ivory transition-colors"
              aria-label="Dismiss notification"
            >
              <HiXMark className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
