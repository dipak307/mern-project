import React, { useState, useEffect } from 'react';
import { register } from '../Redux/action/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Button, TextField, Container, Typography, Alert, 
    Card, CardContent, Link, CircularProgress 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, success , userInfo } = useSelector((state) => state.auth || {});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
    };

    useEffect(() => {
        if (success) {
            navigate('/login', { replace: true });
        }
    }, [success , navigate]);

    return (
        <Container 
            maxWidth="xs" 
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
        >
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
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            margin="normal"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            fullWidth
                            margin="normal"
                            required
                            value={formData.password}
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
