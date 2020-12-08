import React, { useEffect, useState } from "react";
import generatePDF from "./reportGenerator";
import TicketsComponent from './TicketComponent';
import axios from 'axios';

const Tickets = () => {
  
  const [tickets, setTickets] = useState([]);
  

  useEffect(() => {
    const getAllTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tickets");
        setTickets(response.data.tickets);
      } catch (err) {
        console.log("error");
      }
    };
    getAllTickets();
  }, []);

const reportTickets = tickets.filter(ticket => ticket.status === "completed");
  
  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
            <button
              className="btn btn-primary"
              onClick={() => generatePDF(reportTickets)}
            >
              Generate monthly report
            </button>
        </div>
      </div>
      <TicketsComponent tickets={tickets} />
    </div>
  );
};

export default Tickets;