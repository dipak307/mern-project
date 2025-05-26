import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { Link, redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/action/authAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, Tooltip } from '@mui/material';
const Header = ({mode,setMode}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.auth.cartCount);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };
  const handleCart = () => {
    // navigate('/cart');
    redirect("/cart");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        <img src="https://www.weproinc.com/img/logo.png" alt="Logo" style={{ height: '40px' }} />
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>

        <Button color="inherit" component={Link} to="/about">
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCartIcon onClick={handleCart}/>
          </Badge>
        </Button>

        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        <Button color="inherit" component={Link} to="/ask-boat">
          Ask Boat
        </Button>
         <Button color="inherit" component={Link} to="/leave/add">
          Leave
        </Button>
        <Button color="inherit" component={Link} to="/">
          
        </Button>
       <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
        <IconButton onClick={() => setMode(prev => prev === 'light' ? 'dark' : 'light')} color="inherit">
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>

        {userInfo?.token && (
          <Button
            sx={{
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '4px',
              ml: 2,
              '&:hover': {
                backgroundColor: 'pink',
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
