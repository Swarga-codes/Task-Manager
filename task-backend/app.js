const express=require('express');
const app=express();
const dotenv=require('dotenv')
dotenv.config();
app.use(express.urlencoded({extended:true}))
const mongoose=require('mongoose');
const cors=require('cors')
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URL);
require('./models/userModel')
require('./models/taskModel')
app.use("/api/auth",require('./routes/auth'))
app.use("/api/task",require('./routes/tasks'))
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongodb...')
})
app.get('/',(req,res)=>{
   res.send('<h1>Welcome to Task Management Backend</h1>')
})
app.listen(8000||process.env.port,()=>{
    console.log('server is active....')
})