import React, { useState, useMemo, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';

import Login from './components/Login';
import Register from './components/Register';
import Header from './components2/Header';
import Home from './components2/Home';
import About from './components2/About';
import Dashboard from './components2/Dashboard';
import CartSummary from './AddToCart';
import AdminLogin from './components/AdminLogin';
import Leave from './components2/Leave';

const App = () => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppRoutes mode={mode} setMode={setMode} />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

const AppRoutes = ({ mode, setMode }) => {
  const location = useLocation();

  const noHeaderRoutes = ['/login', '/admin/login', '/register'];
  const showHeader = !noHeaderRoutes.includes(location.pathname);

  const { userInfo } = useSelector((state) => state.auth);


  return (
    <>
      {showHeader && <Header mode={mode} setMode={setMode} />}
      <Routes>
        <Route path="/" element={userInfo ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={userInfo ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/about" element={userInfo ? <About /> : <Navigate to="/login" />} />
        <Route path="/cart" element={userInfo ? <CartSummary /> : <Navigate to="/login" />} />
        <Route path="/leave/add" element={userInfo ? <Leave  /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
