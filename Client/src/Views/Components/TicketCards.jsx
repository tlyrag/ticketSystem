const TicketCards =(props) => {
    
    if(!props.isLoading) {
    
        return props.Tickets.map((ticket) => {
                return TicketCard(ticket);
            })
       
    }
    return (
    <>
        Loading
    </>)
}

const TicketCard = (ticket) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white my-2 ">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{ticket.title}</div>
                <p className="text-gray-700 text-base">
                    {ticket.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Type: {ticket.type}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Urgency: {ticket.urgency}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Created: {ticket.creationDate}</span>
                {ticket.completionDate && (
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Completed: {ticket.completionDate}</span>
                )}
            </div>
        </div>
    );
};

export default TicketCards

