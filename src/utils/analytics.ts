// Google Analytics gtag type declaration
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      targetId: string | Date,
      params?: Record<string, string>
    ) => void;
  }
}

export const trackEvent = (
  eventName: string,
  params?: Record<string, string>
) => {
  console.log('[Analytics]', eventName, params);
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

export const trackPageView = (pagePath: string) => {
  console.log('[Analytics] page_view', { page_path: pagePath });
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', { page_path: pagePath });
  }
};
