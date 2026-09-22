import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LANGUAGES, translations } from "../data/translations";

const STORAGE_KEY = "flo_lang";

const LanguageContext = createContext(null);

function resolveInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LANGUAGES.some((l) => l.code === saved)) return saved;
  } catch {
    /* noop */
  }
  return "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(resolveInitialLanguage);
  const language = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const t = translations[lang] || translations.en;
  const isRTL = language.dir === "rtl";

  useEffect(() => {
    document.documentElement.lang = language.code;
    document.documentElement.dir = language.dir;
  }, [language.code, language.dir]);

  const changeLanguage = (code) => {
    const next = LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
    setLang(next.code);
    try {
      localStorage.setItem(STORAGE_KEY, next.code);
    } catch {
      /* noop */
    }
  };

  const value = useMemo(
    () => ({ lang, language, isRTL, t, changeLanguage }),
    [lang, language, isRTL, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}