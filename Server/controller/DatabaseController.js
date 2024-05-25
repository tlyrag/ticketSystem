import mongoose from "mongoose";
import TicketModel from "../model/TicketModel.js"
import 'dotenv/config'



const connect = async () => {
    try {
        
        await mongoose.connect(process.env.DBURI,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    }
    catch(error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

const getAllTickets = async () =>{;
    try {
        const ticket = await TicketModel.ticket.find();
        return ticket
    } 
    catch(error) {
        return error;
    }
    }
const getTicketById = async (id) =>{
   
    const ticket = await TicketModel.ticket.findOne({_id:id})
    return ticket
} 

const addTicket = async (ticket) => {
    const { title, urgency, type,description,creationDate,completionDateDate,status,user } = ticket;

    const newTicket = new TicketModel.ticket({
        title, 
        urgency, 
        type,
        description,
        creationDate,
        completionDateDate,
        status,
        user
        })
    console.log(newTicket)
        await newTicket.save().catch(err=> console.log(`Error saving data: ${err}`));
    
}

// const createData  = async () => {
//     testList.data.forEach(async product => {
//         const id = product.id;
//         const title = product.title;
//         const price = product.price;
//         const description= product.description;
//         const category = product.category;
//         const image = product.image;
//         const rating = product.rating;
        
//         const newProduct = new dbModel.Product({
//             id,
//             title,
//             price,
//             description,
//             category,
//             image,
//             rating
//         })
        
//         await newProduct.save();
        
//     })
    
// }

const mongodb ={
    connect,
    addTicket,
    getAllTickets,
    getTicketById
    // addToCart,
    // getProductById
}
export default  mongodb
