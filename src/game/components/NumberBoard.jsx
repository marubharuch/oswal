import React from "react";

export default function NumberBoard({ calledNumbers = [] }) {
  const columns = Array.from({ length: 9 }, (_, colIndex) => {
    const start = colIndex * 10 + 1;
    const end = colIndex === 8 ? 90 : start + 9;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  return (
    <div className="flex justify-center gap-0.5 overflow-x-auto bg-white p-2 rounded shadow">
      {columns.map((col, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-0.5">
          {col.map((num) => (
            <div
              key={num}
              className={`w-6 h-6 flex items-center justify-center rounded text-xs font-semibold border
                ${
                  calledNumbers.includes(num)
                    ? "bg-green-600 text-white border-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
            >
              {num}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}