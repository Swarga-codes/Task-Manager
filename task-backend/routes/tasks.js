const express=require('express')
const router=express.Router()
const cors=require('cors')
const mongoose=require('mongoose')
const VerifyLogin = require('../middlewares/VerifyLogin')
const TASKS=mongoose.model('TASKS')
router.use(cors())

router.post('/createTask',VerifyLogin,(req,res)=>{
    const{title,description,status,deadline}=req.body
    if(!title || !description){
        return res.status(422).json({error:'One or more fields are missing'})
    }
    if(new Date(deadline)<new Date()) return res.status(422).json({error:'Deadline should be greater than current date!'})
    const task=new TASKS({
        title,
        description,
        deadline,
        status,
        creator:req.user._id
    })
    task.save().then(result=>
        {
            return res.status(200).json({message:'TASKS added successfully'})
        })
        .catch(err=>console.log(err))
})

router.get('/myTasks',VerifyLogin,(req,res)=>{
TASKS.find({creator:req.user._id})
.then(result=>{
    res.status(200).json(result)
})
.catch(err=>console.log(err))
})
router.delete('/deleteTasks/:taskId',VerifyLogin,(req,res)=>{
   TASKS.findByIdAndDelete({_id:req.params.taskId})
   .then(result=>{
    return res.status(200).json({message:'TASKS deleted successfully'})
   })
   .catch(err=>console.log(err))
})
router.put('/updatestatus',VerifyLogin,(req,res)=>{
    const{status,idx}=req.body
    TASKS.findByIdAndUpdate(idx,{
        $set:{status:status}
    },{
        new:true
    })
    .then(result=>{
        return res.status(200).json({status,message:'Status updated successfully'})
    })
    .catch(err=>console.log(err))
})
//update the task content
router.put('/updateTask',VerifyLogin,(req,res)=>{
    const{title,description,idx}=req.body
    if(!title || !description){
        return res.status(422).json({error:'One or more fields cannot be empty'})
    }
    TASKS.findByIdAndUpdate(idx,{
        $set:{title:title,description:description}
    },{
        new:true
    })
    .then(result=> {return res.status(200).json({message:'TASKS updated successfully'})})
    .catch(err=>console.log(err))
})
module.exports=router