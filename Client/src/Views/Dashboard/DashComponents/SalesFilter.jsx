import React, { useDebugValue, useEffect, useState } from 'react';
const SalesFilters = ({ getData }) => {
    const [company, setCompany] = useState('');
    const [selectedSeller, setselectedSeller] = useState('');
    const [selectedQuery, setselectedQuery] = useState('');


    const dropdownQueryOptions = [
        {value:'',label:"Select Query"},
        { value: 'reorder', label: 'Reorder Notice' },
        { value: 'order', label: 'Sales Order' },
    ];

    const dropdownSellerOptions = [
        {value:'',label:"Select Seller"},
        { value: 'all', label: 'Search All' },

    ];
    const handleSearchChange = (e) => {
        setCompany(e.target.value);
        
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        }
    };
    const handleQueryDownChange = (e) => {
        setselectedQuery(e.target.value);
    };
    const handleSellerDownChange = (e) => {
        setselectedSeller(e.target.value);
    };

    return (
        <div className="p-4 bg-purple">
            <div className="flex gap-4">
            <select
                    className="border rounded p-2"
                    value={selectedQuery}
                    onChange={handleQueryDownChange}
                >
                    {dropdownQueryOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <select
                    className="border rounded p-2"
                    value={selectedSeller}
                    onChange={handleSellerDownChange}
                >
                    {dropdownSellerOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Search for Customer"
                    className="flex-1 p-2 border rounded"
                    value={company}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />

                <button className="bg-purple hover:bg-white hover:text-purple text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => getData(selectedSeller,selectedQuery)}>
                    Search
                </button>
            </div>
        </div>
    );
};
export default SalesFilters