import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  alpha,
  Button,
  Popover,
  Box,
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  AccountCircle,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authentication/AuthContext';
import { CreateProduct } from '../';

export const Navbar: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = () => {
    if (state.userInfo.username !== '') {
      return;
    }
    navigate('/login');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover' : undefined;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E-Commerce
          </Typography>
        </Link>
        <Button
          sx={{marginLeft:"20px"}}
          aria-describedby={id}
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
        >
          Add New Product
        </Button>


        <div
          style={{
            position: 'relative',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '200px', 
          }}
        >
          <div
            style={{
              backgroundColor: alpha('#f0f0f0', 0.7), 
              borderRadius: '25px',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '15px',
            }}
          >
            <Search sx={{ color: '#666' }} />
            <InputBase
              placeholder="Search..."
              fullWidth
              sx={{
                borderRadius: '25px',
                paddingLeft: '10px',
                paddingRight: '5px',
                '& input': {
                  color: '#333',
                },
              }}
            />
          </div>
        </div>
        <Typography sx={{cursor:'pointer'}} variant="h6" onClick={handleNavigate}>
          {isLogin && state.userInfo.username !== '' ? state.userInfo.username : 'Sign in'}
        </Typography>

        <IconButton color="inherit" onClick={() => { navigate('/cart'); }}>
          <Badge badgeContent={3} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
          <AccountCircle />
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box p={2}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Welcome, {state.userInfo.username}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Popover>

        <CreateProduct
          handleCloseModal={handleCloseModal}
          isModalOpen={isModalOpen}
        />
      </Toolbar>
    </AppBar>
  );
};

