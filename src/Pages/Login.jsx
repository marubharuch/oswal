// src/pages/Login.jsx
import { signInWithPopup, provider } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { userDetails } = useAuth();

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    if (result.user && !userDetails) {
      navigate("/user-details");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="p-4">
      <button onClick={handleLogin} className="bg-green-600 text-white px-4 py-2">
        Sign in with Google
      </button>
    </div>
  );
}
