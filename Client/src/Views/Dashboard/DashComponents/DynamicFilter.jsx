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
        { value: 'qm1', label: 'Quantum 1' },
        { value: 'qm2', label: 'Quantum 2' },
    ] 

    const dropdownQueryOptions = {
        "sales": [
            {value:'',label:"Select Query"},
            //{ value: 'order', label: 'Client Back Order' },
            //{ value: 'summary_inv', label: 'Customer Summary Inventory' },
            { value: 'usage', label: 'Item Usage' },
            { value: 'ps_item_usage_by_location', label: 'Item Usage by location'},
            { value: 'ps_item_usage_by_client', label: 'Item Usage by Company'},
            { value: 'reorder', label: 'Reorder Notice' },
            
        ],
        "fgoods":[
            {value:'',label:"Select Query"},
            { value: 'ps_quantum_check', label: 'ItemID - PrintStream vs Quantum' },
            { value: 'job_receive_status', label: 'Job Receive Status' },
            { value: 'openOrders', label: 'PS Open Line Orders' },
            { value: 'ps_item_cust', label: 'PS items by customer' },
            { value: 'warehouse_search', label: 'Warehouse Search' },
            
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
        "fulfillment":[
            {value:'',label:"Select Query"},
            {value:'dsf_orders_detail',label:"DSF Order Detail"},
            {value:'item_nomination_info',label:"Item Nomination Info"},
            
        ]

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
            'summary_inv' :[<SystemDropDown/>],
            'ps_item_usage_by_location':[<SystemDropDown/>],
            'ps_item_usage_by_client':[<SystemDropDown/>],
        },
        'fgoods': {
            '':[<></>],
            'job_receive_status' :[<SystemDropDown custom={true} systems={[ 
                {value:'',label:"Select System"},   
                {value:'monarch',label:"Monarch/PrintStream"}
            ] }/>],
            'ps_item_cust':[<SystemDropDown/>],
            'warehouse_search' :[<SystemDropDown/>,<StartDate/>,<EndDate/>],
            'ps_quantum_check':[<SystemDropDown custom={true} systems={[    
                {value:'',label:"Select System"},
                { value: 'qm1', label: 'Quantum 1' },
                { value: 'qm2', label: 'Quantum 2' },
            ] }/>],
            'openOrders':[<SystemDropDown/>]
        },
        'administration': {
            '':[<></>],
            'inv_variance_summary' :[<SystemDropDown/>],
            'inv_variance_detail' :[<SystemDropDown/>],
            'inv_variance_detail_no_subjobs' :[<SystemDropDown/>],
            'pick_variance' :[<SystemDropDown/>],
            'compare_inv_balance' :[<SystemDropDown/>],
            'compare_inv_balance_view' :[<SystemDropDown/>]
        },
        'fulfillment' :{
            '':[<></>],
            'dsf_orders_detail' :[<SystemDropDown custom={true} systems={[ 
                {value:'',label:"Select System"},   
                {value:'dsf',label:"DSF"}
            ] }/>],
            'item_nomination_info':[<SystemDropDown custom={true} systems={[ 
                {value:'',label:"Select System"},   
                {value:'monarch',label:"Monarch/PrintStream"}
            ] }/>]
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
        'ps_item_usage_by_client':{
            "companyName":textData.trim()
        },
        'inv_variance_summary':"",
        'inv_variance_detail':"",
        "inv_variance_detail_no_subjobs":"",
        "pick_variance":"",
        "compare_inv_balance":"",
        "compare_inv_balance_view":"",
        "openOrders":"",
        "ps_item_cust":{
            "companyName":textData.trim()
        },
        'ps_item_usage_by_location' :{
            "itemId" : textData.trim()
        },
        'dsf_orders_detail':{
            "orderNum":textData.trim()
        },
        'item_nomination_info':{
            "companyName":textData.trim()
        },
        
            
        
    }
    const textPlaceholder = {
        "sales":{
            "usage":"Enter Item ID",
            "summary_inv":"Enter Company Code",
            'ps_item_usage_by_client':"Enter Company Code",
            "ps_item_usage_by_location":"Enter Item ID"
        },
        "fgoods":{
            "job_receive_status":"Enter Job Number ex: 61234,65678,69878",
            "ps_quantum_check":"Enter item id",
            "ps_item_cust":"Enter Customer ID"
        },
        "fulfillment" : {
            "dsf_orders_detail":"Enter order Number",
            "item_nomination_info":"Enter Customer ID"
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
                    className="border rounded p-2 flex"
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
                view == "sales" && selectedQuery == "ps_item_usage_by_location"||
                view == "sales" && selectedQuery == "ps_item_usage_by_client"||
                view == "fgoods" && selectedQuery == "job_receive_status" ||
                view =='fgoods'&& selectedQuery == 'ps_quantum_check'||
                view =='fgoods'&& selectedQuery == 'ps_item_cust' ||
                view =='fulfillment' && selectedQuery == 'dsf_orders_detail' ||
                view =='fulfillment' && selectedQuery == 'item_nomination_info'
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