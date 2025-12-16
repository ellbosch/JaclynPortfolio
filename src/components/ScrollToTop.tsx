import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, key } = useLocation();

  useEffect(() => {
    // Check if this is a back/forward navigation (popstate)
    // by checking if we have a stored scroll position for this key
    const savedPosition = sessionStorage.getItem(`scroll-${key}`);

    if (savedPosition) {
      // Restore scroll position for back/forward navigation
      window.scrollTo(0, parseInt(savedPosition, 10));
    } else {
      // Scroll to top for new navigation
      window.scrollTo(0, 0);
    }

    // Save scroll position before leaving
    const saveScrollPosition = () => {
      sessionStorage.setItem(`scroll-${key}`, window.scrollY.toString());
    };

    window.addEventListener('beforeunload', saveScrollPosition);

    return () => {
      saveScrollPosition();
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [pathname, key]);

  return null;
};

export default ScrollToTop;
