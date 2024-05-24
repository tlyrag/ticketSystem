import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiController from '../../Controller/apiController';
const NewTicket = () => {
    const [ticket, setTicket] = useState({
        title: '',
        description: '',
        type: '',
        urgency: '',
        creationDate: new Date().toISOString().slice(0, 10)
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await apiController.addTicket(ticket);
         navigate('/')
        console.log('Submitted', ticket);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-10 p-6 rounded shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-6">Create New Ticket</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                <input type="text" id="title" name="title" value={ticket.title} onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                <textarea id="description" name="description" value={ticket.description} onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type:</label>
                <select id="type" name="type" value={ticket.type} onChange={handleChange}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select Type</option>
                    <option value="Bug">Bug</option>
                    <option value="Feature">Feature</option>
                    <option value="Task">Task</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="urgency" className="block text-gray-700 text-sm font-bold mb-2">Urgency:</label>
                <select id="urgency" name="urgency" value={ticket.urgency} onChange={handleChange}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="">Select Urgency</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="creationDate" className="block text-gray-700 text-sm font-bold mb-2">Creation Date:</label>
                <input type="date" id="creationDate" name="creationDate" value={ticket.creationDate} onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" className="bg-purple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit Ticket
            </button>
        </form>
    );
};

export default NewTicket;
