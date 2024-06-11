import 'dotenv/config'
import mssql from 'mssql/msnodesqlv8.js'


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
        
        const dbConnection = await new mssql.connect(dbConfig, (err) => {
            console.log(`${dbConfig.server}`)
            if(err) {
                console.log(`Failed to connect to database ${err}`)
            } else {
                console.log(`connected to database ${dbConfig.server}`)
            }
        })

    }
    catch(err) {
        console.log(`Connection Errror ${err}`)
    }
}

const  getOrder = async  (productId) => {
    try {
      let  pool = await  sql.connect(config);
      let  product = await  pool.request()
      .input('input_parameter', sql.Int, productId)
      .query("SELECT * from Orders where Id = @input_parameter");
      return  product.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }


  
const sqlServer = {
    dbConfig,
    dbConnect
}
export default sqlServer

