import React, { useState,useEffect } from 'react';
import apiController from '../../Controller/apiController';
const TicketDetailsModal = ({ ticket, onClose,user }) => {
    const [comment, setComment] = useState('');

    useEffect(() => {
        console.log(ticket)    
    }, []);


    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const submitComment = async () => {
        
        await apiController.addComments(ticket._id,{user:user, message:comment})
        // await apiController.updateTicket(ticket._id, updatedTicket);
        console.log('Comment submitted:', comment);
        setComment(''); // Reset comment input after submission
    };
    const assignToMe = async () => {
        const user ={
            "user":"UserName"
        }
        await apiController.assignToMeTicket(ticket._id,user)
        onClose();
    };

    const cancelTicket = async () => {
        await apiController.cancelTicket(ticket._id)
        onClose();
    };
    const completeTicket = async () => {
        
        await apiController.completeTicket(ticket._id)
        onClose();
    };
  


    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{ticket.title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="mt-2">
                    <div className="mb-4">
                        <StatusTimeline Ticket={ticket}/>
                    </div>
                    <p className="text-sm text-gray-500">{ticket.description}</p>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Add a comment..."
                        className="mt-4 w-full p-2 border rounded"
                    />
                    <button onClick={submitComment} className="mt-2 bg-purple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit Comment
                    </button>
                    <button onClick={assignToMe } className="mt-2 bg-purple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5">
                        Assign to Me
                    </button>
                    <button onClick={cancelTicket} className="mt-2 bg-purple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5">
                        Cancel Ticket
                    </button>
                    <button onClick={completeTicket} className="mt-2 bg-purple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5">
                        Complete Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};


/////////////// Ticket Timeline Component showing inside the model  /////////////////////////
const StatusTimeline = ({ Ticket }) => {

    const statusOptions = ["Created", "Working", "Completed","Cancelled"];
    const currentStatusIndex = statusOptions.indexOf(Ticket.status);
    const isCancelled = Ticket.status === "Cancelled";
    const statusDate =  {
        "Created": Ticket.creationDate,
        "Working": Ticket.assignedDate,
        "Completed": Ticket.completionDate,
        "Cancelled": Ticket.cancelationDate,

    }

    // Function to determine the color class based on status index
    const getColorClass = (index) => {

        if (isCancelled) return 'red'; // If cancelled, all statuses turn red
        return index <= currentStatusIndex ? 'purple' : 'gray-200'; // Otherwise, completed and current statuses are purple
    };

    return (
        <ol className="items-center sm:flex">
            {statusOptions.map((status, index) => (
                <li key={status} className="relative mb-6 sm:mb-0">
                    <div className="flex items-center">
                    <div className={`hidden sm:flex w-full h-0.5 bg-${getColorClass(index)}`}></div>
                        <div className={`z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white sm:ring-8 shrink-0 bg-${getColorClass(index)}`}>
                            <svg className="w-2.5 h-2.5 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 100 2h2a1 1 0 100-2v-3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        
                    </div>
                    <div className="mt-3 sm:pr-8">
                        <h3 className={`text-lg font-semibold text-${getColorClass(index)}`}>{status}</h3>
                        <time className= {`block mb-2 text-sm font-normal leading-none text-${getColorClass(index)}`}>{statusDate[statusOptions[index]]}</time>
                    </div>
                </li>
            ))}
        </ol>
    );
};

export default TicketDetailsModal;
