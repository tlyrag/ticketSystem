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

const cancelTicket = async (id) => {
    try {
        
        const ticket = await TicketModel.ticket.findByIdAndUpdate(id, {
            status: 'Cancelled',
            cancelationDate: new Date().toISOString(),
            completionDate:"-"
        }, { new: true });
        return ticket

    } catch (err) {
       return err
    }
}

const assignToMe = async(id,user) => {
    try {
        
        const ticket = await TicketModel.ticket.findByIdAndUpdate(id, {
            status: 'Working',
            assignedTo:user,
            assignedDate: new Date().toISOString(),
            cancelationDate:"-",
            completionDate:"-"
        }, { new: true });
        return ticket

    } catch (err) {
       return err
    }
}

const completeTicket = async (id) => {
    try {
        
        const ticket = await TicketModel.ticket.findByIdAndUpdate(id, {
            status: 'Completed',
            completionDate: new Date().toISOString(),
            cancelationDate: ''
        }, { new: true });
        console.log(id)
        return ticket

    } catch (err) {
        
       return err
    }
}

const addComment = async (id,comment) => {
    try { 
        await TicketModel.ticket.updateOne(
            {_id:id},
            {$push: {
                comments : {
                    user: comment.user,
                    message:comment.message
                }
            }}
        );
    } catch(error) {
        console.log(`Failed to add comment`)
    }


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
    getTicketById,
    cancelTicket,
    completeTicket,
    assignToMe,
    addComment
    // addToCart,
    // getProductById
}
export default  mongodb
