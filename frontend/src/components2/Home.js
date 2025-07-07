import React, { useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { addClient, updateSingleClient } from '../Redux/action/authAction';
import ClientList from './ListShow';
import EditPopup from '../popup/EditPopup';

const Home = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    mobile: '',
    salary: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const dispatch = useDispatch();

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setOpenDialog(false);
    setErrors({});
  };

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!employeeData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!employeeData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employeeData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!employeeData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(employeeData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }

    if (!employeeData.salary.trim()) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(employeeData.salary) || Number(employeeData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    if (!employeeData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      dispatch(addClient(employeeData));
      setEmployeeData({
        name: '',
        email: '',
        mobile: '',
        salary: '',
        address: '',
      });
      setErrors({});
      setOpenDialog(false);

      // Show notifier
      toast.success('Employee added successfully!', {
        position: 'top-right',
      });
    }
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
      <Toaster /> {/* Place this at root level so it works globally */}

      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Office Management
        </Typography>

        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Employee Management
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={handleDialogOpen}
              sx={{
                px: 4,
                py: 1,
                fontSize: '16px',
                borderRadius: '25px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 25px rgba(0,0,0,0.3)',
                },
              }}
            >
              Add Employee
            </Button>
          </Box>
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            background: '#f9f9f9',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Employee List
          </Typography>

          <ClientList handleEdit={handleEdit} />
        </Paper>
      </Container>

      {/* Add Employee Popup */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Add New Employee
        </DialogTitle>
        <DialogContent>
          <Box component="form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  required
                  value={employeeData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  value={employeeData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile Number"
                  name="mobile"
                  type="tel"
                  fullWidth
                  required
                  value={employeeData.mobile}
                  onChange={handleChange}
                  error={!!errors.mobile}
                  helperText={errors.mobile}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Salary"
                  name="salary"
                  type="number"
                  fullWidth
                  required
                  value={employeeData.salary}
                  onChange={handleChange}
                  error={!!errors.salary}
                  helperText={errors.salary}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  fullWidth
                  multiline
                  minRows={2}
                  value={employeeData.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
          <Button
            onClick={handleDialogClose}
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: '25px',
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '25px',
              px: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 6px 25px rgba(0,0,0,0.3)',
              },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Popup */}
      <EditPopup
        open={editOpen}
        onClose={() => setEditOpen(false)}
        clientData={selectedClient}
        onSave={handleUpdate}
      />
    </>
  );
};

export default Home;
