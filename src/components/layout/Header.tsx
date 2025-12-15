import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useFilter } from '../../context/FilterContext';
import type { CategoryFilter } from '../../data/types';

const filterLabels: Record<CategoryFilter, string> = {
  all: 'All Work',
  'industrial-design': 'Industrial Design',
  '3d-visualization': '3D Visualization',
};

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isVisible, setIsVisible] = useState(!isHome);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { filter, setFilter } = useFilter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-sm font-medium transition-colors text-gray-900 dark:text-white flex items-center gap-1"
            >
              {filterLabels[filter]}
              <svg
                className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                {(Object.keys(filterLabels) as CategoryFilter[]).map((key) => (
                  <NavLink
                    key={key}
                    to="/"
                    onClick={() => {
                      setFilter(key);
                      setDropdownOpen(false);
                    }}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      filter === key
                        ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {filterLabels[key]}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
