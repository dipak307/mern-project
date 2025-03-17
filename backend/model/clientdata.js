import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    clientname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model('ClientData', userSchema);

