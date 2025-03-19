import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import clientdata from '../model/clientdata.js';

// REGISTER USER
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// LOGIN USER
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7h" });
        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email },message: "User Login successfully" });
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
        res.status(200).json({ message: "Client Added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// getting all client
export const getClientList = async (req, res) => {
    try {
        const clients = await clientdata.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// delete single client
export const deleteClient = async (req, res) => {
    try {
        const { id } = req.body; 
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

export const editClient = async (req, res) => {
    try {
        const { id , client , email  } = req.body; 
        const editclient = await clientdata.findById(id);
        if (!editclient) {
            return res.status(404).json({ message: "Client not found" });
        }
        editClient.clientname=client;
        editClient.email=email;
       await editClient.save();
        res.status(200).json({ message: "Client updated successfully", editclient });
    } catch (error) {
        res.status(500).json({ message: "Error updating client", error: error.message });
    }
};

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

