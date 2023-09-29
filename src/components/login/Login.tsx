import React, { useState,useContext } from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {setToken} from '../../services/authService';
import {AuthContext} from '../../context/authentication/AuthContext';
import {setIsAuthenticated} from '../../context/authentication/Action';

interface User{
    password:string,
    email:string
}

    export const Login: React.FC = () => {
      const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate()
  const [user,setUser] = useState<User>({email:'',password:''})

  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e:any)=>{
    setUser(prevState=>({...prevState, [e.target.name]:e.target.value}))
  }

  const handleLogin = async()=>{
    try {
        const response = await axios.post("http://localhost:8002/api/users/login", user)
         if(response){
          setToken(response.data.data)
          dispatch(setIsAuthenticated(true))
           setTimeout(()=>{
            console.log("response.data",response.data,response)
            window.location.reload()
            window.location.replace("/")
            navigate("/")
           },1)
         }
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        setIsLoading(false);
      }
  }
  
 const disableLoginButton = ():boolean=>{
   if(isLoading || !user.email.trim() || !user.password.trim()){
    return true
   }
   return false
 }
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography  variant="h4" gutterBottom>
            Log In
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={user.email}
            onChange={handleOnChange}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            fullWidth
            value={user.password}
            onChange={handleOnChange}
            margin="normal"
          />
            <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ marginTop: '16px' }}
            disabled={disableLoginButton()}
            
            >
            {isLoading ? <CircularProgress size={24} /> : 'Log In'}
            </Button>
            <Typography marginTop="10px">
            <Link to="/register">Don't have an account? Register here</Link>
            </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
