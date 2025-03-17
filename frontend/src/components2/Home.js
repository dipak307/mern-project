import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addClient } from '../Redux/action/authAction';
import ClientList from './ListShow';
const Home = () => {
    const [clients,setClient]=useState({ client: '', email: '' });
    const dispatch=useDispatch()
    const handleChange=(e)=>setClient({...clients,[e.target.name]:e.target.value});
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(addClient(clients));
    }
  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom>
      Home Page
    </Typography>

    <form onSubmit={handleSubmit}>
      <TextField
        label="Client Name"
        name="client"
        fullWidth
        margin="normal"
        required
        onChange={handleChange}
      />

      <TextField
        label="Client Email"
        name="email"
        type="email"
        fullWidth
        margin="normal"
        required
        onChange={handleChange}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit
      </Button>
    </form>
    <ClientList/>
  </Container>
  )
}

export default Home;
