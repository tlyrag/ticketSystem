import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongodb from './controller/DatabaseController.js';
import routes from './routes/routes.js'
import path from "path"
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port =  5847;
app.use(cors())
app.use(bodyParser.urlencoded({ limit:'50mb', extended: false, parameterLimit: 50000}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'dist')));


app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-cREDENTIALS', 'true');
    next();
})

const createServer = async () =>{
    await mongodb.connect();
    app.listen(port, () => console.log(`========== Server Started At Port ${port} ==========`))
}


    

createServer();
routes(app);