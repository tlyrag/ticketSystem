import pythonModel from '../model/PythonServerModel.js'
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
    return fetch(pythonModel.runQuery(),requestOptions).then(response=>response.json())
    .then(data=> {
        return data
    })
    .catch(err=> console.log(`Failed to run query ${err}`))
    
}


const generateExcel =(custData,inputPath,outputPath) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body:JSON.stringify( {
            cust_data: custData,
            input_path:inputPath,
            output_path: outputPath
        })
    };

    return fetch(pythonModel.generateExcel(),requestOptions).then(response=>response.json())
    .then(data=> {
        console.log(data)
        return data
    })
    .catch(err=> console.log(`Failed to run query ${err}`))
    
}
const test = () => {
    return fetch(pythonModel.testServer())
    .then(response=>response.json())
    .then(data=> {
        return data
    }).catch(err => {
        console.log(`Failed to fetch  Data ${err}`)
    })
}

export default {
    runInventory,
    test,
    generateExcel
}