import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    title:{type:String, required: true},
    urgency:{type:String,required:true},
    type:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,},
    creationDate:{type:String,require:true},
    assignedTo:{type:String,},
    assignedDate:{type:String,},
    completionDate:{type:String},
    cancelationDate:{type:String},
    createdby:{type:String},
    comments: [{
        user:String,
        message:String
    }]

})

const ticket = mongoose.model("ticket",ticketSchema);



const databaseModel = {
    ticket,

}
export default databaseModel