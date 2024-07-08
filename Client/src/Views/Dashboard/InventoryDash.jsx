import BarChart from "./Charts/BarChart";
import PltBarChart from "./Charts/PltBarChart"
import React, { useDebugValue, useEffect, useState } from 'react';
import DataTable from "./DashComponents/TableEx"
import apiController from "../../Controller/apiController";
import SummaryCard from './DashComponents/Cards';
import Filters from "./DashComponents/Filters";

const Inventory = () => {
    const [custData, setcustData] = useState([]);
    const [hasData, sethasData] = useState(false);
    const [isFetching, setisFetching] = useState(false);
    const [fetchedSystem, setfetchedSystem] = useState();
    const [fetchedCompany, setfetchedCompany] = useState();
    const [totalSell, settotalSell] = useState();
    const [totalQtd, settotalQtd] = useState();
    
    const generateExcel= async() => {

        let excelInfo = {
            custData:custData,
            system:fetchedSystem,
            company:fetchedCompany,
            query:"inventory"
        }
      await apiController.generateExcelFile(excelInfo)

    }

    /**
     * Fetches data from Web server and returns the customer information based on the Inventory Query
     * @param {*} custId  Customer ID inside Monarc or Quantum, input comes from the user textBox in the filter
     * @param {*} system  System to query the information, comes from the selection in the dropdown in the filter
     * @returns 
     */

    const getData = async (custId,system) => {
        try {
            setisFetching(true)
            let custInv = null
            setfetchedCompany(custId);
            if(system === 'qm1' || system === 'qm2') {
                custInv = await apiController.getInventory(custId,system);
                setcustData(custInv.InvResult);
                setfetchedSystem('qm1');
                calculateTotalQuantity(custInv.InvResult);
                sethasData(true);
            } else if(system==='monarch') {
                custInv = await apiController.getMonarchInventory(custId);
                setcustData(custInv.InvResult);
                setfetchedSystem('monarch');
                calculateTotalQuantity(custInv.InvResult);
                sethasData(true);
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
                        setfetchedSystem(result.system);
                        setisFetching(false)
                        calculateTotalQuantity(result.InvResult);
                        return;  
                    } 
                }
              
                
            }
            
            
            
        } catch (error) {
            console.error("Failed to fetch inventory:", error);

        }
    };

    const calculateTotalQuantity =async(custData) => {
        let totalExtendedSell =0;
        let totalQtdOnHand = 0;
        custData.forEach(data => {
            totalExtendedSell += data.EXTENDED_SELL;
            //From Quantum
            if(data.QTY_ON_HAND) {
                totalQtdOnHand += data.QTY_ON_HAND
            } 
            //From Monarch
            else {
                totalQtdOnHand += data["UOD QUANTITY"] 
            }
            settotalSell( `$ ${(Math.round(totalExtendedSell * 100) / 100).toFixed(2)}`);
            settotalQtd(totalQtdOnHand);
        });
    
    }

    return (
        
        <div className="h-full bg-white drop-shadow-3xl m">
            <Filters getData={getData} />

            <div className="flex flex-col items-center w-full p-4">
                {
                    hasData ? 
                         <div className="flex flex-wrap justify-around w-full max-w-4xl">
                            <SummaryCard title="Total Quantity On Hand" value={totalQtd} />
                            <SummaryCard title="Total Extended Sell" value={totalSell} /> 
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
                        <button className="bg-purple hover:bg-white hover:text-purple text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => generateExcel()}>
                            Generate Excel
                        </button>
                    </div>
                </>
            : <>No Data</>}

            <div className="grid grid-cols-2 gap-4 mt-5">
                {/* {hasData ? <BarChart custData={custData}/> : <>No Data</>}
                {hasData ? <PltBarChart custData={custData}/> :<>No Data</>} */}
            </div>
        </div>
    );
};

export default Inventory;




