const getApiUrl = (env) => {
    if(env==="local") {
        return "http://localhost:5847"
    }
    return "http://localhost:5847"
 
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



export default {
    getApiUrl,
    tickets,
    addTicket,
    completeTicket,
    cancelTicket,
    assignToMeTicket

}