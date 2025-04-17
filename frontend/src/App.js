import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components2/Header';
import Home from './components2/Home';
import About from './components2/About';
import Dashboard from './components2/Dashboard';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </Provider>
  );
};

const AppRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/" element={userInfo ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={userInfo ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/about" element={userInfo ? <About /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;


