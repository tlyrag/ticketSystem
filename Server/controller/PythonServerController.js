import { response } from 'express';
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
    console.log(inputPath)
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

const reorderNotice = (params,system)=> {
    console.log(params)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body:JSON.stringify( {
                "query_name":"reorder_notice",
                "params":params,
                "system":system
        })
    }
    return fetch(pythonModel.reorderNotice(),requestOptions)
    .then(response=> response.json())
    .then(data=> {
        return data
    }).catch(err=>{
        console.log(`failed to fetch data ${err}`)
    })

}

const runQuery =(query,params,system) => {
    console.log(`Running ${query} for ${system} with ${params}`)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify( {
            query_name: query,
            system:system,
            params: params
        })
    };
    return fetch(pythonModel.runQuery(), requestOptions)
    .then(response => {
        if (!response.ok) { 
            throw new Error(response.status.toString());
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(err => {
        console.error(`Failed to run query with status ${err.message}`);
        return { error: true, statusCode: err.message };
    });
    
}


const runProc =(query,params,system) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify( {
            query_name: query,
            system:system,
            params: params
        })
    };

    return fetch(pythonModel.runProc(), requestOptions)
    .then(response => {
        if (!response.ok) { 
            throw new Error(response.status.toString());
        }
        
        return response.json();
    })
    .then(data => {
        if (data == null) {
            let empty = []
            return empty
        }
        return data;
    })
    .catch(err => {
        console.error(`Failed to run query ${query} on ${system}, params:${params}. Error: ${err.message}`);
        return { error: true, statusCode: err.message };
    });
    
}
const genPdf =(custData,params) => {
    console.log(custData[0]['LAST_PO_DATE'])
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify( {
            custData: custData,
            params: params
        })
    };

    return fetch(pythonModel.genPdf(), requestOptions)
    .then(response => {
        if (!response.ok) { 
            throw new Error(response.status.toString());
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(err => {
        console.error(`Failed to run query ${params.query_name} on ${params.system}. Error: ${err.message}`);
        return { error: true, statusCode: err.message };
    });
    
}
export default {
    runInventory,
    test,
    generateExcel,
    reorderNotice,
    runQuery,
    runProc,
    genPdf
}