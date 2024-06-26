import BarChart from "./Charts/BarChart";
import PltBarChart from "./Charts/PltBarChart"
import React, { useEffect, useState } from 'react';
import DataTable from "./DashComponents/TableEx"
import apiController from "../../Controller/apiController";

const Filters = ({ getData }) => {
    const [company, setCompany] = useState('');

    
    const handleSearchChange = (e) => {
        setCompany(e.target.value);
        
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
                />
                <button className="bg-purple hover:bg-white hover:text-purple text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => getData(company)}>
                    Search
                </button>
            </div>
        </div>
    );
};

const Inventory = () => {
    const [custData, setcustData] = useState([]);
    const [hasData, sethasData] = useState(false);

    const getData = async (param) => {
        try {
            const custInv = await apiController.getInventory(param);
            setcustData(custInv.InvResult.result);
            sethasData(true)
        } catch (error) {
            console.error("Failed to fetch inventory:", error);
        }
    };

    return (
        <div className="h-full bg-white drop-shadow-3xl m">
            <Filters getData={getData} />
             { hasData ? <DataTable custData={custData} /> : <>No Data</>}
            <div className="grid grid-cols-2 gap-4 mt-5">
                <BarChart />
                <PltBarChart />
            </div>
        </div>
    );
};

export default Inventory;




