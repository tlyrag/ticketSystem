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

export default {
    fetchAllTickets,
    addTicket
}