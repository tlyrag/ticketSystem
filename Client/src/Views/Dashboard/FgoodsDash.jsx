import React, { useDebugValue, useEffect, useState } from 'react';
import DataTable from "./DashComponents/TableEx"
import apiController from "../../Controller/apiController";
import SummaryCard from './DashComponents/Cards';
import DynamicFilters from './DashComponents/DynamicFilter';
import InitialDataPage from "./DashComponents/InitialDataPage";
import NotFoundPage from "./DashComponents/NotFound";
// Charts
import ExtSellChart from "./Charts/InventoryCharts/ExtMonthLineChart"
import PieChartInventoryByOwner from './Charts/InventoryCharts/InvOwnerPieChart';
import JobMonthBarChart from './Charts/InventoryCharts/JobMonthBarChart';

const FgoodsDash = () => {

    /// Data //
    const [custId, setcustId] = useState("");
    const [outputPath, setoutputPath] = useState("");    
    const [custData, setcustData] = useState([]);
    const [fetchedSystem, setfetchedSystem] = useState();
    const [fetchedCompany, setfetchedCompany] = useState();
    const [totalSell, settotalSell] = useState();
    const [totalQtd, settotalQtd] = useState();
    const [queryRan, setqueryRan] = useState();
    const [reqStatus, setreqStatus] = useState("");
    
    /// Handling View Item states///
    const [isFetching, setbtnIsFetching] = useState(false);
    const [btnIsSaving, setbtnIsSaving] = useState(false);
    const [showToast, setshowToast] = useState(false);
    const [initialData, setinitialData] = useState(true);
    const [hasData, sethasData] = useState(false);
    
    const search = async (query,queryParams,system) => {
        
        const params = {
            'reorder': () => apiController.reorderNotice(queryParams,system),
            'order':() =>apiController.runQuery(query,queryParams,system),
            'ps_item_cust':() =>apiController.runQuery(query,queryParams,system),
            'job_receive_status':()=> {
                let splitParams = queryParams.job_id.trim().split(',')
                return apiController.runQuery(query,splitParams,system)
            },
            'ps_quantum_check': () => {
                let splitParams = queryParams.item_id.trim().split(',')
                return apiController.runProc(query,splitParams,system)
            } ,
            'openOrders':()=> apiController.runQuery(query,queryParams,system),
        }

        try {

            setqueryRan(query)
            setfetchedSystem(system)
            sethasData(false)
            setcustData([])
            setbtnIsFetching(true)
            setinitialData(false)
            let custInv = null
            let result =  await params[query]()
            setcustData(result.response);
            
            if(result.response && result.response.length >0)
            {
                sethasData(true);
            }
            else if(!result.ok) {
                setinitialData(false) 
                setreqStatus(500) 
            }
            else 
            {
                setinitialData(false) 
                setreqStatus(404) 
            }
            setbtnIsFetching(false)
            
        } catch (error) {
            console.error("Failed to fetch inventory:", error);

        }
    };

    
    const generateExcel= async(query) => {
        try {    
            console.log(custData)
            setbtnIsSaving(true)
            let excelInfo = {
                custData:custData,
                system:fetchedSystem,
                company:"",
                query:query
            }
            console.log(excelInfo)
            let excelresult = await apiController.generateExcelFile(excelInfo)
            setoutputPath(excelresult.outputPath)
            setbtnIsSaving(false);
            setshowToast(true);
            
            setTimeout(() => {
                setshowToast(false)
            }, 15000);
        } catch(error) {
            console.log(`Failed to generate excel file ${error}`)
        }
    }


    return (
        
        <div className="h-full bg-white drop-shadow-3xl m">
            <DynamicFilters search={search} isFetching={isFetching} view='fgoods'/>
            <div className="flex flex-col items-center w-full p-4 ">
                {
                    hasData ? 
                    <>
                        {/* <div className="flex flex-wrap justify-around w-full max-w-4xl">
                            <SummaryCard title="Total Quantity On Hand" value={totalQtd} />
                            <SummaryCard title="Total Extended Sell" value={totalSell} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-5 shadow-lg ">
                            <ExtSellChart data={custData} chart_title='Extended Sell Over Time' xAxis_tittle='Received Date' yAxis_tittle ='Extended Sell' />
                            <PieChartInventoryByOwner data={custData}/>
                        </div>
                        <div className="flex flex-wrap justify-around w-full max-w-4xl mt-5 shadow-lg">
                            <JobMonthBarChart data={custData}/>
                        </div> */}
                        
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
                    initialData ?
                    <InitialDataPage/>
                    :
                    <NotFoundPage status = {reqStatus} dataName={"Job ID"} dataValue ={custId}/>
                }

        </div>
             { 
             hasData ? 
                <>
                    <DataTable custData={custData} /> 
                    <div className="flex items-center justify-center h-16">
                        <button className={` ${btnIsSaving ? "bg-white text-purple":"bg-purple text-white"}  font-bold py-2 px-4 border border-blue-700 rounded`} onClick={() => generateExcel(queryRan)}>
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

export default FgoodsDash;




