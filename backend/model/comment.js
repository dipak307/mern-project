import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({ 
    username: String, 
    text: String, 
    timestamp: { type: Date, default: Date.now } 
  });
  const Comment = mongoose.model('Comment', CommentSchema);
  export default Comment;