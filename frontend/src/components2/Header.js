import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { Link, redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/action/authAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
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
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
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
