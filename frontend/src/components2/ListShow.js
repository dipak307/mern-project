import React, { useState, useEffect } from 'react';
import { TextField, Container, Typography, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CLIENT_COLUMNS from './constant/constant'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients } from '../Redux/action/authAction';

const ClientList = () => {
    const dispatch = useDispatch();
    const { clients = [], loading, error } = useSelector(state => state.auth); 
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    // Filter rows based on search query
    const filteredRows = clients
        .filter(client => 
            client.clientname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((client, index) => ({
            id: client._id || index + 1,
            clientname: client.clientname,
            email: client.email,
        }));

    return (
        <Container maxWidth="md">
            <Card sx={{ mt: 4, p: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        Client List
                    </Typography>

                    {/* Search Bar */}
                    <TextField
                        label="Search Clients"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Data Grid */}
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={filteredRows}
                            columns={CLIENT_COLUMNS}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            loading={loading}
                        />
                    </div>

                    {error && <Typography color="error">{error}</Typography>}
                </CardContent>
            </Card>
        </Container>
    );
};

export default ClientList;
