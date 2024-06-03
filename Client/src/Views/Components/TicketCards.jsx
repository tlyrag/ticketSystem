import TicketDetailsModal from "./TicketDetailsModal";
import  { useState } from 'react';

const statusColors = {
    Created: "text-purple",
    Working: "text-blue",
    Cancelled: "text-red",
    Completed: "text-green"
};

const TicketCards =(props) => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    
    const handleRowClick = (ticket) => {
        setSelectedTicket(ticket);
    };
    
    if(!props.isLoading) {
     return (
        <div className="container mx-auto px-4 py-4">
        <table className="min-w-full table-auto drop-shadow-3xl">
            <thead>
                <tr className="bg-purple text-white uppercase text-sm leading-normal text-align-left">
                    <th className="py-3 px-6 text-left">Created by</th>
                    <th className="py-3 px-6 text-left">Title</th>
                    <th className="py-3 px-6 text-left">Type</th>
                    <th className="py-3 px-6 text-left">Urgency</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Assigned To</th>
                    <th className="py-3 px-6 text-center">Creation Date</th>
                    <th className="py-3 px-6 text-center">Completion Date</th>
                </tr>
            </thead>
            <tbody className="text-gray-600   text-lg">
                {props.Tickets.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate)).slice(0, 10).map((ticket, index) => 
                     
                     <TicketCard ticket={ticket} key={index} handleRowClick={handleRowClick}/>
                )}
            </tbody>
        </table>
        {selectedTicket && <TicketDetailsModal ticket={selectedTicket} user={props.user} onClose={() => setSelectedTicket(null)} />}
    </div>
    )

       
    }
    return (
    <>
        Loading
    </>)
}


const TicketCard = ({key,ticket,handleRowClick}) => {


    return (
        <tr key={key} className={`border-b border-gray-200 hover:bg-gray-100 cursor-pointer ${statusColors[ticket.status]}`} onClick={() => handleRowClick(ticket)}>
            <td className="py-3 px-6 text-left whitespace-nowrap">{ticket.createdby}</td>
            <td className="py-3 px-6 text-left whitespace-nowrap">{ticket.title}</td>
            <td className="py-3 px-6 text-left">{ticket.type}</td>
            <td className="py-3 px-6 text-left">{ticket.urgency}</td>
            <td className={`py-3 px-6 text-left  `}><b>{ticket.status}</b></td>
            <td className="py-3 px-6 text-left">{ticket.assignedTo}</td>
            <td className="py-3 px-6 text-center">{ticket.creationDate}</td>
            <td className="py-3 px-6 text-center">{ticket.completionDate}</td>
        </tr>
    );
};

export default TicketCards

