import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { SUPPORTED_LANGUAGES } from '../config/languages';

export const useI18n = () => {
  const { i18n, ready } = useTranslation();

  const currentLanguage = useMemo(() => i18n.language, [i18n.language]);
  
  const currentLanguageConfig = useMemo(() => {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage);
  }, [currentLanguage]);

  // const switchBootstrapCSS = useCallback((isRTL) => {

  //   const existingLink = document.getElementById('bootstrap-css');
  //   const bootstrapVersion = '5.3.3';

  //   const rtlURL = `https://cdn.jsdelivr.net/npm/bootstrap@${bootstrapVersion}/dist/css/bootstrap.rtl.min.css`;

  //   if (!isRTL) {
  //     if (existingLink) {
  //       document.head.removeChild(existingLink);
  //     }
  //   } else {
  //       const link = document.createElement('link');
  //       link.id = 'bootstrap-css';
  //       link.rel = 'stylesheet';
  //       link.href = rtlURL;
  //       link.integrity = 'sha384-Xbg45MqvDIk1e563NLpGEulpX6AvL404DP+/iCgW9eFa2BqztiwTexswJo2jLMue';
  //       link.crossOrigin = 'anonymous';
        
  //       const existingBootstrapLinks = document.querySelectorAll('link[href*="bootstrap"]');
  //       existingBootstrapLinks.forEach(oldLink => oldLink.remove());
        
  //       document.head.appendChild(link);
  //   }
    
  // }, []);

  // const injectRTLStyles = useCallback(() => {
  //   const styleId = 'bootstrap-rtl-overrides';
  //   let existingStyle = document.getElementById(styleId);
    
  //   if (!existingStyle) {
  //     existingStyle = document.createElement('style');
  //     existingStyle.id = styleId;
  //     document.head.appendChild(existingStyle);
  //   }

  //   const rtlCSS = `
  //     /* Bootstrap RTL Overrides */
  //     [dir="rtl"] .text-start { text-align: right !important; }
  //     [dir="rtl"] .text-end { text-align: left !important; }
      
  //     /* Margins */
  //     [dir="rtl"] .ms-0 { margin-right: 0 !important; margin-left: auto !important; }
  //     [dir="rtl"] .ms-1 { margin-right: 0.25rem !important; margin-left: auto !important; }
  //     [dir="rtl"] .ms-2 { margin-right: 0.5rem !important; margin-left: auto !important; }
  //     [dir="rtl"] .ms-3 { margin-right: 1rem !important; margin-left: auto !important; }
  //     [dir="rtl"] .ms-4 { margin-right: 1.5rem !important; margin-left: auto !important; }
  //     [dir="rtl"] .ms-5 { margin-right: 3rem !important; margin-left: auto !important; }
  //     [dir="rtl"] .ms-auto { margin-right: auto !important; margin-left: auto !important; }
      
  //     [dir="rtl"] .me-0 { margin-left: 0 !important; margin-right: auto !important; }
  //     [dir="rtl"] .me-1 { margin-left: 0.25rem !important; margin-right: auto !important; }
  //     [dir="rtl"] .me-2 { margin-left: 0.5rem !important; margin-right: auto !important; }
  //     [dir="rtl"] .me-3 { margin-left: 1rem !important; margin-right: auto !important; }
  //     [dir="rtl"] .me-4 { margin-left: 1.5rem !important; margin-right: auto !important; }
  //     [dir="rtl"] .me-5 { margin-left: 3rem !important; margin-right: auto !important; }
  //     [dir="rtl"] .me-auto { margin-left: auto !important; margin-right: auto !important; }
      
  //     /* Padding */
  //     [dir="rtl"] .ps-0 { padding-right: 0 !important; padding-left: 0 !important; }
  //     [dir="rtl"] .ps-1 { padding-right: 0.25rem !important; padding-left: 0 !important; }
  //     [dir="rtl"] .ps-2 { padding-right: 0.5rem !important; padding-left: 0 !important; }
  //     [dir="rtl"] .ps-md-2 { padding-right: 0.5rem !important; padding-left: 0 !important; }
  //     [dir="rtl"] .ps-3 { padding-right: 1rem !important; padding-left: 0 !important; }
  //     [dir="rtl"] .ps-4 { padding-right: 1.5rem !important; padding-left: 0 !important; }
  //     [dir="rtl"] .ps-5 { padding-right: 3rem !important; padding-left: 0 !important; }
      
  //     [dir="rtl"] .pe-0 { padding-left: 0 !important; padding-right: 0 !important; }
  //     [dir="rtl"] .pe-1 { padding-left: 0.25rem !important; padding-right: 0 !important; }
  //     [dir="rtl"] .pe-2 { padding-left: 0.5rem !important; padding-right: 0 !important; }

  //     [dir="rtl"] .pe-md-2 { padding-left: 0.5rem !important; padding-right: 0 !important; }

  //     [dir="rtl"] .pe-3 { padding-left: 1rem !important; padding-right: 0 !important; }
  //     [dir="rtl"] .pe-4 { padding-left: 1.5rem !important; padding-right: 0 !important; }
  //     [dir="rtl"] .pe-5 { padding-left: 3rem !important; padding-right: 0 !important; }
      
  //     /* Borders */
  //     [dir="rtl"] .border-start { border-right: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important; border-left: 0 !important; }
  //     [dir="rtl"] .border-end { border-left: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important; border-right: 0 !important; }
      
  //     /* Rounded corners */
  //     [dir="rtl"] .rounded-start { border-top-right-radius: var(--bs-border-radius) !important; border-bottom-right-radius: var(--bs-border-radius) !important; border-top-left-radius: 0 !important; border-bottom-left-radius: 0 !important; }
  //     [dir="rtl"] .rounded-end { border-top-left-radius: var(--bs-border-radius) !important; border-bottom-left-radius: var(--bs-border-radius) !important; border-top-right-radius: 0 !important; border-bottom-right-radius: 0 !important; }
      
  //     /* Flexbox */
  //     /* [dir="rtl"] .justify-content-start { justify-content: flex-end !important; }
  //      [dir="rtl"] .justify-content-end { justify-content: flex-start !important; } */
      
  //     /* Navbar */
  //     [dir="rtl"] .navbar-nav .nav-link { padding-right: 0; padding-left: 0.5rem; }
  //     [dir="rtl"] .navbar-nav .dropdown-menu { right: 0; left: auto; }
      
  //     /* Dropdown */
  //     [dir="rtl"] .dropdown-menu { right: 0; left: auto; }
  //     [dir="rtl"] .dropdown-menu-end { right: auto !important; left: 0 !important; }
  //     [dir="rtl"] .dropdown-menu-start { right: 0 !important; left: auto !important; }
      
  //     /* Form controls */
  //     [dir="rtl"] .form-check-input { float: right; margin-right: 0; margin-left: -1.5em; }
  //     [dir="rtl"] .form-check-label { padding-right: 1.5em; padding-left: 0; }
      
  //     /* Input groups */
  //     [dir="rtl"] .input-group .form-control:not(:first-child) { border-top-right-radius: var(--bs-border-radius); border-bottom-right-radius: var(--bs-border-radius); border-top-left-radius: 0; border-bottom-left-radius: 0; }
  //     [dir="rtl"] .input-group .form-control:not(:last-child) { border-top-left-radius: var(--bs-border-radius); border-bottom-left-radius: var(--bs-border-radius); border-top-right-radius: 0; border-bottom-right-radius: 0; }
      
  //     /* Offcanvas */
  //     [dir="rtl"] .offcanvas-start { right: 0; left: auto; transform: translateX(100%); }
  //     [dir="rtl"] .offcanvas-end { left: 0; right: auto; transform: translateX(-100%); }
      
  //     /* Toast */
  //     [dir="rtl"] .toast-container .toast { margin-right: 0; margin-left: auto; }
      
  //     /* Breadcrumb */
  //     [dir="rtl"] .breadcrumb-item + .breadcrumb-item::before { float: right; padding-right: 0; padding-left: 0.5rem; transform: rotate(180deg); }
      
  //     /* Pagination */
  //     [dir="rtl"] .page-item:first-child .page-link { border-top-right-radius: var(--bs-border-radius); border-bottom-right-radius: var(--bs-border-radius); border-top-left-radius: 0; border-bottom-left-radius: 0; }
  //     [dir="rtl"] .page-item:last-child .page-link { border-top-left-radius: var(--bs-border-radius); border-bottom-left-radius: var(--bs-border-radius); border-top-right-radius: 0; border-bottom-right-radius: 0; }
      
  //     /* Carousel */
  //     [dir="rtl"] .carousel-control-prev { right: 0; left: auto; }
  //     [dir="rtl"] .carousel-control-next { left: 0; right: auto; }
  //     [dir="rtl"] .carousel-control-prev-icon { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='m11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e"); }
  //     [dir="rtl"] .carousel-control-next-icon { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='m4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e"); }
  //   `;
    
  //   existingStyle.textContent = rtlCSS;
  // }, []);

  const switchBootstrapCSS = useCallback((isRTL) => {
    const existingLink = document.getElementById('bootstrap-css');
    const bootstrapVersion = '5.3.7'; // Update this to match your Bootstrap version
    
    // Bootstrap CDN URLs
    const ltrURL = `https://cdn.jsdelivr.net/npm/bootstrap@${bootstrapVersion}/dist/css/bootstrap.min.css`;
    const rtlURL = `https://cdn.jsdelivr.net/npm/bootstrap@${bootstrapVersion}/dist/css/bootstrap.rtl.min.css`;
    
    if (existingLink) {
      existingLink.href = isRTL ? rtlURL : ltrURL;
      existingLink.integrity = isRTL ?
        "sha384-Xbg45MqvDIk1e563NLpGEulpX6AvL404DP+/iCgW9eFa2BqztiwTexswJo2jLMue" :
        "sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr";
    } else {
      const link = document.createElement('link');
      link.id = 'bootstrap-css';
      link.rel = 'stylesheet';
      link.href = isRTL ? rtlURL : ltrURL;
      link.integrity = isRTL ?
        "sha384-Xbg45MqvDIk1e563NLpGEulpX6AvL404DP+/iCgW9eFa2BqztiwTexswJo2jLMue" :
        "sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr";
      link.crossOrigin = 'anonymous';
      
      const existingBootstrapLinks = document.querySelectorAll('link[href*="bootstrap"]');
      existingBootstrapLinks.forEach(oldLink => oldLink.remove());
      
      document.head.appendChild(link);
    }
  }, []);

  const changeLanguage = useCallback(async (code) => {
    console.log('---change----');
    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === code);
    if (!language) {
      console.warn(`Language ${code} is not supported`);
      return;
    }

    try {
      await i18n.changeLanguage(code);

      const isRTL = language.dir === 'rtl';

      const ltrLink = document.getElementById('bs-ltr');
      const rtlLink = document.getElementById('bs-rtl');

      if (isRTL) {
        ltrLink.media = "not all";
        rtlLink.media = "all";
      } else {
        ltrLink.media = "all";
        rtlLink.media = "not all";
      }

      document.documentElement.setAttribute('dir', language.dir);
      document.documentElement.setAttribute('lang', code);
      
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }, [i18n]);

  // useEffect(() => {
  //   if (!ready || !currentLanguageConfig) return;

  //   const isRTL = currentLanguageConfig.dir === 'rtl';

  //   console.log('---effect----');
  //   changeLanguage(currentLanguage);


  // }, [currentLanguage]);

  const preloadLanguages = useCallback(async (languageCodes) => {
    const promises = languageCodes.map(async (code) => {
      try {
        await i18n.loadLanguages(code);
      } catch (error) {
        console.warn(`Failed to preload language ${code}:`, error);
      }
    });
    
    await Promise.allSettled(promises);
  }, [i18n]);

  return {
    currentLanguage,
    currentLanguageConfig,
    supportedLanguages: SUPPORTED_LANGUAGES,
    changeLanguage,
    preloadLanguages,
    isReady: ready,
    direction: currentLanguageConfig?.dir || 'ltr',
    isRTL: currentLanguageConfig?.dir === 'rtl'
  };
};