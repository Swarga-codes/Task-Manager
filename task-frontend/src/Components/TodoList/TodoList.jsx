import React, {useState, useEffect} from 'react'
import './TodoList.css'
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modals from './Modals'
function TodoList({todo,getTodos}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   const deleteTodo=async(id)=>{
    const res=await fetch(`${import.meta.env.VITE_API_URL}/task/deleteTasks/${id}`,
    {
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    });
    const data=await res.json();
    toast.success(data.message,{theme:"colored"})
    getTodos()
    
   }
   const updateStatus=async()=>{
    const res=await fetch(`${import.meta.env.VITE_API_URL}/task/updatestatus`,{
      method:'PUT',
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        status:true,
        idx:todo._id,
      })
    })
    const data=await res.json()
   
    toast.success(data.message,{theme:"colored"})
    getTodos()
   }
 useEffect(()=>{
getTodos();
 },[])
  return (
    <div className='todos'>
    <div className="todos_check">
    
    </div>
    <div className="todos_details">
    <div style={{display:'inline-block',width:'fit-content'}}>
    <h2>{todo.title}</h2>
    </div>
    <p>{todo.description}</p>
    <p className='deadline'>Deadline: {todo?.deadline.substring(0,10)}</p>
    {!todo.status && new Date()<=new Date(todo?.deadline) &&
    <p className='pending'>Status: <b>Pending</b></p>}
  
{todo.status && <p className='complete'>Status: <b>Completed</b></p>}
{!todo.status && new Date()>new Date(todo?.deadline) && <p className='complete'>Status: <b>Completed</b></p>}
  
  <div className='todoBtn'>
  <button className='edit' onClick={()=>handleClickOpen()}>Edit</button>
    <button onClick={()=>{
    if(window.confirm('Do you really wanna delete this task?')){  
      deleteTodo(todo._id)
      
    
    }}} className='Delete'>Delete</button>
   
    {!todo.status && new Date()<=new Date(todo?.deadline) && <button className='markAsCompleted' onClick={()=>{
      if(window.confirm('Are you sure to mark this todo as done?')){
        updateStatus()
      }
    }}>Mark as Completed</button>}
    </div>
    </div>
    <Modals handleClose={handleClose} open={open} todo={todo}/>
    </div>
  )
}

export default TodoList