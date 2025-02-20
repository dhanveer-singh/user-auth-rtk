import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import es from '../locales/es.json';
import { store } from '@/store/store';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: store.getState()?.language?.lang || 'en',
    interpolation: {
      escapeValue: false,
    },
  });

store.subscribe(() => {
  const newLang = store.getState()?.language?.lang;
  if (newLang && i18n.language !== newLang) {
    i18n.changeLanguage(newLang);
  }
});

export default i18n;
