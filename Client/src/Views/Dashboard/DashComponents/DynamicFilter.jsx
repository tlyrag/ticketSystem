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
            id="seller"
        >
            {dropdownSellerOptions.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select> 
        )
    }

    const SystemDropDown = (props) => {

        
        return (
            <> 
                {props.custom ? 
                <select
                    className="border rounded p-2"
                    value={selectedSystem}
                    onChange={handleSystemDownChange}
                    id = "system"
                    >
                    {props.systems.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select> 
                :
                
                <select
                    className="border rounded p-2"
                    value={selectedSystem}
                    onChange={handleSystemDownChange}
                    id = "system"
                >
                    {dropdownSystems.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select> 
                }
            </>
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
        { value: 'monarch', label: 'Monarch/PrintStream' },
        { value: 'quantum', label: 'Quantum' },
    ] 

    const dropdownQueryOptions = {
        "sales": [
            {value:'',label:"Select Query"},
            { value: 'reorder', label: 'Reorder Notice' },
            { value: 'order', label: 'Client Back Order' },
            { value: 'usage', label: 'Item Usage' },
            { value: 'summary_inv', label: 'Customer Summary Inventory' },
        ],
        "fgoods":[
            {value:'',label:"Select Query"},
            { value: 'job_receive_status', label: 'Job Receive Status' },
            { value: 'warehouse_search', label: 'Warehouse Search' },
            { value: 'ps_quantum_check', label: 'ItemID - PrintStream vs Quantum' },
        ],
        "administration":[
            {value:'',label:"Select Query"},
            { value: 'inv_variance_summary', label: 'Inventory Variance Summary' },
            { value: 'inv_variance_detail', label: 'Inventory Variance Detail' },
            { value: 'inv_variance_detail_no_subjobs', label: 'Inventory Variance Detail Without Subjobs' },
            { value: 'pick_variance', label: 'Open Picks Monarch vs Closed Picks PrintStream' },
            { value: 'compare_inv_balance', label: 'Compare Sum of FGJobClose to Inventory Balance' },
            { value: 'compare_inv_balance_view', label: 'Compare Sum of FGJobClose to the Inventory Balances, against the view' },
        ],

    };

    const dropdownSellerOptions = [
        {value:'',label:"Select Seller"},
        { value: 'all', label: 'Search All' },

    ];
    const queryFilters = {
        'sales':{
            '':[<></>],
            'reorder' :[<SalesDropDown/>,<SystemDropDown />,<StartDate/>,<EndDate/>],
            'order' :[<SystemDropDown/>,<StartDate/>,<EndDate/>],
            'usage' :[<SystemDropDown/>],
            'summary_inv' :[<SystemDropDown/>]
        },
        'fgoods': {
            '':[<></>],
            'job_receive_status' :[<SystemDropDown/>],
            'warehouse_search' :[<SystemDropDown/>,<StartDate/>,<EndDate/>],
            'ps_quantum_check':[<SystemDropDown custom={true} systems={[    
                {value:'',label:"Select System"},
                { value: 'qm1', label: 'Quantum 1' },
                { value: 'qm2', label: 'Quantum 2' },
            ] }/>]
        },
        'administration': {
            '':[<></>],
            'inv_variance_summary' :[<SystemDropDown/>],
            'inv_variance_detail' :[<SystemDropDown/>],
            'inv_variance_detail_no_subjobs' :[<SystemDropDown/>],
            'pick_variance' :[<SystemDropDown/>],
            'compare_inv_balance' :[<SystemDropDown/>],
            'compare_inv_balance_view' :[<SystemDropDown/>]
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
            'job_id':textData.trim()
        },
        'ps_quantum_check': {
            'item_id':textData.trim()
        },
        'usage':{
            "companyName":textData.trim()
        },
        'summary_inv':{
            "companyName":textData.trim()
        },
        'inv_variance_summary':"",
        'inv_variance_detail':"",
        "inv_variance_detail_no_subjobs":"",
        "pick_variance":"",
        "compare_inv_balance":"",
        "compare_inv_balance_view":""
        
            
        
    }
    const textPlaceholder = {
        "sales":{
            "usage":"Enter Item ID",
            "summary_inv":"Enter Company Code",
        },
        "fgoods":{
            "job_receive_status":"Enter Job Number ex: 61234,65678,69878",
            "ps_quantum_check":"Enter item id"
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
                    id="query"
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
                //textField[view][selectedQuery][hasText] 
                
                view == "sales" && selectedQuery == "usage"||
                view == "sales" && selectedQuery == "summary_inv"||
                view == "fgoods" && selectedQuery == "job_receive_status" ||
                view =='fgoods'&& selectedQuery == 'ps_quantum_check'
                 ?         
                    <input
                        type="text"
                        key={`${view}-${selectedQuery}`}
                        placeholder= {textPlaceholder[view][selectedQuery]}
                        className="flex-1 p-2 border rounded"
                        value={textData}
                        onChange={handleTextChange}
                        onKeyDown={handleTextKeyDownChange}
                        id= "dynamicText"
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