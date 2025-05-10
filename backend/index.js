import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http"; 
import db from "./db/db.js";
import route from "./route/route.js";
import { initializeSocket } from "./controllers/controller.js";
import  crypto from "crypto";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
db();

// Middleware
app.use(cors({ origin: "*" })); 
app.use(express.json());
app.use("/api/auth", route);
app.use("/uploads", express.static("uploads"));
//// webhook code 
app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const receivedSignature = req.headers["x-razorpay-signature"];
    const body = req.body;
  
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(body))
      .digest("hex");
  
    if (receivedSignature !== expectedSignature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  
    console.log("Webhook received:", body);
    res.json({ success: true });
  });
  
// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
initializeSocket(server); 
// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


