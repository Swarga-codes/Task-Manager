import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffffff',
            },
            '&:hover fieldset': {
              borderColor: '#90caf9',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#90caf9',
            },
            '& input': {
              color: '#ffffff',
            },
            '& label': {
              color: '#ffffff',
            },
          },
        },
      },
    },
  },
});

function SignUp() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigator = useNavigate();
  const textFieldStyle = { width: "100%", marginTop: "1rem" };

  const fetchSignUp = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        userName,
        password
      })
    });
    const data = await res.json();
    if (data.error) {
      setMessage(data.error);
    } else {
      navigator('/login');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='Signup'>
        <form onSubmit={fetchSignUp}>
          <h1>Sign Up</h1>
          <p className='error_message'>{message}</p>
          <div className="signup_email">
            <TextField
              sx={textFieldStyle}
              id="outlined-basic"
              size="small"
              label="Email"
              variant="outlined"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="signup_username">
            <TextField
              sx={textFieldStyle}
              id="outlined-basic"
              size="small"
              label="Username"
              variant="outlined"
              required
              placeholder='Enter your username'
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className="signup_password">
            <TextField
              sx={textFieldStyle}
              id="outlined-basic"
              size="small"
              label="Password"
              variant="outlined"
              type="password"
              required
              placeholder='Enter your password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type='submit'>Sign Up</button>
          <p className='existing_account'>Already have an account?<Link to='/login'>Login</Link></p>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default SignUp;
