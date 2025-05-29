import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function UserDetailsForm() {
  const [form, setForm] = useState({
    name: "",
    nativeLocation: "",
    phoneNumber: "",
    city: "",
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("User not authenticated");

    const userData = {
      ...form,
      email: user.email,
      role: "user",
    };

    try {
      await set(ref(db, `user_master/${user.uid}`), userData);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error saving user details:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Enter Your Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="nativeLocation"
          placeholder="Native Location"
          value={form.nativeLocation}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="Current City"
          value={form.city}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
