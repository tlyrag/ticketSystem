import React, { useDebugValue, useEffect, useState } from 'react';
const Filters = ({ getData }) => {
    const [company, setCompany] = useState('');
    const [selectedSystem, setselectedSystem] = useState('');

    const dropdownOptions = [
        {value:'',label:"Select System"},
        { value: 'all', label: 'Search All' },
        { value: 'monarch', label: 'Monarch/PrintStream' },
        { value: 'qm1', label: 'Quantum 1' },
        { value: 'qm2', label: 'Quantum 2' }
    ];
    const handleSearchChange = (e) => {
        setCompany(e.target.value);
        
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getData(company,selectedSystem);
        }
    };
    const handleSystemChange = (e) => {
        setselectedSystem(e.target.value);
    };

    return (
        <div className="p-4 bg-purple">
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Search for Customer"
                    className="flex-1 p-2 border rounded"
                    value={company}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
                <select
                    className="border rounded p-2"
                    value={selectedSystem}
                    onChange={handleSystemChange}
                >
                    {dropdownOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <button className="bg-purple hover:bg-white hover:text-purple text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => getData(company,selectedSystem)}>
                    Search
                </button>
            </div>
        </div>
    );
};
export default Filters