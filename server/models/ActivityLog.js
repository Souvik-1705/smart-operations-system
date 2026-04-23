import mongoose from "mongoose";

const activityLogSchema=new mongoose.Schema({

        action:{
            type:String,
            required:true,
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        task:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Task",
        },
},{timestamps:true});

export default mongoose.model("ActivityLog",activityLogSchema);