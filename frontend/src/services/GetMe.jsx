import axios from 'axios';
import API from '../api';
export const GetMe = async () => {
  const token = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')).token 
    : null;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await API.get(`/auth/me`, config);
  return res.data; 
};
