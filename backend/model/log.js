import mongoose from 'mongoose';


const logsSchema = new mongoose.Schema({
  action: String,
  user_id: Number,             
  description: String,
  os: String,
  browser: String,
  ip_address: String,
}, { timestamps: true });

const Log = mongoose.model('Log', logsSchema); 

export default Log;
