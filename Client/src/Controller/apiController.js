import apiModel from "../Model/apiModel"

const fetchAllTickets = () => {
    return fetch(apiModel.tickets())
    .then(response=>response.json())
    .then(data=> {
        return data
    }).catch(err => {
        console.log(`Failed to fetch Ticket Data ${err}`)
    })
}

const getTicketById = (id) => {
  
    return fetch(apiModel.getTicketById(id))
    .then(response=>response.json())
    .then(data=> {
        return data
    })
    .catch(err=> console.log(`Failed to fetch comment: ${err}`))
   
}
const addTicket =(ticket) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket)
    };
    return fetch(apiModel.addTicket(), requestOptions)
    .catch(err=> console.log(`Failed to add ticket ${err}`))
    
}
const completeTicket =(id) => {
   
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },

    };
    console.log(apiModel.completeTicket(id))
    return fetch(apiModel.completeTicket(id), requestOptions)
    .catch(err=> console.log(`Failed to complete ticket ${err}`))
    
}
const cancelTicket =(id) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },

    };
    return fetch(apiModel.cancelTicket(id), requestOptions)
    .catch(err=> console.log(`Failed to Cancel TIcket ${err}`))
    
}
const assignToMeTicket =(id,user) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(apiModel.assignToMeTicket(id), requestOptions)
    .catch(err=> console.log(`Failed to assign Ticket ${err}`))
    
}

const addComments = (id,comment) => {

    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    };
    return fetch (apiModel.addComment(id),requestOptions)
    .catch(err=> console.log(`Failed to addComments ${err}`))
}
const getInventory =(company,system) => {
    return fetch(apiModel.getInventory(company,system))
    .then(response => response.json())
    .then(data=>{return data})
    .catch(err=> console.log(`Failed to fetch inventory from ${system}: ${err}`))
    
}
const getMonarchInventory =(company) => {
    return fetch(apiModel.getMonarchInventory(company))
    .then(response => response.json())
    .then(data=>{
        return data
    })
    .catch(err=> console.log(`Failed to fetch inventory from Monarch: ${err}`))
    
}
const generateExcelFile =(excelInfo) => {
    console.log("Got Here")
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(excelInfo)
    };
    console.log(excelInfo)
    return fetch(apiModel.generateExcel(), requestOptions)
    .then(response=> response.json())
    .then(data=>data)
    .catch(err=> console.log(`Failed to generateExcel ${err}`))
    
}
const reorderNotice = (params,system) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            params:params,
            system:system
        })
    };
    return fetch(apiModel.reorderNotice(), requestOptions)
    .then(response =>response.json())
    .then(data => {return data})
    .catch(err=> console.log(`Failed to run reorder notice ${err}`))
}


const runQuery = (query,params,system) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
           {query:query,
            params:params,
            system:system
           } 
        )
    };
    return fetch(apiModel.runQuery(), requestOptions)
    .then(response =>response.json())
    .then(data => {return data})
    .catch(err=> console.log(`Failed to run reorder notice ${err}`))
}

const runProc = (query,params,system) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
           {query:query,
            params:params,
            system:system
           } 
        )
    };
    return fetch(apiModel.runProc(), requestOptions)
    .then(response =>response.json())
    .then(data => {return data})
    .catch(err=> console.log(`Failed to run reorder notice ${err}`))
}

const genpdf = (custData,filter) => {
    console.log(custData)
    console.log(filter)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
           {
            custData:custData,
            filter:filter,
           } 
        )
    };
    return fetch(apiModel.genpdf(), requestOptions)
    .then(response =>response.json())
    .then(data => {return data})
    .catch(err=> console.log(`Failed to run genPdf notice ${err}`))
}

export default {
    fetchAllTickets,
    addTicket,
    completeTicket,
    cancelTicket,
    assignToMeTicket,
    addComments,
    getTicketById,
    getInventory,
    getMonarchInventory,
    generateExcelFile,
    reorderNotice,
    runQuery,
    runProc,
    genpdf
}