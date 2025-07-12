import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/action/authAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Header = ({ mode, setMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

  const { userInfo } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.auth.cartCount || 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const handleCartClick = () => {
    navigate('/cart');
  };


  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1c1c1c' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left: Logo */}
        <Box display="flex" alignItems="center" gap={2}>
          <Link to="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrqqWhUw9HJtut_NqVEbHUiZ_KS80N4vgeRw&s"
              alt="Logo"
              style={{ height: '40px' }}
            />
          </Link>
        </Box>

        {/* Center: Navigation Links */}
        <Box display="flex" gap={2}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: '#fff',
              borderBottom: isActive('/') ? '3px solid rgb(0, 16, 245)' : 'none',
              borderRadius: 0,
              fontWeight: isActive('/') ? 'bold' : 'normal',
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/dashboard"
            sx={{
              color: '#fff',
              borderBottom: isActive('/dashboard') ? '3px solid rgb(0, 16, 245)' : 'none',
              borderRadius: 0,
              fontWeight: isActive('/dashboard') ? 'bold' : 'normal',
            }}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/about"
            sx={{
              color: '#fff',
              borderBottom: isActive('/about') ? '3px solid rgb(0, 16, 245)' : 'none',
              borderRadius: 0,
              fontWeight: isActive('/about') ? 'bold' : 'normal',
            }}
          >
            About
          </Button>
          <Button
            component={Link}
            to="/ask-boat"
            sx={{
              color: '#fff',
              borderBottom: isActive('/ask-boat') ? '3px solid rgb(0, 16, 245)' : 'none',
              borderRadius: 0,
              fontWeight: isActive('/ask-boat') ? 'bold' : 'normal',
            }}
          >
            Ask Boat
          </Button>
          <Button
            component={Link}
            to="/leave/add"
            sx={{
              color: '#fff',
              borderBottom: isActive('/leave/add') ? '3px solid rgb(0, 16, 245)' : 'none',
              borderRadius: 0,
              fontWeight: isActive('/leave/add') ? 'bold' : 'normal',
            }}
          >
            Leave
          </Button>
        </Box>


        {/* Right: Icons and Logout */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Cart Icon */}
          <Tooltip title="Cart">
            <IconButton color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Theme Toggle */}
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
              onClick={() => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))}
              color="inherit"
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>

          {/* Logout */}
          {userInfo?.token && (
            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: '#e53935',
                color: '#fff',
                textTransform: 'none',
                px: 2,
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
