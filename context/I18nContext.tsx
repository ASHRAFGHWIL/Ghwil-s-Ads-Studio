import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { en } from '../i18n/locales/en';
import { ar } from '../i18n/locales/ar';
import { get } from 'lodash-es';

type Language = 'en' | 'ar';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = { en, ar };

const getInitialLang = (): Language => {
    const storedLang = localStorage.getItem('ghwil-ads-lang');
    if (storedLang === 'en' || storedLang === 'ar') {
        return storedLang;
    }
    return 'en';
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('ghwil-ads-lang', lang);
  }, [lang]);

  const setLang = (newLang: Language) => {
      setLangState(newLang);
  };

  const t = useCallback((key: string, replacements?: { [key: string]: string | number }) => {
    let translation = get(translations[lang], key, key);
    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            translation = translation.replace(`{${rKey}}`, String(replacements[rKey]));
        });
    }
    return translation;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};
