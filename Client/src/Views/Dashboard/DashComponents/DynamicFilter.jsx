import React, { useDebugValue, useEffect, useState, memo } from 'react';
const DynamicFilters = ({ search,isFetching,view }) => {
    const [company, setCompany] = useState('');
    const [selectedSeller, setselectedSeller] = useState('');
    const [selectedSystem, setselectedSystem] = useState('');
    const [selectedQuery, setselectedQuery] = useState('');
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [textData, settextData] = useState('');

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

    const dropdownQueryOptions = {
        "sales": [
            {value:'',label:"Select Query"},
            { value: 'reorder', label: 'Reorder Notice' },
            { value: 'order', label: 'Client Back Order' },
        ],
        "fgoods":[
            {value:'',label:"Select Query"},
            { value: 'job_receive_status', label: 'Job Receive Status' },
            { value: 'warehouse_search', label: 'Warehouse Search' },
        ]

    };

    const dropdownSellerOptions = [
        {value:'',label:"Select Seller"},
        { value: 'all', label: 'Search All' },

    ];
    const queryFilters = {
        'sales':{
            '':[<></>],
            'reorder' :[<SalesDropDown/>,<SystemDropDown/>,<StartDate/>,<EndDate/>],
            'order' :[<SystemDropDown/>,<StartDate/>,<EndDate/>]
        },
        'fgoods': {
            '':[<></>],
            'job_receive_status' :[<SystemDropDown/>],
            'warehouse_search' :[<SystemDropDown/>,<StartDate/>,<EndDate/>]
        }

    }

    const queryParams ={
        'reorder': {
            'startDate':startDate.split('-').join(''),
            'endDate':endDate.split('-').join(''),
        },
        'order' :{
            'startDate':startDate.split('-').join(''),
            'endDate':endDate.split('-').join(''),
        },
        'job_receive_status':{
            'job_id':textData
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
    const handleTextChange = (e) => {
        settextData(e.target.value);
        
    };
    
    const handleTextKeyDownChange = (e) => {
        if (e.key === 'Enter') {
            //getData(company,selectedSystem);
        }
    };

    //////////////////////////////////////// MAin JSX Component////////////////////////////////
    return (
        <div className="p-4 bg-purple">
            <div className="flex gap-4">
            <select
                    className="border rounded p-2"
                    value={selectedQuery}
                    onChange={handleQueryDownChange}
                >
                    {dropdownQueryOptions[view].map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {
                queryFilters[view][selectedQuery].map((item)=> {
                    return item
                })
            }
            {
                view==='fgoods' && selectedQuery==='job_receive_status'?         
                    <input
                        type="text"
                        placeholder= "Enter Job Number ex: 61234,65678,69878"
                        className="flex-1 p-2 border rounded"
                        value={textData}
                        onChange={handleTextChange}
                        onKeyDown={handleTextKeyDownChange}
                    />  
                :   <></>}
                <button className={` ${isFetching ? "bg-white text-purple":"bg-purple text-white"}  font-bold py-2 px-4 border border-blue-700 rounded`} onClick={() => search(selectedQuery,queryParams[selectedQuery],selectedSystem)}>
                    Search
                </button>

            </div>
        </div>
    );
};
export default DynamicFilters