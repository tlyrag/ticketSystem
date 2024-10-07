
import React, { useDebugValue, useEffect, useState } from 'react';
import DataTable from "./DashComponents/TableEx"
import apiController from "../../Controller/apiController";
import SummaryCard from './DashComponents/Cards';
import SalesFilters from "./DashComponents/DynamicFilter";
import InitialDataPage from './DashComponents/InitialDataPage';
import NotFoundPage from './DashComponents/NotFound';
const Sales = () => {
    /// Data //
    const [custData, setcustData] = useState([]);
    const [fetchedSystem, setfetchedSystem] = useState();
    const [fetchedCompany, setfetchedCompany] = useState();
    const [totalSell, settotalSell] = useState();
    const [totalQtd, settotalQtd] = useState();
    const [queryRan, setqueryRan] = useState();
    const [outputPath, setoutputPath] = useState("");    
    
    /// Handling View Item states///
    const [isFetching, setbtnIsFetching] = useState(false);
    const [btnIsSaving, setbtnIsSaving] = useState(false);
    const [showToast, setshowToast] = useState(false);
    const [initialData, setinitialData] = useState(true);
    const [hasData, sethasData] = useState(false);
    const [reqStatus, setreqStatus] = useState();
    
    const generatePDF= async() => {
        setbtnIsSaving(true)
        let pdfInfo = {
            system:fetchedSystem,
            query_name:queryRan
        }
      await apiController.genpdf(custData,pdfInfo)
      setbtnIsSaving(false);
      setshowToast(true);
      
      setTimeout(() => {
        setshowToast(false)
      }, 2000);
    }

    const generateExcel= async(query) => {
        try {    
            console.log(custData)
            setbtnIsSaving(true)
            let excelInfo = {
                custData:custData,
                system:fetchedSystem,
                company:"",
                query:queryRan
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

    /**
     * Fetches data from Web server and returns the customer information based on the Inventory Query
     * @param {*} custId  Customer ID inside Monarc or Quantum, input comes from the user textBox in the filter
     * @param {*} system  System to query the information, comes from the selection in the dropdown in the filter
     * @returns 
     */

    
    const salesSearch = async (query,queryParams,system) => {
        console.log(query)
        console.log(queryParams)
        console.log(system)
        const params = {
            'reorder': () => apiController.reorderNotice(queryParams,system),
            
            'order':() =>apiController.runQuery(query,queryParams,system),
            
            'ps_item_usage_by_client': () => {
               if(system!= "monarch") {
                    return  apiController.runQuery(query,queryParams,system)
               }
               return  apiController.runProc(query,queryParams,system)
            } ,
            
            'summary_inv':() =>apiController.runQuery(query,queryParams,system),
            
            'usage':() =>{
                let splitParams = queryParams.companyName.trim().split(',')
                return apiController.runProc(query,splitParams,system)
            },
            
            'ps_item_usage_by_location': () => {
                let splitParams = queryParams.itemId.trim().split(',')
                if(system != "monarch") {
                    return apiController.runQuery(query,splitParams,system)
                }
                    return apiController.runProc(query,splitParams,system)
                
            }
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
            {sethasData(true);}
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
            console.error(`Failed to run query: ${query} Error: ${error}`);
            //sethasData(true)
            //setinitialData(false) 
            setbtnIsFetching(false)
            setreqStatus(500) 
            
        }
    };


    return (
        
        <div className="h-full bg-white drop-shadow-3xl m">
            <SalesFilters search={salesSearch} isFetching={isFetching} view='sales'/>

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
                        <h1 className="text-purple text-9xl">
                            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                            </svg>
                            Loading
                        </h1>
                    </div>
                    :
                    initialData
                    ?
                    <InitialDataPage/>
                    :
                    <NotFoundPage status = {reqStatus} dataValue ={`${fetchedSystem}`} dataName ={`${queryRan} results`}/>
                }
        </div>
             { 
             hasData ? 
                <>
                    <DataTable custData={custData} /> 
                    {
                    queryRan == 'reorder' ||
                    queryRan == 'ps_item_usage_by_client' 
                    ?
                        <div className="flex items-center justify-center h-16">
                            <button className= {`font-bold py-2 px-4 border border-blue-700 rounded ${btnIsSaving ? "bg-white text-purple":"bg-purple text-white"} `} onClick={()=> generatePDF()}>
                                Generate PDF
                            </button> 
                        </div>
                    : 
                        <></>
                    }
                    {
                    queryRan == 'reorder' ?             
                        <div className="grid grid-cols-2 gap-4 mt-5">
                            
                        </div>
                    :
                    <></>
                    }
                    {
                    queryRan == 'ps_item_usage_by_location' ||
                    queryRan =='ps_item_usage_by_client'
                    ? 
                    
                        <div className="flex items-center justify-center h-16">
                            <button className= {`font-bold py-2 px-4 border border-blue-700 rounded ${btnIsSaving ? "bg-white text-purple":"bg-purple text-white"} `} onClick={()=> generateExcel()}>
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
                    : 
                        <></>
                    }
                </>
            : <></>}




        </div>
    );
};

export default Sales;





