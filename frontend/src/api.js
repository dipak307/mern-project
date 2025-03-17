import axios from 'axios';
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Login API
export const loginUserAPI = (userData) => API.post('/auth/login', userData);
//Register api
export const registerUserAPI = (userData) => API.post('/auth/register', userData);

export default API;