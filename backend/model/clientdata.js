import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    salary: { type: Number, required: true },
    address: { type: String, required: true },
    // You can optionally add an image URL field later if needed
    // imageUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Employee', employeeSchema);


