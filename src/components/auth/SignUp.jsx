import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { ref as dbRef, set } from 'firebase/database';
import { db } from '../../firebase';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with display name
      await updateProfile(user, {
        displayName: displayName
      });

      // Create user record in Realtime Database
      await set(dbRef(db, `users/${user.uid}`), {
        email: user.email,
        displayName: displayName,
        role: 'user', // Default role
        createdAt: new Date().toISOString()
      });

      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account: ' + err.message);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="displayName">Full Name</label>
          <input
            id="displayName"
            type="text"
            className="w-full p-2 border rounded"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">Already have an account? <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link></p>
      </div>
    </div>
  );
}