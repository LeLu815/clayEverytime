import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
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
    content : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "Content",
    },
    likes : {
        type:Number,
        default:0,
    },
    nestedComment : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"NestedComment"
    }],
});

const Comment = mongoose.model("Comment" ,commentSchema)
export default Comment;