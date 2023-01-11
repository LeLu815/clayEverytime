import mongoose from "mongoose";

const contentSchema = mongoose.Schema({
    title: String,
    description: String,
    contentType:{
        type: Number,
        enum:[1,2,3]
    },
    createdAt : {
        type:Date,
        default:Date.now
    },
    meta: {
        views : Number,
        likes: Number,
    },
});

const Content = mongoose.model("Content", contentSchema);

export default Content;