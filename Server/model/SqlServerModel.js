import 'dotenv/config'
import mssql from 'mssql/msnodesqlv8.js'
import SqlQueries from "../Constants/SqlQueries.js";

var dbConfig = {
    server: process.env.SQLSERVERNAME,
    port: process.env.SQLSERVERPORT,
    database: process.env.SQLSERVERDB,
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true
    }
}

const dbConnect = async () => {
    try {
        const pool = await mssql.connect(dbConfig);
        return pool;
    }
    catch(err) {
        console.log(`Connection Errror ${err}`)
    }
}

const  getPurchaseOrders = async  (companyId) => {
    try {
        let pool = await dbConnect();
        let request = await pool.request()
        request.input('companyId',mssql.VarChar,companyId)
        let pos = await request.query(SqlQueries.arInvoiceByCust())  
    
        return  pos.recordsets;
    }
    catch (error) {
      console.log(error);
    } finally {
        mssql.close();
    }
  }

  const getInventory = async (companyId) => {
    try {
        console.log('Running Query')
        let pool = await dbConnect();
        let request = await pool.request()
        request.input('companyId',mssql.VarChar,companyId)
        let inv = await request.query(SqlQueries.custInventory())
        .catch( err => {
            console.log(`SlQSeverModel Error : Failed to run inventory Query ${err}`)
            return `SlQSeverModel Error : Failed to run inventory Query ${err}`
        })  
        return  inv.recordsets[0];
    }
    catch (error) {
      console.log(error);
    } finally {
        mssql.close();
    }
 
  }


  
const sqlServer = {
    dbConfig,
    dbConnect,
    getPurchaseOrders,
    getInventory
}
export default sqlServer

