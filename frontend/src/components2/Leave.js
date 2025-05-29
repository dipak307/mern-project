import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import { addLeave, fetchLeaveRequest } from '../Redux/action/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';


const Leave = () => {
  const [open, setOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const [form, setForm] = useState({
    name: '',
    type: '',
    reason: '',
    start_date: '',
    end_date: '',
  });

  const dispatch = useDispatch();
  const { leaveData = [], loading, error } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await dispatch(addLeave(form)); // Wait for the addLeave action to finish
      setOpen(false);
      setSuccessAlert(true);
      setForm({
        name: '',
        type: '',
        reason: '',
        start_date: '',
        end_date: '',
      });
      dispatch(fetchLeaveRequest()); // Refresh the list after adding
    } catch (error) {
      console.error('Leave request failed:', error);
    }
  };
  const handleChanges=async(id)=>{
    
  }
  useEffect(() => {
    dispatch(fetchLeaveRequest());
  }, [dispatch]);

  const CLIENT_COLUMNS = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'reason', headerName: 'Reason', width: 200 },
  { field: 'type', headerName: 'Type', width: 200 },
  { 
    field: 'action', headerName: 'Actions', width: 140,
    renderCell: (params) => (
       <button onClick={()=>handleChanges(params.id)}>Leave</button>
    )
  }
];

  return (
    <Box sx={{ mt: 4 }}>
      {/* Align button to the right */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{ borderRadius: '10px', px: 4, py: 1 }}
        >
          Request Leave
        </Button>
      </Box>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2,
            backgroundColor: '#f9f9f9',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            Request Leave
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              select
              label="Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Sick">Sick</MenuItem>
              <MenuItem value="Casual">Casual</MenuItem>
              <MenuItem value="Earned">Earned</MenuItem>
            </TextField>
            <TextField
              label="Reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              type="date"
              label="Start Date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="date"
              label="End Date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* DataGrid */}
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={(leaveData?.data || []).map((item, index) => ({ id: item._id || index, ...item }))}
          columns={CLIENT_COLUMNS}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          loading={loading}
        />
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={successAlert}
        autoHideDuration={3000}
        onClose={() => setSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSuccessAlert(false)}>
          Leave request submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Leave;
