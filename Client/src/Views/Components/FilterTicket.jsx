import React, { useState } from 'react';
const FilterTicket = (props) => {

        const [searchTerm, setSearchTerm] = useState('');
        const [startDate, setStartDate] = useState('');
        const [endDate, setEndDate] = useState('');
    
        // Handle change in search term
        const handleSearchChange = (e) => {
            setSearchTerm(e.target.value);
            props.filterTickets(e.target.value);

        };
    
        // Handle change in start date
        const handleStartDateChange = (e) => {
            setStartDate(e.target.value);
            props.filterTickets(e.target.value);
        };
    
        // Handle change in end date
        const handleEndDateChange = (e) => {
            setEndDate(e.target.value);
           props.filterTickets(e.target.value);
        }
    
        // Update filters based on current state
        const updateFilters = () => {
            onFilterChange({
                searchTerm,
                startDate,
                endDate
            });
        };

        return (
            <div className="p-4 bg-purple ">
            <div className="flex gap-4 mb-4">

            </div>
            <div className="flex gap-4">
                <input
                    type="date"
                    className="p-2 border rounded"
                    value={startDate}
                    onChange={handleStartDateChange}
                />
                <input
                    type="date"
                    className="p-2 border rounded"
                    value={endDate}
                    onChange={handleEndDateChange}
                />
                      
                <input
                    type="text"
                    placeholder="Search tickets..."
                    className="flex-1 p-2 border rounded"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
        </div>
        )
}

export default FilterTicket;