const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    }
})
mongoose.model("USERS",UserSchema);