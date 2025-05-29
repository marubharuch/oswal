import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Family Connect</h1>
      
      {currentUser ? (
        <div>
          <p className="text-xl mb-6">Hello, {currentUser.email}!</p>
          <Link 
            to="/dashboard" 
            className="inline-block bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div>
          <p className="text-xl mb-6">Please sign in to access your family dashboard</p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/signin" 
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}