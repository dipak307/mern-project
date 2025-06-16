import React from "react";
import axios from "axios";

const Payment = ({ amount }) => {
  const handlePayment = async () => {
    const currency = "INR";

    try {
      // Step 1: Create order on the backend
      const { data } = await axios.post("http://localhost:5000/api/auth/payment", {
        amount,
        currency,
      });

      // Step 2: Configure Razorpay checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Your Company",
        description: "Test Payment",
        image: "", 
        handler: async function (response) {
          try {
            const verifyRes = await axios.post("http://localhost:5000/api/auth/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              alert("✅ Payment verified successfully!");
              console.log("Server Response:", verifyRes.data);
            } else {
              alert("❌ Payment verification failed!");
            }
          } catch (err) {
            console.error("Verification Error:", err);
            alert("❌ Error verifying payment.");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "8669512928",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        method: {
          upi: true,
          card: true,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("❌ Failed to start payment.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Make a Payment</h2>
      <button onClick={handlePayment} style={{color:"#fff",background:"green",cursor:"pointer"}}>Pay ₹{amount} via UPI / Card</button>
    </div>
  );
};

export default Payment;
