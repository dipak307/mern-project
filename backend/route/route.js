import express from 'express';
import { addClient, loginUser, registerUser,getClientList, viewClient, deleteClient, editClient } from '../controllers/controller.js';
const route=express.Router();

route.get('/', (req, res) => res.send('API is running...'));
route.post('/login',loginUser);
route.post('/register',registerUser);
route.post('/client',addClient);
route.get('/list',getClientList);
// crud 
route.get("/fetchclient/:id",viewClient);
route.delete("/deleteclient/:id",deleteClient);
route.put("/clientupdate/:id",editClient);
export default route;