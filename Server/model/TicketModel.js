import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    title:{type:String, required: true},
    urgency:{type:String,required:true},
    type:{type:String,required:true},
    description:{type:String,required:true},
    creationDate:{type:String,require:true},
    completionDateDate:{type:String},


})

const ticket = mongoose.model("ticket",ticketSchema);



const databaseModel = {
    ticket,

}
export default databaseModel