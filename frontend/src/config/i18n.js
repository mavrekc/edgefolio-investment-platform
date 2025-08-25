import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE, NAMESPACES, SUPPORTED_LANGUAGES } from './languages';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Default language

    // lng: DEFAULT_LANGUAGE,
    fallbackLng: FALLBACK_LANGUAGE,
    
    // Supported languages
    supportedLngs: SUPPORTED_LANGUAGES.map(lang => lang.code),
    
    // Namespaces
    ns: ['translation'],
    defaultNS: 'translation',
    
    // Debug mode (disable in production)
    debug: process.env.NODE_ENV === 'development',
    
    // Language detection options
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      checkWhitelist: true
    },
    
    // Backend options for loading translations
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    //   addPath: '/locales/add/{{lng}}/{{ns}}',
    //   crossDomain: true,
    //   withCredentials: false,
    //   requestOptions: {
    //     cache: 'default',
    //     credentials: 'same-origin',
    //     mode: 'cors'
    //   }
    },
    
    // React i18next options
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: false,
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'span'],
      useSuspense: true
    },
    
    // Interpolation options
    // interpolation: {
    //   escapeValue: false, // React already escapes values
    //   formatSeparator: ',',
    //   format: (value, format, lng) => {
    //     if (format === 'uppercase') return value.toUpperCase();
    //     if (format === 'lowercase') return value.toLowerCase();
    //     if (format === 'capitalize') return value.charAt(0).toUpperCase() + value.slice(1);
        
    //     // Number formatting
    //     if (format === 'number') {
    //       const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === lng);
    //       if (langConfig && typeof value === 'number') {
    //         return formatNumber(value, langConfig);
    //       }
    //     }
        
    //     // Currency formatting
    //     if (format === 'currency') {
    //       const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === lng);
    //       if (langConfig && typeof value === 'number') {
    //         return formatCurrency(value, langConfig);
    //       }
    //     }
        
    //     // Date formatting
    //     if (format === 'date' && value instanceof Date) {
    //       const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === lng);
    //       return formatDate(value, langConfig);
    //     }
        
    //     return value;
    //   }
    // },
    
    // Pluralization
    // pluralSeparator: '_',
    // contextSeparator: '_',
    
    // Missing key handling
    saveMissing: process.env.NODE_ENV === 'development',
    // missingKeyHandler: (lng, ns, key, fallbackValue) => {
    //   if (process.env.NODE_ENV === 'development') {
    //     console.warn(`Missing translation key: ${key} for language: ${lng} in namespace: ${ns}`);
    //   }
    // },
    
    // Performance optimizations
    // load: 'languageOnly', // Load only language code (en instead of en-US)
    preload: process.env.NODE_ENV === 'development' ? [DEFAULT_LANGUAGE] : [],
    
    // Custom post processor for handling special cases
    postProcess: ['interval'],
    
    // Keyseparator and nsSeparator
    keySeparator: '.',
    nsSeparator: ':',
    
    // Return objects for empty strings
    returnEmptyString: false,
    returnNull: false,
    returnObjects: false
  });

export default i18n;
