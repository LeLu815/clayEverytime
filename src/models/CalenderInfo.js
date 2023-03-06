import mongoose from "mongoose";

const calenderInfoSchema = new mongoose.Schema({
    createdAt : {
        type:Date,
        default:Date.now
    },
    title : {
        type:String, 
        required: true
    },
    place : {
        type:String,
    },
    start_date : {
        type:Date,
        required: true
    },
    end_date : {
        type:Date,
        required: true
    },
    
    isPublic : {
        type:Boolean,
    },
    description : {
        type:String,
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});

const CalenderInfo = mongoose.model("calenderInfo" ,calenderInfoSchema)
export default CalenderInfo;