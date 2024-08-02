

import React, { useDebugValue, useEffect, useState } from 'react';
import DataTable from "./DashComponents/TableEx"
import apiController from "../../Controller/apiController";
import SummaryCard from './DashComponents/Cards';
import Filters from "./DashComponents/Filters";
import InitialDataPage from "./DashComponents/InitialDataPage";
import NotFoundPage from "./DashComponents/NotFound";
// Charts
import ExtSellChart from "./Charts/InventoryCharts/ExtMonthLineChart"
import PieChartInventoryByOwner from './Charts/InventoryCharts/InvOwnerPieChart';
import JobMonthBarChart from './Charts/InventoryCharts/JobMonthBarChart';

const Inventory = () => {
    /// Data //
    const [custData, setcustData] = useState([]);
    const [hasData, sethasData] = useState(false);
    const [fetchedSystem, setfetchedSystem] = useState();
    const [fetchedCompany, setfetchedCompany] = useState();
    const [totalSell, settotalSell] = useState();
    const [totalQtd, settotalQtd] = useState();
    const [custId, setcustId] = useState("");
    
    /// Handling View Item states///
    const [isFetching, setbtnIsFetching] = useState(false);
    const [btnIsSaving, setbtnIsSaving] = useState(false);
    const [showToast, setshowToast] = useState(false);
    const [initialPage, setinitialPage] = useState(true);
    
    
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

    const getData = async (custId,system) => {
        try {
            sethasData(false)
            setcustData([])
            setbtnIsFetching(true)
            setinitialPage(false)
            let custInv = null
            setcustId(custId)
            setfetchedCompany(custId);
            if(system === 'qm1' || system === 'qm2') {
                custInv = await apiController.getInventory(custId,system);
                setcustData(custInv.InvResult);
                setfetchedSystem('qm1');
                calculateTotalQuantity(custInv.InvResult);                
                if(custInv && custInv.InvResult.length>0) {
                    sethasData(true);
                }
                setbtnIsFetching(false)
            } else if(system==='monarch') {
                custInv = await apiController.getMonarchInventory(custId);
                setcustData(custInv.InvResult);
                setfetchedSystem('monarch');
                calculateTotalQuantity(custInv.InvResult);
                
                if(custInv && custInv.InvResult.length>0) {

                    sethasData(true);
                }
                setbtnIsFetching(false)
            } else if (system ==='all') {
                const inventorySources = [
                    () => apiController.getMonarchInventory(custId),
                    () => apiController.getInventory(custId, 'qm2'),
                    () => apiController.getInventory(custId, 'qm1')
                ];
                let iterator = 1
                for (const getSource of inventorySources) {
                    const result = await getSource();


                    if (result && result.InvResult.length > 0) {
                        setcustData(result.InvResult);
                        sethasData(true);
                        setfetchedSystem(result.system);
                        setbtnIsFetching(false)
                        calculateTotalQuantity(result.InvResult);
                        return;  
                    } 
                    iterator++;
                    if(iterator===inventorySources.length && result.InvResult.length==0) {
                        sethasData(false)
                        setbtnIsFetching(false)
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
                totalQtdOnHand += data["QTY ON HAND"] 
            }
            settotalSell( `$ ${(Math.round(totalExtendedSell * 100) / 100).toFixed(2)}`);
            settotalQtd(totalQtdOnHand);
        });
        
    }

    return (
        
        <div className="h-full bg-white drop-shadow-3xl m">
            <Filters getData={getData} isFetching={isFetching}/>

            <div className="flex flex-col items-center w-full p-4 ">
                {
                    hasData ? 
                    <>
                        <div className="flex flex-wrap justify-around w-full max-w-4xl">
                            <SummaryCard title="Total Quantity On Hand" value={totalQtd} />
                            <SummaryCard title="Total Extended Sell" value={totalSell} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-5 shadow-lg ">
                            <ExtSellChart data={custData} chart_title='Extended Sell Over Time' xAxis_tittle='Received Date' yAxis_tittle ='Extended Sell' />
                            <PieChartInventoryByOwner data={custData}/>
                        </div>
                        <div className="flex flex-wrap justify-around w-full max-w-4xl mt-5 shadow-lg">
                            <JobMonthBarChart data={custData}/>
                        </div>
                        
                    </>
                    :
                    // If is Loading this is being Rendered
                    isFetching ?
                    <div className="animate-pulse">
                        <h1 className="text-purple text-9xl">
                            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                            </svg>
                            Loading
                        </h1>
                    </div>
                    :
                    // If its initial Data
                    initialPage ?
                    <InitialDataPage/>
                    :
                    <NotFoundPage dataName={"Customer ID"} dataValue ={custId}/>
                }

        </div>
             { 
             hasData ? 
                <>
                    <DataTable custData={custData} /> 
                    <div className="flex items-center justify-center h-16">
                        <button className={` ${btnIsSaving ? "bg-white text-purple":"bg-purple text-white"}  font-bold py-2 px-4 border border-blue-700 rounded`} onClick={() => generateExcel()}>
                            Generate Excel
                        </button>
                        {
                            showToast ?
                                <div id="toast-bottom-right" className="fixed flex items-center w-full max-w-xs p-4 space-x-4 bg-purple divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
                                    <div className=" font-normal text-white">Excel successfully saved!</div>
                                </div>
                            :
                                <></>
                        }

                    </div>
                </>
            : <></>}

            <div className="grid grid-cols-2 gap-4 mt-5">
                {/* {hasData ? <BarChart custData={custData}/> : <>No Data</>}
                {hasData ? <PltBarChart custData={custData}/> :<>No Data</>} */}
                 {/* {hasData ? <ExtSellChart data={custData} chart_title='Extended Sell Over Time' xAxis_tittle='Received Date' yAxis_tittle ='Extended Sell'/> : <></>}  */}
            </div>
        </div>
    );
};

export default Inventory;




