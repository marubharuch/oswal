import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase";

function usePlayerNumberBoard() {
  const [calledNumbers, setCalledNumbers] = useState([]);

  useEffect(() => {
    const drawnRef = ref(db, 'housieGame/drawnNumbers');
    const unsubscribe = onValue(drawnRef, (snapshot) => {
      const val = snapshot.val();
      const nums = Array.isArray(val)
        ? val
        : typeof val === 'object'
        ? Object.keys(val).map(Number)
        : [];
      setCalledNumbers(nums);
    });

    return () => unsubscribe();
  }, []);

  return { calledNumbers };
}
