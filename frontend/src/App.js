import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components2/Header';
import Home from './components2/Home';
import About from './components2/About';
import Dashboard from './components2/Dashboard';

const App = () => (
  <Provider store={store}>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
