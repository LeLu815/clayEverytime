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
    date_and_time : {
        type:String,
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

const Comment = mongoose.model("calenderInfo" ,calenderInfoSchema)
export default Comment;