import { useEffect } from 'react';
import { useI18n } from './useI18n';

export const useLanguagePreference = (options) => {
  const {
    storageKey = 'i18nextLng',
    autoDetect = true,
    preloadLanguages = []
  } = options;

  const { currentLanguage, changeLanguage, preloadLanguages: preload } = useI18n();

  // Initialize language preference
  useEffect(() => {
    if (!autoDetect) return;

    const savedLanguage = localStorage.getItem(storageKey);
    if (savedLanguage && savedLanguage !== currentLanguage) {
      changeLanguage(savedLanguage);
    }
  }, [autoDetect, storageKey, currentLanguage, changeLanguage]);

  // Preload additional languages
  useEffect(() => {
    if (preloadLanguages.length > 0) {
      preload(preloadLanguages);
    }
  }, [preloadLanguages, preload]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem(storageKey, currentLanguage);
  }, [currentLanguage, storageKey]);

  useEffect(() => {
    console.log('---initial---', currentLanguage)
    changeLanguage(currentLanguage);
  }, [])

  return {
    currentLanguage,
    changeLanguage
  };
};