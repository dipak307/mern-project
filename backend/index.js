import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './db/db.js';
import route from './route/route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
db();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth",route);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
