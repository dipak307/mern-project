import React, { useState, useEffect } from 'react';
import { TextField, Container, Typography, IconButton } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, fetchSingleClient,deleteSingleClient} from '../Redux/action/authAction'; // Ensure deleteClient exists
import CLIENT_COLUMNS from './constant/constant';

const ClientList = ({handleEdit}) => {
    const dispatch = useDispatch();
    const { clients = [], loading, error } = useSelector(state => state.auth);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(fetchClients()); 
    }, [dispatch]);

    const handleView = (id) => {
        dispatch(fetchSingleClient(id));
    };


    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            dispatch(deleteSingleClient(id)); 
        }
    };

    const filteredRows = clients
        .filter(client =>
            client.clientname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.email?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((client, index) => ({
            id: client._id || index + 1, 
            clientname: client.clientname,
            email: client.email,
        }));
    // CLIENT_COLUMNS with action handlers
    const columnsWithHandlers = CLIENT_COLUMNS.map(column => {
        if (column.field === "action") {
            return {
                ...column,
                renderCell: (params) => (
                    <>
                        <IconButton color="primary" onClick={() => handleView(params.row.id)}>
                            <Visibility />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleEdit(params.row)}>
                            <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
                            <Delete />
                        </IconButton>
                    </>
                )
            };
        }
        return column;
    });

    return (
        <Container sx={{ mt: 4, width: "80%", mx: "auto" }}>
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
                    columns={columnsWithHandlers}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    loading={loading}
                />
            </div>

            {error && <Typography color="error">{error}</Typography>}
        </Container>

    );
};

export default ClientList;
