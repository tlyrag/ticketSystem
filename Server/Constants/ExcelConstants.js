const templateFilePath = {
    inventoryqm1: "P:\\Reports\\testing\\Templates\\InventoryQMTemplate.xlsx",
    inventoryqm2: "P:\\Reports\\testing\\Templates\\InventoryQMTemplate.xlsx",
    inventoryPS: "P:\\Reports\\testing\\Templates\\InventoryPSTemplate.xlsx"
}
const templatePath = (query) => {
    return templateFilePath[query]
}

const outputPath = (filename) => {

    return `P:\\Reports\\testing\\Outputs\\${filename}.xlsx`
}
export default {
     templatePath,
     outputPath, 
     sheetName :'rawData'  
}