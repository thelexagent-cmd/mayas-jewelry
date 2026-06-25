"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "@/lib/products";

interface UIContextType {
  // Search
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  // Cookie Consent
  cookieConsent: boolean | null;
  acceptCookies: () => void;
  rejectCookies: () => void;
  // Notifications
  notification: { message: string; type: "success" | "error" | "info" } | null;
  showNotification: (message: string, type?: "success" | "error" | "info") => void;
  clearNotification: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [notification, setNotification] = useState<UIContextType["notification"]>(null);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const openQuickView = useCallback((product: Product) => setQuickViewProduct(product), []);
  const closeQuickView = useCallback(() => setQuickViewProduct(null), []);

  const acceptCookies = useCallback(() => setCookieConsent(true), []);
  const rejectCookies = useCallback(() => setCookieConsent(false), []);

  const showNotification = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  const clearNotification = useCallback(() => setNotification(null), []);

  return (
    <UIContext.Provider
      value={{
        isSearchOpen, openSearch, closeSearch,
        quickViewProduct, openQuickView, closeQuickView,
        cookieConsent, acceptCookies, rejectCookies,
        notification, showNotification, clearNotification,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within a UIProvider");
  return context;
}
