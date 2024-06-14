import BarChart from "./Charts/BarChart";
import PltBarChart from "./Charts/PltBarChart"
import React, { useState } from 'react';
const Filters = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    return (
        <div className="p-4 bg-purple ">
        <div className="flex gap-4 mb-4">

        </div>
        <div className="flex gap-4">
        <input
                type="date"
                className="p-2 border rounded"
                value={startDate}
            />
            
            <input
                type="date"
                className="p-2 border rounded"
                value={endDate}
            />
                  
            <input
                type="text"
                placeholder="Search for Customer"
                className="flex-1 p-2 border rounded"
                value={searchTerm}
            />
        </div>
    </div>
    )
}
const Inventory =() => {
    return (
    <div className="h-full bg-white drop-shadow-3xl m ">
            <div className="">
                <Filters/>
            </div>
           <div className="grid grid-cols-2 gap-4 mt-5">
                <div><BarChart/></div> 
                <div><PltBarChart/></div> 
            </div> 
           <div>

           </div>
    </div>
    )
}

export default Inventory;