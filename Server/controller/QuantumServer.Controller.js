import quantumModel from '../model/QuantumServerModel.js'
const runInventory =(company,system) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify( {
            query_name: "inventory",
            system:system,
            params: [company]
        })
    };
    return fetch(quantumModel.runQuery(),requestOptions).then(response=>response.json())
    .then(data=> {
        return data
    })
    .catch(err=> console.log(`Failed to run query ${err}`))
    
}

const test = () => {
    return fetch(quantumModel.testServer())
    .then(response=>response.json())
    .then(data=> {
        return data
    }).catch(err => {
        console.log(`Failed to fetch  Data ${err}`)
    })
}

export default {
    runInventory,
    test
}