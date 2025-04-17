
// ProductList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Payment from "../payment/Payment";
import { addToCart } from "../Redux/action/authAction";
const About = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // Fetch products
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?limit=6").then((res) => {
      setProducts(res.data);
    });
  }, []);
  // let count=0;
  const handleCart=async(e)=>{
   e.preventDefault();
    // count=count+1;
    dispatch(addToCart());
  }

  return (
    <div style={styles.grid}>
      {products.map((product) => (
        <div key={product.id} style={styles.card}>
          <img src={product.image} alt={product.title} style={styles.image} />
          <h3>{product.title.substring(0, 25)}...</h3>
          <p>₹{product.price}</p>
          {/* <Payment amount={product.price}/> */}
          <button onClick={handleCart}>Add To Cart</button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    padding: 20,
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 15,
    width: 220,
    textAlign: "center",
    background: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: 150,
    objectFit: "contain",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#0d9488",
    color: "white",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: 5,
  },
};

export default About;
