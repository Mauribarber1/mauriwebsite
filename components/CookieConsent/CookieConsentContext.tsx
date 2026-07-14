"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ConsentStatus = "unset" | "accepted" | "rejected";

type CookieConsentContextValue = {
  status: ConsentStatus;
  accept: () => void;
  reject: () => void;
};

const STORAGE_KEY = "mauri-barber-cookie-consent";

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>("unset");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setStatus(stored);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setStatus("accepted");
  };

  const reject = () => {
    window.localStorage.setItem(STORAGE_KEY, "rejected");
    setStatus("rejected");
  };

  return (
    <CookieConsentContext.Provider value={{ status, accept, reject }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return ctx;
}
