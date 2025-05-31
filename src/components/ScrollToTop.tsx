import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to top for better UX
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    // Set focus to main content for accessibility
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus({ preventScroll: true });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;