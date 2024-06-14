import sqlServer from "../model/SqlServerModel.js";
import SqlQueries from "../Constants/SqlQueries.js";

const getPoLines = async (companyId) => {
    
    let order = await sqlServer.getPurchaseOrders(companyId)
    return order
}

const SqlController = {
    getPoLines
}

export default SqlController;
