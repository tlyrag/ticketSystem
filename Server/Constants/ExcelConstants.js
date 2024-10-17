const templateFilePath = {
    inventory:{    
        qm1: "P:\\Reports\\testing\\Templates\\InventoryQMTemplate.xlsx",
        qm2: "P:\\Reports\\testing\\Templates\\InventoryQMTemplate.xlsx",
        PS: "P:\\Reports\\testing\\Templates\\InventoryPSTemplate.xlsx",
        monarch:"P:\\Reports\\testing\\Templates\\InventoryPSTemplate.xlsx",
    },
    job_receive_status: 
    {
        PS: "P:\\Reports\\testing\\Templates\\ReceiveOrderPSTemplate.xlsx",
        monarch:"P:\\Reports\\testing\\Templates\\ReceiveOrderPSTemplate.xlsx",
    },
    ps_item_cust: 
    {
        PS: "P:\\Reports\\testing\\Templates\\ReceiveOrderPSTemplate.xlsx",
        monarch:"P:\\Reports\\testing\\Templates\\ReceiveOrderPSTemplate.xlsx",
    },
    administration:
    {
        monarch:"P:\\Reports\\testing\\Templates\\ReceiveOrderPSTemplate.xlsx"
    },
    ps_quantum_check: {
        qm1:"P:\\Reports\\testing\\Templates\\PsQuantumCheckTemplate.xlsx",
        qm2:"P:\\Reports\\testing\\Templates\\PsQuantumCheckTemplate.xlsx"
    },
    ps_item_usage_by_location: {
        monarch:"P:\\Reports\\testing\\Templates\\EmptyTemplate.xlsx",
    },
    ps_item_usage_by_client: {
        monarch:"P:\\Reports\\testing\\Templates\\EmptyTemplate.xlsx",
        qm2:"P:\\Reports\\testing\\Templates\\EmptyTemplate.xlsx",
        qm1:"P:\\Reports\\testing\\Templates\\EmptyTemplate.xlsx",
    },
    openOrders:{
        monarch:"P:\\Reports\\testing\\Templates\\EmptyTemplate.xlsx",
    }
    

}
const templatePath = (query,system) => {

    return templateFilePath[query][system]
}

const outputPath = (query,filename) => {
    return `P:\\Reports\\testing\\Outputs\\${query}\\${filename}.xlsx`
}
export default {
     templatePath,
     outputPath, 
     sheetName :'rawData'  
}