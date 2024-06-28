import sqlServer from "../model/SqlServerModel.js";
import SqlQueries from "../Constants/SqlQueries.js";

const getPoLines = async (companyId) => {
    
    let order = await sqlServer.getPurchaseOrders(companyId)
    return order
}

const getCustInventory= async (companyId) => {
    try {
        let inventory = await sqlServer.getInventory(companyId)
        return inventory
    }
    catch(err) {
        console.log(`Failed to run inventory query ${err}`)
        throw new Error(`Failed to run inventory query ${err}`)
   
    }

}

const SqlController = {
    getPoLines,
    getCustInventory
}

export default SqlController;
