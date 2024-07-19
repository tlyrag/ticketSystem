import BarChart from "./Charts/BarChart";
import PltBarChart from "./Charts/PltBarChart"
import React, { useDebugValue, useEffect, useState } from 'react';
import DataTable from "./DashComponents/TableEx"
import apiController from "../../Controller/apiController";
import SummaryCard from './DashComponents/Cards';
import Filters from "./DashComponents/Filters";
import SalesFilters from "./DashComponents/SalesFilter";

const Sales = () => {
    /// Data //
    const [custData, setcustData] = useState([]);
    const [hasData, sethasData] = useState(false);
    const [fetchedSystem, setfetchedSystem] = useState();
    const [fetchedCompany, setfetchedCompany] = useState();
    const [totalSell, settotalSell] = useState();
    const [totalQtd, settotalQtd] = useState();
    
    /// Handling View Item states///
    const [isFetching, setbtnIsFetching] = useState(false);
    const [btnIsSaving, setbtnIsSaving] = useState(false);
    const [showToast, setshowToast] = useState(false);
    
    
    const generateExcel= async() => {
        setbtnIsSaving(true)
        let excelInfo = {
            custData:custData,
            system:fetchedSystem,
            company:fetchedCompany,
            query:"inventory"
        }
      await apiController.generateExcelFile(excelInfo)
      setbtnIsSaving(false);
      setshowToast(true);
      
      setTimeout(() => {
        setshowToast(false)
      }, 2000);
    }

    /**
     * Fetches data from Web server and returns the customer information based on the Inventory Query
     * @param {*} custId  Customer ID inside Monarc or Quantum, input comes from the user textBox in the filter
     * @param {*} system  System to query the information, comes from the selection in the dropdown in the filter
     * @returns 
     */

    const salesSearch = async (query,queryParams) => {
        const params = {
            'reorder': apiController.reorderNotice(queryParams),
        }


        try {
            sethasData(false)
            setcustData([])
            setbtnIsFetching(true)
            let custInv = null
            let result =  await params[query]
            setcustData(result.response);

            //setcustData(custInv.InvResult);
            // setfetchedSystem('quantum');
            // calculateTotalQuantity(custInv.InvResult);
            sethasData(true);
            setbtnIsFetching(false)
            
        } catch (error) {
            console.error("Failed to fetch inventory:", error);

        }
    };


    return (
        
        <div className="h-full bg-white drop-shadow-3xl m">
            <SalesFilters salesSearch={salesSearch} isFetching={isFetching}/>

            <div className="flex flex-col items-center w-full p-4">
                {
                    hasData ? 
                         <div className="flex flex-wrap justify-around w-full max-w-4xl">
                            {/* <SummaryCard title="Total Quantity On Hand" value={totalQtd} />
                            <SummaryCard title="Total Extended Sell" value={totalSell} />  */}
                        </div>
                    :
                    // If is Loading this is being Rendered
                    isFetching ?
                    <div className="animate-pulse">
                        <h1 class="text-purple text-9xl">
                            <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                            </svg>
                            Loading
                        </h1>
                    </div>
                    :
                    <>No Data</>
                }
        </div>
             { 
             hasData ? 
                <>
                    <DataTable custData={custData} /> 
                    <div className="flex items-center justify-center h-16">
                    </div>
                </>
            : <></>}

            <div className="grid grid-cols-2 gap-4 mt-5">
                {/* {hasData ? <BarChart custData={custData}/> : <>No Data</>}
                {hasData ? <PltBarChart custData={custData}/> :<>No Data</>} */}
            </div>
        </div>
    );
};

export default Sales;





