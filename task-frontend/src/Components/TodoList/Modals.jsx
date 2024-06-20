import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function FormDialog({handleClose,open,todo}) {
    const[title,setTitle]=React.useState(todo.title);
    const[desc,setDesc]=React.useState(todo.description);
const updateTodoData=async()=>{
    if(title===todo.title && desc===todo.description){
        return toast.warn('no change to update here!',{theme:'colored'})
    }
    const res=await fetch(`${import.meta.env.VITE_API_URL}/task/updateTask`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            title:title,
            description:desc,
            idx:todo._id
        })
    });
    const data=await res.json()
if(data.error){
    return toast.error(data.error,{theme:'colored'})
}
else{
    return toast.success(data.message,{theme:'colored'})
}
}

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update the Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            value={title}
            fullWidth
            variant="standard"
            onChange={(e)=>setTitle(e.target.value)}
          />
          <TextField
          autoFocus
          margin="dense"
          id="name"
          type="text"
          value={desc}
          fullWidth
          variant="standard"
          onChange={(e)=>setDesc(e.target.value)}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{
            updateTodoData()
            handleClose()
        }}>Update Todo</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}