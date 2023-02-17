import mongoose from "mongoose";

const nestedCommentSchema = new mongoose.Schema({
    createdAt : {
        type:Date,
        default:Date.now
    },
    text : {
        type:String, 
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    ownerName: {
        type:String,
        required:true,
    },
    likes : {
        type:Number,
        default:0,
    },
    comment : {
        type : mongoose.Schema.Types.ObjectId, 
        ref:"Comment",
        required:true,
    },
    content : {
        type : mongoose.Schema.Types.ObjectId, 
        ref:"Content",
        required:true,
    }
});

const NestedComment = mongoose.model("NestedComment" ,nestedCommentSchema)
export default NestedComment;