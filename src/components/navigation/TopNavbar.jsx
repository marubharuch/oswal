import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function TopNavbar() {
  const { currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    
    <nav className="w-full bg-gradient-to-r from-blue-600 to-blue-800 ...">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400"
            >
              FamilyConnect
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-amber-100 transition duration-300"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/directory" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-amber-100 transition duration-300"
                >
                  Directory
                </Link>
                <Link 
                  to="/profile" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-amber-100 transition duration-300"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-amber-100 transition duration-300"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-3 py-2 rounded-md text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 focus:outline-none transition duration-300"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 hover:text-amber-100 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/directory"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 hover:text-amber-100 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Directory
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 hover:text-amber-100 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 hover:text-amber-100 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-amber-500 hover:bg-amber-600 text-white transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}