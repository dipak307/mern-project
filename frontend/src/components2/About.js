import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Payment from "../payment/Payment";
import { addToCart } from "../Redux/action/authAction";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";

const About = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?limit=10").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleCart = (productId) => {
    const selectedProduct = products.find((item) => item.id === productId);
    console.log(selectedProduct,"selected_product")
    if (!selectedProduct) return;
    dispatch(addToCart(selectedProduct));
  };

  return (
    <Box
      sx={{
        padding: 4,
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Product Showcase
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={4} md={3} key={product.id}>
            <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: 3,
                  boxShadow: 5,
                  mx: "auto",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 10,
                    backgroundColor: "#f0fdfa",
                  },
                }}
              >

              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{
                  objectFit: "contain",
                  padding: 2,
                  backgroundColor: "#f9f9f9",
                }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" noWrap title={product.title}>
                  {product.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ₹{product.price}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  pb: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCart(product.id)}
                  sx={{
                    backgroundColor: "#0d9488",
                    "&:hover": { backgroundColor: "#0f766e" },
                    textTransform: "none",
                  }}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default About;
