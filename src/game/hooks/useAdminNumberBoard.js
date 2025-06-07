import { useState } from "react";
import { set, ref, update } from "firebase/database";
import { db } from "./firebase";

function useAdminNumberBoard() {
  const [calledNumbers, setCalledNumbers] = useState([]);

  const drawRandom = () => {
    const allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
    const remaining = allNumbers.filter(n => !calledNumbers.includes(n));
    const newNumber = remaining[Math.floor(Math.random() * remaining.length)];

    const updated = [...calledNumbers, newNumber];

    // update Firebase
    update(ref(db, 'housieGame'), {
      drawnNumbers: updated,
      currentNumber: newNumber,
    });

    // update local state
    setCalledNumbers(updated);
  };

  const selectNumber = (num) => {
    if (calledNumbers.includes(num)) return;
    const updated = [...calledNumbers, num];

    update(ref(db, 'housieGame'), {
      drawnNumbers: updated,
      currentNumber: num,
    });

    setCalledNumbers(updated);
  };

  return { calledNumbers, drawRandom, selectNumber };
}
