const templateFilePath = {
    inventoryqm1: "E:\\Documents\\__Knowledge Tips\\DashBoard And tables\\Report\\Inventory Checklist\\Working\\InventoryQMTemplate.xlsx",
    inventoryqm2: "E:\\Documents\\__Knowledge Tips\\DashBoard And tables\\Report\\Inventory Checklist\\Working\\InventoryQMTemplate.xlsx",
    inventoryps: `E:\\Documents\\__Knowledge Tips\\DashBoard And tables\\Report\\Inventory Checklist\\Working\\InventoryPSTemplate.xlsx`
}
const templatePath = (query) => {
    return templateFilePath[query]
}

const outputPath = (filename) => {

    return `E:\\Documents\\__Knowledge Tips\\DashBoard And tables\\Output\\${filename}.xlsx`
}
export default {
     templatePath,
     outputPath, 
     sheetName :'rawData'  
}