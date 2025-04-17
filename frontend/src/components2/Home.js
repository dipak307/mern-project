import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addClient, updateSingleClient } from '../Redux/action/authAction';
import ClientList from './ListShow';
import EditPopup from '../popup/EditPopup';

const Home = () => {
    const [clients, setClient] = useState({ client: '', email: '' });
    const [editOpen, setEditOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const dispatch = useDispatch();
    const handleChange = (e) => setClient({ ...clients, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addClient(clients));
        setClient({ client: '', email: '' }); 
    };

    const handleEdit = (data) => {
        setSelectedClient(data); 
        setEditOpen(true); 
    };

    const handleUpdate = (updatedData) => {
        dispatch(updateSingleClient(updatedData));
        setEditOpen(false);
    };

    return (
        <>
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
                    value={clients.client} 
                    onChange={handleChange}
                />

                <TextField
                    label="Client Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    required
                    value={clients.email} 
                    onChange={handleChange}
                />

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </form>

            {/* Client List with Edit Handler */}
        </Container>
            <Container sx={{ width: "80%", mx: "auto", mt: 4 }}>
                <ClientList handleEdit={handleEdit} />
            </Container>

            {/* Edit Popup */}
            <EditPopup open={editOpen} onClose={() => setEditOpen(false)} clientData={selectedClient} onSave={handleUpdate} />
            </>
    );
};

export default Home;
