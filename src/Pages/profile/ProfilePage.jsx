import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { ref as dbRef, update, onValue } from 'firebase/database';
import { db } from '../../firebase';

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load user data on component mount
  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setPhotoURL(currentUser.photoURL || '');

      // Listen for realtime updates from database
      const userRef = dbRef(db, `users/${currentUser.uid}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          setDisplayName(userData.displayName || currentUser.displayName || '');
          setPhotoURL(userData.photoURL || currentUser.photoURL || '');
        }
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Update in Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: photoURL || null
      });

      // Update in Realtime Database
      await update(dbRef(db, `users/${currentUser.uid}`), {
        displayName,
        photoURL: photoURL || null,
        lastUpdated: new Date().toISOString()
      });

    } catch (err) {
      setError('Failed to update profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError('Error signing out: ' + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
            {photoURL ? (
              <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <h2 className="text-xl font-semibold">{displayName || 'User'}</h2>
          <p className="text-gray-600">{currentUser?.email}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Profile Photo URL</label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            
            <button
              type="button"
              onClick={handleSignOut}
              className="text-red-500 hover:text-red-700 py-2 px-4"
            >
              Sign Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}