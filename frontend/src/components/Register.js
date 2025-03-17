import React, { useState } from 'react';
import { register } from '../Redux/action/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Container, Typography, Alert, Card, CardContent, Link, CircularProgress } from '@mui/material';

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.auth);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("name",formData);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
    };

    return (
        <Container maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Card sx={{ p: 3, boxShadow: 3, maxWidth: "100%", width: 400 }}>
                <CardContent>
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        Register
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Full Name"
                            name="username"
                            type="text"
                            fullWidth
                            margin="normal"
                            required
                            onChange={handleChange}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            margin="normal"
                            required
                            onChange={handleChange}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            fullWidth
                            margin="normal"
                            required
                            onChange={handleChange}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={loading}
                        >
                           {loading ? <CircularProgress size={24} /> : 'Register'}
                        </Button>

                        <Typography textAlign="center" sx={{ mt: 2 }}>
                            <Link href="/login" underline="hover">
                                Already have an account? Login
                            </Link>
                        </Typography>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Register;
