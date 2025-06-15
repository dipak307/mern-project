import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import clientdata from '../model/clientdata.js';
import imageModel from '../model/imageModel.js';
import { Server } from "socket.io";
import Comment from "../model/comment.js"; 
import Razorpay from 'razorpay';
import dotenv from "dotenv";
import { createHmac } from "crypto";
import Leave from '../model/leave.js';
dotenv.config();

// REGISTER USER
export const registerUser = async (req, res) => {
    try {
        const { username, email, password,role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ username, email, password: hashedPassword,role });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully",success:true });
    } catch (error) {
      console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Hr,Employee LOGIN USER
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const admin = user.role == 'admin';
        if(admin) return res.status(400).json({message:"User is not Authenticated"})
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" });
        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email,user_role:user.user_role },message: "User Login successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const adminLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const admin = user.role == 'admin';
        if(!admin) return res.status(400).json({message:"User is not Authenticated"})
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7h" });
       
        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email,user_role:user.role },message: "User Login successfullddy" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// add client
export const addClient = async (req, res) => {
    try {
        const {client, email } = req.body;
        const newClient = new clientdata({clientname:client , email });
        await newClient.save();
        console.log(newClient,"client");
        res.status(200).json({ message: "Client Added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// getting all client
export const getClientList = async (req, res) => {
    try {
      const clients = await clientdata.find();
      const updatedClients = clients.map((client, index) => ({
        ...client._doc,    
        count: index + 1   
      }));
      
      res.status(200).json(updatedClients);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// delete single client
export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params; 
        const client = await clientdata.findById(id);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        await client.deleteOne(); 
        res.status(200).json({ message: "Client deleted successfully", client });
    } catch (error) {
        res.status(500).json({ message: "Error deleting client", error: error.message });
    }
};
// edit single client
export const editClient = async (req, res) => {
    try {
        const { client , email  } = req.body; 
        const { id } = req.params;
        const editClient = await clientdata.findById(id);
        if (!editClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        editClient.clientname=client;
        editClient.email=email;
       await editClient.save();
        res.status(200).json({ message: "Client updated successfully", editClient });
    } catch (error) {
        res.status(500).json({ message: "Error updating client", error: error.message });
    }
};
// view single client
export const viewClient = async (req, res) => {
    try {
        const { id } =  req.params; 
        console.log(id);
        const viewClient = await clientdata.findById(id);
        if (!viewClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json({ message: "Client fetched successfully", viewClient });
    } catch (error) {
        res.status(500).json({ message: "Error updating client", error: error.message });
    }
};

// Upload image code
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        // const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        // const newImage = new imageModel({ imageUrl });
        await newImage.save();
        return res.status(200).json({ message: "Image uploaded successfully", imageUrl: newImage.imageUrl });
    } catch (error) {
        return res.status(500).json({ message: "Error saving image", error: error.message });
    }
};

// socket logic

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST","DELETE"]
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendComment", async (commentData) => {
      try {
        const newComment = new Comment(commentData);
        await newComment.save();
        io.emit("receiveComment", newComment); // Broadcast to all clients
      } catch (error) {
        console.error("Error saving comment:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

// gets all comments
export const allComments = async (req, res) => {
    try {
    const comments = await Comment.find().sort({ timestamp: -1 });
    return res.status(200).json({ message: "fetched all comments", comments: comments });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching comments", error: error.message });
    }
  };
// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  // payment razorpay
export  const payment=async (req, res) => {
    const { amount, currency } = req.body;
  
    try {
      const options = {
        amount: amount * 100, 
        currency,
        payment_capture: 1, 
      };
  
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      res.status(500).send("Error creating Razorpay order");
    }
  };

  // verify payment code  

  export const verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
  
    if (expectedSignature === razorpay_signature) {
      console.log("✅ Payment verified");
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      console.log("❌ Invalid signature");
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  };

  // add request 
  export const addLeave = async (req, res) => {
    try {
        const {name, reason,type,status,start_date,end_date } = req.body;
        const leave = new Leave({name, reason,type,status,start_date,end_date });
        await leave.save();
        res.status(200).json({ message: "Leave Added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
  };

// fetch request
  export const getRequestList = async (req,res)=>{
        try{
          const leaveList =await Leave.find({});
           const user = await User.findById(req.user.id);
          return res.status(200).json({mesage:"Leave List Fetched Successfully",data:leaveList,user:user});
        }catch(error){
          res.status(500).json({message:'Server Error',error:error.message});
        }
  }
  


