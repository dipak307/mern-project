import axios from 'axios';
import types from '../types';

const API_URL = 'http://localhost:5000/api/auth'; 

const getAuthHeaders = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: userInfo ? `Bearer ${userInfo.token}` : '',
        },
    };
};

// REGISTER 
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: types.REGISTER_REQUEST });
        const { data } = await axios.post(`${API_URL}/register`, userData);
        dispatch({ type: types.REGISTER_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ type: types.REGISTER_FAIL, payload: error.response?.data?.message || "Registration failed" });
    }
};

// LOGIN 
export const login = (userData) => async (dispatch) => {
    try {
        dispatch({ type: types.LOGIN_REQUEST });
        const { data } = await axios.post(`${API_URL}/login`, userData, getAuthHeaders());
        dispatch({ type: types.LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));  
        localStorage.setItem('user_role',data.user.user_role);

    } catch (error) {
        dispatch({ type: types.LOGIN_FAIL, payload: error.response?.data?.message || "Login failed" });
    }
};
// ADMIN LOGIN 
export const adminLogin = (userData) => async (dispatch) => {
    try {
        dispatch({ type: types.ADMIN_LOGIN_REQUEST });
        const { data } = await axios.post(`${API_URL}/admin/login`, userData, getAuthHeaders());
        dispatch({ type: types.ADMIN_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));  
        localStorage.setItem('user_role',data.user.user_role);

    } catch (error) {
        dispatch({ type: types.ADMIN_LOGIN_FAIL, payload: error.response?.data?.message || "Login failed" });
    }
};

// LOGOUT
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
      localStorage.removeItem('user_role');
    dispatch({ type: types.LOGOUT });
};

// ADD CLIENT
export const addClient = (clientData) => async (dispatch) => {
    try {
        dispatch({ type: types.CLIENT_REQUEST });
        const { data } = await axios.post(`${API_URL}/client`, clientData, getAuthHeaders());
        dispatch({ type: types.CLIENT_SUCCESS, payload: data });
        // update client imediatly
        dispatch(fetchClients());
    } catch (error) {
        dispatch({ type: types.CLIENT_FAIL, payload: error.response?.data?.message || "Failed to add client" });
    }
};

// GET ALL CLIENTS
export const fetchClients = () => async (dispatch) => {
    dispatch({ type: types.FETCH_CLIENTS_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/list`, getAuthHeaders());
        dispatch({ type: types.FETCH_CLIENTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: types.FETCH_CLIENTS_FAIL, payload: error.response?.data?.message || error.message });
    }
};

// GET SINGLE CLIENT
export const fetchSingleClient = (id) => async (dispatch) => {
    dispatch({ type: types.FETCH_CLIENT_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/fetchclient/${id}`, getAuthHeaders());
        dispatch({ type: types.FETCH_CLIENT_SUCCESS, payload: data });
        // update client imediatly
        dispatch(fetchClients());
    } catch (error) {
        dispatch({ type: types.FETCH_CLIENT_FAIL, payload: error.response?.data?.message || error.message });
    }
};

// UPDATE SINGLE CLIENT
export const updateSingleClient = (id, updateData) => async (dispatch) => {
    dispatch({ type: types.UPDATE_CLIENT_REQUEST });
    try {
        const { data } = await axios.put(`${API_URL}/updateclient/${id}`, updateData, getAuthHeaders());  
        dispatch({ type: types.UPDATE_CLIENT_SUCCESS, payload: data });
        // update client imediatly
        dispatch(fetchClients());
    } catch (error) {
        dispatch({ type: types.UPDATE_CLIENT_FAIL, payload: error.response?.data?.message || error.message });
    }
};

// DELETE SINGLE CLIENT
export const deleteSingleClient = (id) => async (dispatch) => {
    dispatch({ type: types.DELETE_CLIENT_REQUEST });
    try {
        const { data } = await axios.delete(`${API_URL}/deleteclient/${id}`, getAuthHeaders());  
        dispatch({ type: types.DELETE_CLIENT_SUCCESS, payload: data });
        // update client imediatly
        dispatch(fetchClients());
    } catch (error) {
        dispatch({ type: types.DELETE_CLIENT_FAIL, payload: error.response?.data?.message || error.message });
    }
};
    /// Count Product

    export const addToCart = (product) => (dispatch) => {
        dispatch({
            type: types.ADD_TO_CART,
            payload: product, 
        });
    };

  // Add Leave Request
  export const addLeave = (leaveData) => async (dispatch) => {
    dispatch({ type: types.ADD_LEAVE_REQUEST });
        try {
            const { data } = await axios.post(`${API_URL}/leave/add`, leaveData, getAuthHeaders());  
            dispatch({ type: types.ADD_LEAVE_SUCCESS, payload: data });
            // dispatch(fetchClients());
        } catch (error) {
            dispatch({ type: types.ADD_LEAVE_FAIL, payload: error.response?.data?.message || error.message });
        }
    };

    export const fetchLeaveRequest=()=>async(dispatch)=>{
         dispatch({type:types.FETCH_LEAVE_REQUEST});
         try {
            const {data} = await axios.get(`${API_URL}/leave/list`,getAuthHeaders());
            dispatch({type:types.FETCH_LEAVE_SUCCESS,payload:data});
         } catch (error) {
            dispatch({type: types.FETCH_LEAVE_FAIL,payload:error.response?.data?.message || error.message})
         }
    }

    // clear auth 
    export const clearAuth = () => (dispatch) => {
        dispatch({ type: 'CLEAR_AUTH' });
    };

    // Add Leave Request
  export const reviewRequest = (leaveData) => async (dispatch) => {
    dispatch({ type: types.REVIEW_LEAVE_REQUEST });
        try {
            const { data } = await axios.post(`${API_URL}/leave/review`, leaveData, getAuthHeaders());  
            dispatch({ type: types.REVIEW_LEAVE_SUCCESS, payload: data });
            // dispatch(fetchClients());
        } catch (error) {
            dispatch({ type: types.REVIEW_LEAVE_FAIL, payload: error.response?.data?.message || error.message });
        }
    };
