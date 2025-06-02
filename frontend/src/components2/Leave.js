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
  Alert,
  Paper,
  Tooltip,
} from '@mui/material';
import { addLeave, fetchLeaveRequest } from '../Redux/action/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';

const Leave = () => {
  const [open, setOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const dispatch = useDispatch();
  const { leaveData = {}, loading } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    name: '',
    type: '',
    reason: '',
    start_date: '',
    end_date: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await dispatch(addLeave(form));
      setOpen(false);
      setSuccessAlert(true);
      setForm({
        name: '',
        type: '',
        reason: '',
        start_date: '',
        end_date: '',
      });
      dispatch(fetchLeaveRequest());
    } catch (error) {
      console.error('Leave request failed:', error);
    }
  };

  const handleActionClick = (id) => {
    console.log('Clicked Leave on ID:', id);
    // Add approve/reject logic here
  };

  useEffect(() => {
    dispatch(fetchLeaveRequest());
  }, [dispatch]);

  const COLUMNS = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'reason', headerName: 'Reason', width: 200 },
    { field: 'type', headerName: 'Type', width: 180 },
    ...(leaveData?.user?.role === 'admin'
      ? [{
          field: 'action',
          headerName: 'Actions',
          width: 140,
          renderCell: (params) => (
            <Tooltip title="Approve or Reject">
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => handleActionClick(params.id)}
              >
                Review
              </Button>
            </Tooltip>
          ),
        }]
      : []),
  ];

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Paper sx={{ p: 3, mb: 3 }} elevation={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight="bold">
            Leave Requests
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 2 }}
          >
            Request Leave
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ height: 420, p: 2 }} elevation={2}>
        <DataGrid
          rows={(leaveData?.data || []).map((item, index) => ({
            id: item._id || index,
            ...item,
          }))}
          columns={COLUMNS}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          loading={loading}
        />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
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

      <Snackbar
        open={successAlert}
        autoHideDuration={3000}
        onClose={() => setSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSuccessAlert(false)}>
          Leave request submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Leave;
