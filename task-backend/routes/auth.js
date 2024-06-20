const express=require('express');
const router=express.Router();
const mongoose=require('mongoose')
const USERS=mongoose.model('USERS')
const cors=require('cors')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const validator=require('validator')
router.use(cors())
router.get('/about',(req,res)=>{
    res.send("Hello I am about")
})
router.post('/signup',(req,res)=>{
    const{email,userName,password}=req.body;
    if(!email || !userName || !password) return res.status(422).json({error:"One or more fields are missing"});
    if(!validator.isEmail(email)){
        return res.status(422).json({error:'Email address is invalid'})
    }
    USERS.findOne({$or:[{email:email},{userName:userName}]}).then((saved)=>{
        if(saved){
            return res.status(422).json({error:'User already exists'})
        }
       bcrypt.hash(password,12).then((hashedPass)=>{
        const user=new USERS({
            email,
            userName,
            password:hashedPass
        })
        user.save().then(result=>{
            return res.status(200).json({message:'User registered successfully'})
        })
        .catch(err=>console.log(err))
       })
        
    })
})
router.post('/login',(req,res)=>{
    const{email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:'One or more fields are missing'})
    }
    USERS.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(404).json({error:'User not found'})
        }
        bcrypt.compare(password,savedUser.password)
        .then((match)=>{
            if(!match){
                return res.status(401).json({error:'Passwords dont match'})
            }
            const token=jwt.sign({_id:savedUser.id},process.env.SECRET_KEY)
            const{_id,userName,email}=savedUser
            return res.status(200).json({token,users:{_id,userName,email}})
        })
    })
})
module.exports=router;