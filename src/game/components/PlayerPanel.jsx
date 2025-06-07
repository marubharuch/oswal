import React, { useEffect, useState } from "react";
import TicketViewer from "../components/TicketViewer";
import { generateTicket } from "../utils/ticketGenerator";

export default function PlayerPanel() {
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    setTicket(generateTicket());
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Ticket</h2>
      {ticket.length > 0 && <TicketViewer ticket={ticket} />}
    </div>
  );
}
