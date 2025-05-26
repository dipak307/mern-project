import mongoose from 'mongoose';

const LeaveSchema = new mongoose.Schema({
  name: { type: String },
  reason: { type: String },
  type: { type: String },
  status: { type: String, default: 'pending' },
  start_date: { type: Date },  
  end_date: { type: Date }
}, { timestamps: true });

export default mongoose.model('Leave', LeaveSchema);
