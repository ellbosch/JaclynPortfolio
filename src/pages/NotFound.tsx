import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-2 lg:px-4 py-16">
      <div className="text-center py-20">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Page not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
