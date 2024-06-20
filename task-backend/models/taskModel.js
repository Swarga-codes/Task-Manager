const mongoose=require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const USERS=mongoose.model("USERS")
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    creator:{
        type:ObjectId,
        ref:"USERS"
    }
})
mongoose.model("TASKS",taskSchema)