import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    clientname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('ClientData', userSchema);

