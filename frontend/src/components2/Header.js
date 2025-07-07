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
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/action/authAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Header = ({ mode, setMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.auth.cartCount || 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const handleCartClick = () => {
    navigate('/cart');
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
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
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
