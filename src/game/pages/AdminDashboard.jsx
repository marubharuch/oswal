import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
//import { drawNextNumber, getCalledNumbers, startGame, stopGame } from "../utils/gameApi"; // Placeholder utils, you can implement these
//import NumberBoard from "../components/NumberBoard"; // Show called numbers list
//import AdminPanel from "../components/AdminPanel"; // Any extra admin controls

import TicketViewer from "../components/TicketViewer";
import { generateTicket } from "../utils/ticketGenerator";
import NumberBoard from "../components/NumberBoard";







export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const ticket = generateTicket();
const sampleCalled = [5, 13, 29, 42, 60, 75];
/*
  const [gameStarted, setGameStarted] = useState(false);
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load called numbers on mount and subscribe to updates if needed
    async function fetchCalled() {
      const numbers = await getCalledNumbers();
      setCalledNumbers(numbers);
    }
    fetchCalled();
  }, []);

  const handleStartGame = async () => {
    setLoading(true);
    await startGame();
    setGameStarted(true);
    setLoading(false);
  };

  const handleStopGame = async () => {
    setLoading(true);
    await stopGame();
    setGameStarted(false);
    setLoading(false);
  };

  const handleDrawNumber = async () => {
    setLoading(true);
    const nextNumber = await drawNextNumber();
    if (nextNumber != null) {
      setCalledNumbers((prev) => [...prev, nextNumber]);
    }
    setLoading(false);
  };
*/
  return (
    <div className="min-h-screen bg-gray-50 p-1">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-sm font-bold">Admin Dashboard</h1>
        <div>
          <span className="mr-4 font-sm">Hello, {user?.displayName || user?.email}</span>
         {/* <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
  </button>*/}
        </div>
      </header>

  <NumberBoard calledNumbers={sampleCalled} />; 
<TicketViewer ticket={ticket} />



     {/* <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Game Controls</h2>
        <div className="flex gap-4">
          {!gameStarted ? (
            <button
              onClick={handleStartGame}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Start Game
            </button>
          ) : (
            <button
              onClick={handleStopGame}
              disabled={loading}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              Stop Game
            </button>
          )}

          <button
            onClick={handleDrawNumber}
            disabled={!gameStarted || loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Draw Next Number
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Called Numbers</h2>
        <NumberBoard numbers={calledNumbers} />
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Players (Coming Soon)</h2>
        <p className="text-gray-600">Player list and status will be displayed here.</p>
          </section>*/}
    </div>
  );
}
