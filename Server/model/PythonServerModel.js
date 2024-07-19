const getApiUrl = () => {
    return process.env.PYTHONAPI || "http://localhost:5000"
    return 
 
}

const runQuery = () =>{
    return `${getApiUrl()}/run_query`
} 

const generateExcel = () =>{
    return `${getApiUrl()}/saveExcel`
} 
const reorderNotice =() => {
    return `${getApiUrl()}/reorderpdf`
}
const testServer = () =>{
    return `${getApiUrl()}/test`
} 


export default {
    getApiUrl,
    runQuery,
    testServer,
    generateExcel,
    reorderNotice
}