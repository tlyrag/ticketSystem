import BarChart from "./Charts/BarChart";
import PltBarChart from "./Charts/PltBarChart"
import React, { useDebugValue, useEffect, useState } from 'react';
import DataTable from "./DashComponents/TableEx"
import apiController from "../../Controller/apiController";

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

const Inventory = () => {
    const [custData, setcustData] = useState([]);
    const [hasData, sethasData] = useState(false);
    const [isFetching, setisFetching] = useState(false);

    const getData = async (custId,system) => {
        try {
            setisFetching(true)
            let custInv = null
            if(system === 'qm1' || system === 'qm2') {
                custInv = await apiController.getInventory(custId,system);
                setcustData(custInv.InvResult);
                sethasData(true)
            } else if(system==='monarch') {
                custInv = await apiController.getMonarchInventory(custId);
                setcustData(custInv.InvResult);
                sethasData(true)
            } else if (system ==='all') {
                const inventorySources = [
                    () => apiController.getMonarchInventory(custId),
                    () => apiController.getInventory(custId, 'qm2'),
                    () => apiController.getInventory(custId, 'qm1')
                ];

                for (const getSource of inventorySources) {
                    const result = await getSource();
                    
                    if (result && result.InvResult.length > 0) {
                        setcustData(result.InvResult);
                        sethasData(true);
                        setisFetching(false)
                        return;  
                    } 
                }
              
                
            }
            
            
            
        } catch (error) {
            console.error("Failed to fetch inventory:", error);

        }
    };

    return (
        <div className="h-full bg-white drop-shadow-3xl m">
            <Filters getData={getData} />
             { hasData ? <DataTable custData={custData} /> : <>No Data</>}
            <div className="grid grid-cols-2 gap-4 mt-5">
                {hasData ? <BarChart custData={custData}/> : <>No Data</>}
                {hasData ? <PltBarChart custData={custData}/> :<>No Data</>}
            </div>
        </div>
    );
};

export default Inventory;




