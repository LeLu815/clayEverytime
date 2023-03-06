import mongoose from "mongoose";

const kilnInfoSchema = new mongoose.Schema({
    kilnType : {
        type:Number,
        required: true
    },
    reservationDate : {
        type:Date,
        required: true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});

const kilnInfo = mongoose.model("kilnInfoSchema" , kilnInfoSchema);
export default kilnInfo;