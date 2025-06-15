import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/auth/comments')
      .then((res) => setComments(res.data.comments))
      .catch((err) => console.error(err));

    socket.on('receiveComment', (newComment) => {
      setComments((prev) => [...prev, newComment]);
    });

    return () => socket.off('receiveComment');
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);

  const sendComment = () => {
    if (text.trim() && username.trim()) {
      const commentData = { username, text };
      socket.emit('sendComment', commentData);
      setText('');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        border: '1px solid #ccc',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 2, backgroundColor: '#1976d2', color: '#fff' }}>
        <Typography variant="h6" align="center">
          Live Comment Section
        </Typography>
      </Paper>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, backgroundColor: '#f9f9f9' }}>
        <List>
          {comments.map((comment, index) => {
            const isOwnComment = comment.username === username;

            return (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    justifyContent: isOwnComment ? 'flex-end' : 'flex-start',
                    flexDirection: isOwnComment ? 'row-reverse' : 'row',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>{comment.username?.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      textAlign: isOwnComment ? 'right' : 'left',
                      maxWidth: '70%',
                      backgroundColor: isOwnComment ? '#d1e7dd' : '#ffffff',
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      boxShadow: 1,
                    }}
                    primary={comment.username}
                    secondary={comment.text}
                  />
                </ListItem>
              </React.Fragment>
            );
          })}
          <div ref={bottomRef} />
        </List>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: 2,
          borderTop: '1px solid #ccc',
          backgroundColor: '#fff',
        }}
      >
        <TextField
          label="Your Name"
          variant="outlined"
          size="small"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label="Write a comment..."
            variant="outlined"
            fullWidth
            multiline
            maxRows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendComment}
            endIcon={<SendIcon />}
            disabled={!text || !username}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentSection;
