"use client";

import { createContext, useContext, useState } from "react";

export type Lang = "EN" | "FR" | "ZH";

export type Translations = {
  home:          string;
  works:         string;
  about:         string;
  press:         string;
  contact:       string;
  shop:          string;
  discoverWorks: string;
};

const translations: Record<Lang, Translations> = {
  EN: {
    home:          "Home",
    works:         "Selected Works",
    about:         "About",
    press:         "Press",
    contact:       "Contact",
    shop:          "Shop",
    discoverWorks: "Discover Works",
  },
  FR: {
    home:          "Accueil",
    works:         "Œuvres",
    about:         "À propos",
    press:         "Presse",
    contact:       "Contact",
    shop:          "Boutique",
    discoverWorks: "Découvrir les œuvres",
  },
  ZH: {
    home:          "首页",
    works:         "精选作品",
    about:         "关于",
    press:         "媒体",
    contact:       "联系",
    shop:          "商店",
    discoverWorks: "探索作品",
  },
};

type LanguageContextType = {
  lang:    Lang;
  setLang: (l: Lang) => void;
  t:       Translations;
};

const LanguageContext = createContext<LanguageContextType>({
  lang:    "EN",
  setLang: () => {},
  t:       translations.EN,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("EN");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
