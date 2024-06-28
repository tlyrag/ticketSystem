const getApiUrl = () => {
    //return process.env.REACT_APP_API_URL || "http://localhost:5847"
    return "http://10.227.1.128:5847"
 
}

const tickets = () =>{
    return `${getApiUrl()}/tickets`
} 
const addTicket= () =>{
    return `${getApiUrl()}/addTicket`
} 
const completeTicket= (id) =>{
    
    return `${getApiUrl()}/completeTicket/${id}`
} 
const cancelTicket= (id) =>{
    return `${getApiUrl()}/cancelTicket/${id}`
} 
const assignToMeTicket= (id) =>{
    return `${getApiUrl()}/assignTicket/${id}`
} 
const addComment = (id) => {

    return `${getApiUrl()}/addComment/${id}`
}
const getTicketById = (id) => {
    return  `${getApiUrl()}/ticket/${id}`
}
const getInventory = (companyID, system) => {
    return `${getApiUrl()}/getInventory/${companyID}?system=${system}`;
}
const getMonarchInventory = (companyID) => {
    return `${getApiUrl()}/getPSinventory/${companyID}`;
}
export default {
    getApiUrl,
    tickets,
    addTicket,
    completeTicket,
    cancelTicket,
    assignToMeTicket,
    addComment,
    getTicketById,
    getInventory,
    getMonarchInventory

}