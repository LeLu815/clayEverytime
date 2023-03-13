import mongoose from "mongoose";

const contentSchema = mongoose.Schema({
    title: String,
    description: String,
    contentType:{
        type: Number,
        enum:[1,2,3,4]
    },
    createdAt : {
        type:Date,
        default:Date.now
    },
    meta: {
        views: Number,
        likes: Number,
    },
    contentImage : {type:String},
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    likedUser:[
        {type : mongoose.Schema.Types.ObjectId, ref:"User"}
    ],
    comment : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Comment",
        }
    ],
});

const Content = mongoose.model("Content", contentSchema);

export default Content;