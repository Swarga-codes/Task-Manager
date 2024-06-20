import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import { Routes,Route, useNavigate } from 'react-router-dom';
import Login from './Components/Login/Login.jsx';
import SignUp from './Components/SignUp/SignUp.jsx'
function App() {

const navigator=useNavigate()
const[token,setToken]=useState('');
useEffect(()=>{
  const tokenVal=localStorage.getItem("jwt")
  if(!tokenVal){
    navigator('/login')
  }
  else{
    setToken(tokenVal)
    navigator('/')
  }

},[token])
  return (

    <div className="App">
    <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/signup' element={<SignUp/>}/>
    </Routes>
    </div>

  
  );
}

export default App;