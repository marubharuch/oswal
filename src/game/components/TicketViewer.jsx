import React from "react";

export default function TicketViewer({ ticket }) {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden p-1">
      <div className="grid grid-cols-9 gap-px bg-gray-300">
        {ticket.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`h-8 flex items-center justify-center text-xs font-medium
                ${
                  cell
                    ? "bg-white text-gray-800 border border-gray-200"
                    : "bg-gray-100"
                }`}
            >
              {cell || ""}
            </div>
          ))
        )}
      </div>
    </div>
  );
}