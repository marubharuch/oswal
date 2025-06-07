import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

export default function TopNavbar() {
  const { currentUser } = useAuth();

  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-blue-800 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo - flex-shrink-0 prevents shrinking */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400"
            >
              FamilyConnect
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-end flex-1 space-x-8">
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-amber-100 transition duration-300 whitespace-nowrap"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/directory" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-amber-100 transition duration-300 whitespace-nowrap"
                >
                  Directory
                </Link>
                <Link 
                  to="/profile" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-amber-100 transition duration-300 whitespace-nowrap"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-amber-100 transition duration-300 whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-3 py-2 rounded-md text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white transition duration-300 whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu - Icons with fixed sizing */}
          <div className="md:hidden flex items-center justify-end flex-1 space-x-4">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 transition duration-300 focus:outline-none"
                  title="Dashboard"
                >
                  <HomeIcon className="h-6 w-6" />
                </Link>
                <Link
                  to="/directory"
                  className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 transition duration-300 focus:outline-none"
                  title="Directory"
                >
                  <UserGroupIcon className="h-6 w-6" />
                </Link>
                <Link
                  to="/profile"
                  className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 transition duration-300 focus:outline-none"
                  title="Profile"
                >
                  <UserIcon className="h-6 w-6" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 transition duration-300 focus:outline-none"
                  title="Sign In"
                >
                  <ArrowRightOnRectangleIcon className="h-6 w-6" />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center p-2 rounded-md bg-amber-500 hover:bg-amber-600 text-white transition duration-300 focus:outline-none"
                  title="Sign Up"
                >
                  <UserPlusIcon className="h-6 w-6" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}