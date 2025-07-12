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
  Chip
} from '@mui/material';
import { addLeave, fetchLeaveRequest, reviewRequest } from '../Redux/action/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';

const Leave = () => {
  const [open, setOpen] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [openPop, setopenPop] = useState(false);

  const dispatch = useDispatch();
  const { leaveData = {}, loading } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    name: '',
    type: '',
    reason: '',
    start_date: '',
    end_date: '',
  });

  const [datareview, setDataReview] = useState({
    id: null,
    status: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChange2 = (e) => {
    setDataReview({ ...datareview, [e.target.name]: e.target.value });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    try {
      dispatch(reviewRequest(datareview));
      setopenPop(false);
      setSuccessAlert(true);
      setDataReview({
        id: null,
        status: '',
        message: '',
      });
      dispatch(fetchLeaveRequest());
    } catch (error) {
      console.error('Review Leave failed:', error);
    }
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
    setDataReview({
      id: id,
      status: '',
      message: '',
    });
    setopenPop(true);
  };

  useEffect(() => {
    dispatch(fetchLeaveRequest());
  }, [dispatch]);

  const COLUMNS = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'reason', headerName: 'Reason', width: 250 },
    { field: 'type', headerName: 'Type', width: 180 },
   {
  field: 'status',
  headerName: 'Status',
  width: 200,
  renderCell: (params) => {
    let color = 'default';
    if (params.value === 'approved') {
      color = 'success';
    } else if (params.value === 'rejected') {
      color = 'error';
    } else if (params.value === 'pending') {
      color = 'warning';
    }

    return <Chip label={params.value} color={color} sx={{ textTransform: 'capitalize' }} />;
  },
},
    ...(leaveData?.user?.role === 'admin'
      ? [
          {
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
                  sx={{ textTransform: 'capitalize' }}
                >
                  Review
                </Button>
              </Tooltip>
            ),
          },
        ]
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
            sx={{ borderRadius: 2, textTransform: 'capitalize' }}
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

      {/* Leave Request Form Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            sx={{ textTransform: 'capitalize' }}
          >
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

      {/* Review Request Dialog */}
      <Dialog open={openPop} onClose={() => setopenPop(false)} fullWidth maxWidth="sm">
        <DialogTitle>Review or Mark</DialogTitle>
        <form onSubmit={handleSubmit2}>
          <DialogContent dividers>
            <TextField
              label="Message"
              name="message"
              variant="outlined"
              value={datareview.message}
              onChange={handleChange2}
              required
              multiline
              rows={3}
              fullWidth
              margin="normal"
            />

            <TextField
              select
              label="Status"
              name="status"
              value={datareview.status}
              onChange={handleChange2}
              required
              fullWidth
              margin="normal"
            >
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setopenPop(false)} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={successAlert}
        autoHideDuration={3000}
        onClose={() => setSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSuccessAlert(false)}>
          Action completed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Leave;
