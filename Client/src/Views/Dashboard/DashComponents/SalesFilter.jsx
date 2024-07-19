import React, { useDebugValue, useEffect, useState } from 'react';
const SalesFilters = ({ salesSearch,isFetching }) => {
    const [company, setCompany] = useState('');
    const [selectedSeller, setselectedSeller] = useState('');
    const [selectedSystem, setselectedSystem] = useState('');
    const [selectedQuery, setselectedQuery] = useState('');
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');

    ///////////////////////////////////// JSX Filter Components ///////////////////////////////
    const SalesDropDown = () => {
        return (
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
        )
    }

    const SystemDropDown = () => {
        return (
            <select
            className="border rounded p-2"
            value={selectedSystem}
            onChange={handleSystemDownChange}
        >
            {dropdownSystems.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select> 
        )
    }

    const StartDate =() => {   
        return (
            <>
                <label htmlFor="creationDate" className="text-white text-sm font-bold">Start Date:</label>
                <input type="date" id="creationDate" name="creationDate"   
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required 
                    onChange={handleStartDateChange}
                    value ={startDate}/>
                    
            </>
        )

    }
    const EndDate = () => {
        return (
            <>
                <label htmlFor="creationDate" className="text-white text-sm font-bold">End Date:</label>
                <input type="date" id="creationDate" name="creationDate"   
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required 
                    onChange={handleEndDateChange}
                    value ={endDate}
                    />   
            </>
        )
    }

    ///////////////////////////////////// Objects Values ///////////////////////////////
    const dropdownSystems =[    
        {value:'',label:"Select System"},
        { value: 'all', label: 'Search all' },
        { value: 'monarch', label: 'Monarch/PrintStream' },
        { value: 'quantum', label: 'Quantum' },
    ] 

    const dropdownQueryOptions = [
        {value:'',label:"Select Query"},
        { value: 'reorder', label: 'Reorder Notice' },
        { value: 'order', label: 'Client Back Order' },
    ];

    const dropdownSellerOptions = [
        {value:'',label:"Select Seller"},
        { value: 'all', label: 'Search All' },

    ];
    const queryFilters = {
        '':[<></>],
        'reorder' :[<SalesDropDown/>,<SystemDropDown/>,<StartDate/>,<EndDate/>],
        'order' :[<></>]
    }

    const queryParams ={
        'reorder': {
            'startDate':startDate.split('-').join(''),
            'endDate':endDate.split('-').join(''),
            'system':selectedSystem,
        }
    }
    //////////////////////////////////////////// Event Handlers/////////////////////////////////////////    
    const handleQueryDownChange = (e) => {
        setselectedQuery(e.target.value);
    };
    const handleSellerDownChange = (e) => {
        setselectedSeller(e.target.value);
    };
    const handleSystemDownChange = (e) => {
        setselectedSystem(e.target.value);
    }
    const handleStartDateChange =(e) => {
        setstartDate(e.target.value)
    }
    const handleEndDateChange =(e) => {
        setendDate(e.target.value)
    }

    //////////////////////////////////////// MAin JSX Component////////////////////////////////
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
            {
                queryFilters[selectedQuery].map((item)=> {
                    return item
                })
            }

                <button className={` ${isFetching ? "bg-white text-purple":"bg-purple text-white"}  font-bold py-2 px-4 border border-blue-700 rounded`} onClick={() => salesSearch(selectedQuery,queryParams[selectedQuery])}>
                    Search
                </button>

            </div>
        </div>
    );
};
export default SalesFilters