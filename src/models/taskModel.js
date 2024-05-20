const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"UserModel"
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String
    },
    completed:{
        type:Boolean,
        default: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model("TaskModel",taskSchema)