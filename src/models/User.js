import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    socialOnly : {type:Boolean, default:false},
    profileImage : {type:String},
    email : {type:String, required:true, unique:true},
    username : {type:String, required:true, unique:true},
    password : {type:String},
    name : {type:String, required:true},
    contents : [
        {type : mongoose.Schema.Types.ObjectId, ref:"Content"}
    ],
    comment : [
        {type : mongoose.Schema.Types.ObjectId, ref:"Comment",}
    ],
});

userSchema.pre("save", async function() {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
});

const User = mongoose.model("User", userSchema);
export default User;