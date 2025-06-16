import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
  IconButton,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Payment from './payment/Payment';

const CartSummary = () => {
  const { cartItems, cartCount, loading, error, success } = useSelector(
    (state) => state.auth
  );

  // Track item quantity by unique ID
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item._id || item.id] = 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const [openSnackbar, setOpenSnackbar] = useState(!!success);

  useEffect(() => {
    if (success) {
      setOpenSnackbar(true);
      const timer = setTimeout(() => {
        setOpenSnackbar(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleIncrease = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] - 1),
    }));
  };

  return (
    <Box sx={{ p: 4, background: '#f5f5f5', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#333' }}
      >
        🛒 Cart Summary
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 3 }}>
        Total items: <strong>{cartCount}</strong>
      </Typography>

      {loading && (
        <Box textAlign="center" mb={2}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 6 }}
      >
        <Alert severity="success" variant="filled">
          Item added successfully!
        </Alert>
      </Snackbar>

      <Grid container spacing={4} justifyContent="center">
        {cartItems.map((item) => {
          const id = item._id || item.id;
          const quantity = quantities[id] || 1;
          return (
            <Grid item xs={8} sm={6} md={4} lg={3} key={id}>
              <Card
                sx={{
                  height: '80%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  boxShadow: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, color: '#333' }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    ₹{item.price} × {quantity} = ₹{item.price * quantity}
                  </Typography>
                  <Divider sx={{  }} />
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton onClick={() => handleDecrease(id)} size="small" color="primary">
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ mx: 2 }}>
                      {quantity}
                    </Typography>
                    <IconButton onClick={() => handleIncrease(id)} size="small" color="primary">
                      <AddIcon />
                    </IconButton>
                    <Payment amount={item.price * quantity} />
                  </Box>
                  <Box >
                    <Payment amount={item.price * quantity} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CartSummary;
