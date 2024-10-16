

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
import ExtMonthLineChartJs from './Charts/InventoryCharts/ExtMonthLineChartJs';
import InvOwnerDoughChartJs from './Charts/InventoryCharts/InvOnwerDoughChartJs';
import JobBarChart from './Charts/InventoryCharts/JobMonthBarChartJS';

const Inventory = () => {
    /// Data //
    const [custData, setcustData] = useState([]);
    const [hasData, sethasData] = useState(false);
    const [fetchedSystem, setfetchedSystem] = useState();
    const [fetchedCompany, setfetchedCompany] = useState();
    const [totalSell, settotalSell] = useState();
    const [totalQtd, settotalQtd] = useState();
    const [custId, setcustId] = useState("");
    const [outputPath, setoutputPath] = useState("");
    
    /// Handling View Item states///
    const [isFetching, setbtnIsFetching] = useState(false);
    const [btnIsSaving, setbtnIsSaving] = useState(false);
    const [showToast, setshowToast] = useState(false);
    const [initialPage, setinitialPage] = useState(true);
    
    /// Generate Excel Function
    const generateExcel= async() => {
        setbtnIsSaving(true)
        let excelInfo = {
            custData:custData,
            system:fetchedSystem,
            company:fetchedCompany,
            query:"inventory"
        }
      let excelresult = await apiController.generateExcelFile(excelInfo)
      setoutputPath(excelresult.outputPath)
      setbtnIsSaving(false);
      setshowToast(true);
      
      setTimeout(() => {
        setshowToast(false)
      }, 15000);
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
                    
                    console.log('Checking Source')
                    console.log(getSource)
                    
                    if (result && result.InvResult.length > 0) {
                        setcustData(result.InvResult);
                        sethasData(true);
                        setfetchedSystem(result.system);
                        setbtnIsFetching(false)
                        calculateTotalQuantity(result.InvResult);
                        return;  
                    } 
                    
                    console.log(`Checking ${iterator} from ${inventorySources.length}`)
                    if(iterator===inventorySources.length && result.InvResult.length==0) {
                        console.log(`Failed for ${getSource}`)
                        
                        sethasData(false)
                        setbtnIsFetching(false)
                    }
                    iterator++;
                    console.log(result)

                }
              
                
            }
            
            
            
        } catch (error) {
            console.error("Failed to fetch inventory:", error);

        }
    };
    ////////////////////////////////////// Calculating Data for Cards ///////////////////////////////////////////
    const calculateTotalQuantity =async(custData) => {
        let totalExtendedSell =0;
        let totalQtdOnHand = 0;
        let USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        custData.forEach(data => {
            //totalExtendedSell += data.EXTENDED_SELL;
            totalExtendedSell += data.subtotal;
            //From Quantum
            if(data.qty
            ) {
                //totalQtdOnHand += data.QUANTITY_ON_ORDER
                totalQtdOnHand += data.qty

            } 
            //From Monarch
            else {
                totalQtdOnHand += data["qty"] 
                //totalQtdOnHand += data["QUANTITY_ON_ORDER"] 
            }
            settotalSell( `${( USDollar.format(Math.round(totalExtendedSell * 100) / 100))}`);
            settotalQtd(totalQtdOnHand.toLocaleString());
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
                        <div className="grid grid-cols-10 gap-4 mt-5 flex flex-wrap w-full  shadow-lg">
                        <div className="col-span-3">
                                <InvOwnerDoughChartJs data={custData}/> 
                            </div>
                            <div className="col-span-6">
                                <ExtMonthLineChartJs data={custData}/>
                            </div>
                        <div className="col-span-10">
                            <JobBarChart data={custData}/>
                        </div>
                         </div>

                         {/* OLD CHARTS 
                                                     <div className="col-span-1 shadow-lg">
                                <PieChartInventoryByOwner data={custData}/>
                            </div>
                            <div className="col-span-1 shadow-lg"> 
                                <ExtSellChart data={custData} chart_title='Extended Sell Over Time' xAxis_title='Received Date' yAxis_title='Extended Sell' />
                            </div>
                            <div className="col-span-1 shadow-lg">
                                <PieChartInventoryByOwner data={custData}/>
                            </div>
                         <div className="col-span-1 shadow-lg">
                            <JobMonthBarChart data={custData}/>
                            </div> 
                        */}
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
                    <NotFoundPage status = {404} dataName={"Customer ID"} dataValue ={custId}/>
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
                                <div id="toast-bottom-right" className="fixed flex items-center p-4 space-x-4 bg-purple divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
                                    <div className=" font-normal text-white">
                                        Excel successfully saved!
                                        <br/>
                                        {/* <a href= {`erase  ${outputPath}`} target="_blank">Download</a> */}
                                        {outputPath}
                                    </div>
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




