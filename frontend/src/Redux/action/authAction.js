import axios from 'axios';
import types from '../types';

const API_URL = 'http://localhost:5000/api/auth'; // Change if needed

// REGISTER 
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: types.REGISTER_REQUEST });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(`${API_URL}/register`, userData, config);
        dispatch({ type: types.REGISTER_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ type: types.REGISTER_FAIL, payload: error.response?.data?.message || "Registration failed" });
    }
};

// LOGIN 
export const login = (userData) => async (dispatch) => {
    try {
        dispatch({ type: types.LOGIN_REQUEST });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(`${API_URL}/login`, userData, config);
        dispatch({ type: types.LOGIN_SUCCESS, payload: data });
        localStorage.setItem('user', JSON.stringify(data)); 
    } catch (error) {
        dispatch({ type: types.LOGIN_FAIL, payload: error.response?.data?.message || "Login failed" });
    }
};
//LOGOUT
export const logout = () => (dispatch) => {
    localStorage.removeItem('user');
    dispatch({ type: types.LOGOUT });
  };
//ADD CLIENT
export const addClient = (clientData) => async(dispatch) => {
    try{
        dispatch({ type: types.CLIENT_REQUEST });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(`${API_URL}/client`, clientData, config);
        dispatch({type:types.CLIENT_SUCCESS,payload:data})
    }catch(error){
        dispatch({ type: types.CLIENT_FAIL, payload: error.response?.data?.message || " failed to add client" });
    }
};

export const fetchClients = () => async (dispatch) => {
    dispatch({ type: types.FETCH_CLIENTS_REQUEST });
    try {
        const response = await axios.get(`${API_URL}/list`);
        dispatch({ type: types.FETCH_CLIENTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: types.FETCH_CLIENTS_FAILURE, payload: error.message });
    }
};
