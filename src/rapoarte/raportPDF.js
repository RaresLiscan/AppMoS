//TODO: adaptat la datele din cpanel

// //https://www.freecodecamp.org/news/how-to-create-pdf-reports-in-react/
// import React, {useState, useEffect} from 'react';
// import generatePDF from './reportGenerator';

// export default function PdfReport() {

//     const [tickets, setTickets] = useState([]);
  

//     useEffect(() => {
//       const getAllTickets = async () => {
//         try {
//           const response = await axios.get("http://localhost:3000/tickets");
//           setTickets(response.data.tickets);
//         } catch (err) {
//           console.log("error");
//         }
//       };
//       getAllTickets();
//     }, []);
  
//   const reportTickets = tickets.filter(ticket => ticket.status === "completed");
    
//     return (
//       <div>
//         <div className="container mb-4 mt-4 p-3">
//           <div className="row">
//             {user.user.role === "user" ? (
//               <> </>
//             ) : (
//               <button
//                 className="btn btn-primary"
//                 onClick={() => generatePDF(reportTickets)}
//               >
//                 Generate monthly report
//               </button>
//             )}
//           </div>
//         </div>
//         <TicketsComponent tickets={tickets} />
//       </div>
//     );

// }