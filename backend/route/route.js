import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  addClient, loginUser, registerUser, getClientList,
  viewClient, deleteClient, editClient, uploadImage , allComments,
  payment, verifyPayment,adminLoginUser,addLeave,getRequestList,reviewRequest
} from "../controllers/controller.js";
import authenticateToken from "../middleware/middleware.js";
import User from "../model/user.js";

const route = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the 'uploads' folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// File type validation
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}.jpg`);
  },
});

const upload = multer({ storage, fileFilter });

route.get("/", (req, res) => res.send("API is running..."));
//get me api
route.get('/me', authenticateToken, async (req, res) => {
    try{
      const user = await User.findById(req.user.id).select('username role');
      // -password except password
       if(!user){
        return  res.status(404).json({ message: 'User not found.' });
       }
       res.status(200).json(user);
      }catch(err){
        res.status(500).json({message: 'Server error.', error: err.message
        })
      }
}); 
route.post("/login", loginUser);
route.post("/admin/login", adminLoginUser);
route.post("/register", registerUser);
route.post("/client",authenticateToken, addClient);
route.get("/list", getClientList);
route.get("/fetchclient/:id", viewClient);
route.delete("/deleteclient/:id", deleteClient);
route.put("/updateclient/:id", editClient);
route.post("/upload", upload.single("image"), uploadImage);
route.get("/comments", allComments);
route.post("/payment",payment);
route.post("/payment/verify", verifyPayment);
route.post("/leave/add", addLeave);
route.post("/leave/review", reviewRequest);
route.get("/leave/list",authenticateToken, getRequestList);

export default route;
