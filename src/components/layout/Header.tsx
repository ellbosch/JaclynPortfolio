import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isVisible, setIsVisible] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      // Show header after scrolling past hero section (~200px)
      const scrollThreshold = 200;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white dark:bg-gray-950 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            style={{
              fontFamily: "'pragmatica', sans-serif",
              fontSize: '34px',
              lineHeight: '40.8px',
            }}
          >
            JACLYN LOWERY
          </Link>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            Work
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
