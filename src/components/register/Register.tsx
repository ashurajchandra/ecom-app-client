import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User{
    username:string,
    password:string,
    email:string
}

    export const Register: React.FC = () => {
        const navigate = useNavigate()
  const [user,setUser] = useState<User>({email:'',password:'',username:''})
  const [isLoading, setIsLoading] = useState(false);


  const handleOnChange = (e:any)=>{
    setUser(prevState=>({...prevState, [e.target.name]:e.target.value}))
  }

  const handleRegister = async()=>{
    try {
        const response = await axios.post("http://localhost:8002/api/users/register", user)
         if(response){
           setTimeout(()=>{
            navigate("/login")
           },0)
         }
      } catch (error) {
        console.error('Registration error:', error);
      } finally {
        setIsLoading(false);
        

      }
  }

  const disableLoginButton = ():boolean=>{
    if(isLoading || !user.email.trim() || !user.password.trim() || !user.username.trim()){
     return true
    }
    return false
  }

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Register
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
            fullWidth
            name="password"
            value={user.password}
            onChange={handleOnChange}
            margin="normal"
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            name="username"
            value={user.username}
            onChange={handleOnChange}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
            sx={{ marginTop: '16px' }}
            disabled={disableLoginButton()}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              'Register'
            )}
          </Button>
          <Typography marginTop="10px">
          <Link to="/login">Already have an account? Login here</Link>
          </Typography>

        </Paper>
      </Grid>
    </Grid>
  );
};

