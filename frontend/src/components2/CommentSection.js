import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000'); // Change this to your backend URL

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    // Fetch existing comments
    axios.get('http://localhost:5000/api/auth/comments')
      .then(res => setComments(res.data.comments))
      .catch(err => console.log(err));

    // Listen for new comments
    socket.on('receiveComment', (newComment) => {
      setComments(prev => [newComment, ...prev]); 
    });

    return () => socket.off('receiveComment');
  }, []);
  const sendComment = () => {
    if (text.trim() && username.trim()) {
      const commentData = { username, text };
      socket.emit('sendComment', commentData);
      setText('');
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <textarea 
        placeholder="Write a comment..." 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <button onClick={sendComment}>Submit</button>

      <ul>
        {comments && comments?.map((comment, index) => (
          <li key={index}>
            <strong>{comment.username}:</strong> {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
