import { useState } from "react";
import { db } from "../firebase";
import { ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserDetailsForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", native: "", phone: "", city: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update(ref(db, `userMaster/${user.uid}`), {
      ...form,
      role: "user",
    });
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <input placeholder="Name" required onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Native" required onChange={e => setForm({ ...form, native: e.target.value })} />
      <input placeholder="Phone" required onChange={e => setForm({ ...form, phone: e.target.value })} />
      <input placeholder="Current City" required onChange={e => setForm({ ...form, city: e.target.value })} />
      <button className="bg-green-500 text-white p-2">Save</button>
    </form>
  );
}
