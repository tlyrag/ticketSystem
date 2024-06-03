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

const addTicket =(ticket) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket)
    };
    return fetch(apiModel.addTicket(), requestOptions)
    .catch(err=> console.log(`Failed to add to cart ${err}`))
    
}
const completeTicket =(id) => {
   
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },

    };
    console.log(apiModel.completeTicket(id))
    return fetch(apiModel.completeTicket(id), requestOptions)
    .catch(err=> console.log(`Failed to add to cart ${err}`))
    
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
    console.log(id)
    console.log(comment)
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    };
    return fetch (apiModel.addComment(id),requestOptions)
    .catch(err=> console.log(`Failed to addComments ${err}`))
}


export default {
    fetchAllTickets,
    addTicket,
    completeTicket,
    cancelTicket,
    assignToMeTicket,
    addComments
}