import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import React from "react";

import { useNavigate } from "react-router-dom";

const Visitor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <div className="w-full max-w-md mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Welcome to the Oswal Family Directory!
          <span className="block text-xl mt-2">ઓસવાલ ફેમિલી ડિરેક્ટરીમાં આપનું સ્વાગત છે!</span>
        </h1>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          {user ? (
            <p className="text-lg mb-4">
              Welcome, <span className="font-semibold">{user.name || "User"}</span>! 
              <span className="block mt-2">You can now manage your family details.</span>
              <span className="block mt-2 text-sm">તમે હવે તમારી ફેમિલીની વિગતો મેનેજ કરી શકો છો.</span>
            </p>
          ) : (
            <>
              <p className="text-lg mb-2">After sign in, you can:</p>
              <ul className="text-left list-disc list-inside mb-4 space-y-1">
                <li>Add your personal/family details</li>
                <li>Edit your existing information</li>
                <li>View other approved members</li>
              </ul>
              <p className="text-sm italic">
                All submissions require admin approval. Thank you for keeping our community updated!
                <span className="block mt-1">બધી સબમિશન એડમિન મંજૂરી પછી જ દેખાશે. કમ્યુનિટી અપડેટ રાખવા બદલ આભાર!</span>
              </p>
            </>
          )}
        </div>

        {user ? (
          <button
            onClick={() => navigate("/profile")}
            className="w-full max-w-xs bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-200"
          >
            Go to Profile
          </button>
        ) : (
          <button
            onClick={() => navigate("/signin")}
            className="w-full max-w-xs bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-200"
          >
            Sign In / સાઇન ઇન
          </button>
        )}
      </div>
    </div>
  );
};

export default Visitor;