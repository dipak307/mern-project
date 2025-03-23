import React, { useState,useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateSingleClient } from '../Redux/action/authAction';
const EditPopup = ({ open, onClose, clientData }) => {
  const [client,setClient]=useState({client:'',email:''});
 const dispatch=useDispatch();
 
  useEffect(() => {
    if (clientData) {
      setClient(clientData);
    }
  }, [clientData]);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSingleClient(client.id,client));
    onClose(); 
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Client Details</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Client Name"
            name="client"
            fullWidth
            margin="normal"
            required
            value={client.clientname}
            onChange={handleChange}
          />

          <TextField
            label="Client Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={client.email}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditPopup;
