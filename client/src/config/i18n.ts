import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources: Record<string, { translation: Record<string, any> }> = {
  en: {
    translation: {
      homeLink: "Home",
      featuresLink: "Features",
      aboutLink: "About",

      heroTitle: "Convert your videos to MP3 - MP4 with",
      heroSubtitle: "Secure and hassle-free: just paste the link, choose your format, and download your favorite content to enjoy anytime, anywhere.",
      inputPlaceholder: "Paste the URL here",
      convertButton: "Convert",
      converting: "Converting...",
      errorInvalidUrl: "Please enter a valid URL",
      errorConversion: "There was an error converting the video.",
      loading1: "Please wait patiently, we're processing your video...",
      loading2: "The download won't take much longer...",
      loading3: "For the best quality conversion, please wait a bit more...",
      loading4: "Almost there! Your file is being optimized...",
      loading5: "Just a few more seconds for perfect results...",

      features: {
        sectionTitle: "Features",
        easeTitle: "Ease of Use",
        easeDescription: "Convert in just a few clicks, no hassle or extra steps.",
        qualityTitle: "Maximum Quality",
        qualityDescription: "Enjoy your audio and video with the best resolution and clarity.",
        securityTitle: "Guaranteed Security",
        securityDescription: "Convert with confidence: no sign-ups, no risks, and full privacy."
      },

      about: {
        sectionTitle: "About this Project",
        learningTitle: "Learning Through Practice",
        paragraph1: "This project was developed with the aim of deepening my knowledge of modern web development technologies. My main focus has been on mastering the proper integration of APIs through REST API, exploring best practices for data handling and communication between frontend and backend.",
        paragraph2: "In addition, it has been an excellent opportunity to become familiar with TypeScript, leveraging its static typing advantages to create more robust and maintainable code. Each line of code represents another step in my growth as a developer.",
        viewRepo: "View Repository"
      },

      footer: {
        description: "OrbiTube is a secure YouTube video converter. Download your favorite videos in MP3 or MP4 format with the best quality — always free, simple, and without complications.",
        quickLinks: "Quick links",
        home: "Home",
        features: "Features",
        about: "About",
        social: "Social",
        linkedin: "LinkedIn",
        github: "GitHub"
      },
    },
  },
  es: {
    translation: {
      homeLink: "Inicio",
      featuresLink: "Características",
      aboutLink: "Acerca de",

      heroTitle: "Convierte tus videos a MP3 - MP4 con",
      heroSubtitle: "Seguro y sin complicaciones: pega el enlace, elige el formato y descarga tu contenido favorito para disfrutarlo cuando quieras.",
      inputPlaceholder: "Pega la URL aquí",
      convertButton: "Convertir",
      converting: "Convirtiendo...",
      errorInvalidUrl: "Introduce una URL válida",
      errorConversion: "Hubo un error al convertir el video.",
      loading1: "Por favor espera pacientemente, estamos procesando tu video...",
      loading2: "La descarga no tardará mucho más...",
      loading3: "Para la mejor calidad de conversión, espera un poco más...",
      loading4: "¡Casi listo! Tu archivo se está optimizando...",
      loading5: "Solo unos segundos más para obtener resultados perfectos...",

      features: {
        sectionTitle: "Características",
        easeTitle: "Facilidad de uso",
        easeDescription: "Convierte en solo unos clics, sin complicaciones ni pasos extra.",
        qualityTitle: "Máxima calidad",
        qualityDescription: "Disfruta de tu audio y video con la mejor resolución y claridad.",
        securityTitle: "Seguridad garantizada",
        securityDescription: "Convierte con confianza: sin registros, sin riesgos y con total privacidad."
      },

      about: {
        sectionTitle: "Acerca de este Proyecto",
        learningTitle: "Aprendiendo a través de la práctica",
        paragraph1: "Este proyecto fue desarrollado con el objetivo de profundizar mis conocimientos en tecnologías modernas de desarrollo web. Mi enfoque principal ha sido dominar la integración adecuada de APIs mediante REST API, explorando las mejores prácticas para el manejo de datos y la comunicación entre frontend y backend.",
        paragraph2: "Además, ha sido una excelente oportunidad para familiarizarme con TypeScript, aprovechando sus ventajas de tipado estático para crear código más robusto y mantenible. Cada línea de código representa otro paso en mi crecimiento como desarrollador.",
        viewRepo: "Ver Repositorio"
      },

      footer: {
        description: "OrbiTube es un conversor seguro de videos de YouTube. Descarga tus videos favoritos en formato MP3 o MP4 con la mejor calidad: siempre gratis, simple y sin complicaciones.",
        quickLinks: "Enlaces rápidos",
        home: "Inicio",
        features: "Características",
        about: "Acerca de",
        social: "Redes",
        linkedin: "LinkedIn",
        github: "GitHub"
      },
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
