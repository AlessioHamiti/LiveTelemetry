// src/LoginPage.tsx
import './LoginPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// @ts-ignore
import RTLogo from '../assets/Tavola disegno 2.svg';
import Paper from '@mui/material/Paper';
import Axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { createCustomTheme } from '../components/MUITheme';

const LoginPage: React.FC = () => {
  const theme = createCustomTheme(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleLogin = () => {
    console.log("accesso handle login")
    try {
      Axios.get('http://lt_server:8800/checkLogin', { params: { usr: username, psw: password,} })
      .then(response => {
        if(response.data === "OK"){
          navigate('/dashboard');
        } else {
          console.log('Login failed');
          setErrorText(response.data)
          setError(true);
        }
      })
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLoginAteneo = () => {
    window.location.href = './auth';
  }


  return (
      <div className="root">
        <div className="logoContainer">
          <img src={RTLogo} alt="RTLogo" className="RTLogo"/>
        </div>
        <Paper className="formContainer" square>
        <div  background-color="primary">
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={8}>
              <InputLabel style={{ color: theme.palette.error.main }}>{errorText}</InputLabel>
            </Grid>
            <Grid item xs={8}>
              <TextField
                  error={error}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                  error={error}
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={handleLogin}
              >
                Login Ospiti
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button
                  variant="contained"
                  color="error"
                  size="medium"
                  fullWidth
                  onClick={handleLoginAteneo}
              >
                Login con credenziali di ateneo
              </Button>
            </Grid>
          </Grid>
        </div>
        </Paper>
      </div>
  );
};

export default LoginPage;
