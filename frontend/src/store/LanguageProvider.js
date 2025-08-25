import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../config/i18n';
import { useLanguagePreference } from './../hooks/useLanguagePreference';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading translations...</p>
    </div>
  </div>
);

export const LanguageProvider = ({
  children,
  fallback: FallbackComponent = LoadingFallback,
  preloadLanguages = [],
  enablePersistence = true
}) => {

  useLanguagePreference({
    autoDetect: enablePersistence,
    preloadLanguages
  });

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<FallbackComponent />}>
        {children}
      </Suspense>
    </I18nextProvider>
  );
};