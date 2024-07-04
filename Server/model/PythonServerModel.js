const getApiUrl = () => {
    //return process.env.REACT_APP_API_URL || "http://localhost:5847"
    return "http://localhost:5000"
 
}

const runQuery = () =>{
    return `${getApiUrl()}/run_query`
} 
const testServer = () =>{
    return `${getApiUrl()}/test`
} 


export default {
    getApiUrl,
    runQuery,
    testServer
}