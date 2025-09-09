import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources: Record<string, { translation: Record<string, string> }> = {
  en: {
    translation: {
      home: "Home",
      features: "Features",
      about: "About",
    },
  },
  es: {
    translation: {
      home: "Inicio",
      features: "Características",
      about: "Acerca de",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
