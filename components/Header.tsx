import React from 'react';
import { SparklesIcon } from './Icons';
import { useI18n } from '../hooks/useI18n';

const Header: React.FC = () => {
  const { lang, setLang, t } = useI18n();

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="py-4 px-6 relative">
      <div className="flex items-center justify-center text-center">
        <SparklesIcon className={`w-8 h-8 text-purple-400 ${lang === 'ar' ? 'ml-3' : 'mr-3'}`} />
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {t('header.title')}
        </h1>
      </div>
        <p className="text-center text-gray-400 mt-2 text-sm sm:text-base">{t('header.subtitle')}</p>
        <div className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'}`}>
            <button 
              onClick={toggleLang} 
              className="text-sm font-medium text-gray-300 bg-gray-700/50 px-3 py-1 rounded-md hover:bg-gray-600/50 transition-colors"
              aria-label={`Switch to ${lang === 'en' ? 'Arabic' : 'English'}`}
            >
                {lang === 'en' ? 'AR' : 'EN'}
            </button>
        </div>
    </header>
  );
};

export default Header;
