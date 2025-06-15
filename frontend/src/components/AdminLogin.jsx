import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../Redux/action/authAction';
import {
  Button,
  TextField,
  Container,
  Typography,
  Alert,
  Card,
  CardContent,
  Link,
  CircularProgress,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GetMe } from '../services/GetMe';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, userInfo } = useSelector((state) => state.auth);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(formData));
  };

  useEffect(() => {
    if (success && userInfo) {
      navigate('/', { replace: true });
    }
  }, [success, userInfo, navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const me = await GetMe();
        setUser(me);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #dbeafe, #a5b4fc)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Card
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 420,
          boxShadow: 10,
          borderRadius: 3,
          backdropFilter: 'blur(5px)',
          backgroundColor: 'rgba(255,255,255,0.95)',
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, color: '#1e3a8a' }}
          >
            Admin Login
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Login Successful! Redirecting...</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              required
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              required
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                backgroundColor: '#4f46e5',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
                '&:hover': {
                  backgroundColor: '#4338ca',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>

            <Box mt={3} textAlign="center">
              <Typography variant="body2">
                <Link href="/forgot-password" underline="hover" color="primary">
                  Forgot Password?
                </Link>
              </Typography>
              <Typography variant="body2" mt={1}>
                <Link href="/register" underline="hover" color="primary">
                  Don&apos;t have an account? Register
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminLogin;
