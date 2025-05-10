import types from '../types';

const initialState = {
    userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) 
        : null,
    clients: [],
    cartItems: [],
    cartCount: 0,
    client: null, // Separate field for single client
    loading: false,
    error: null,
    success: false,
};

// Authentication Reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // LOGIN REQUEST
        case types.LOGIN_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null,
                success: false
            };

        case types.LOGIN_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                userInfo: action.payload, 
                error: null,
                success: true,
            };

        case types.LOGIN_FAIL:
            return { 
                ...state, 
                loading: false, 
                error: action.payload,
                success: false,
            };

        // REGISTER REQUEST
        case types.REGISTER_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null,
                success: false, 
            };

        case types.REGISTER_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                userInfo: action.payload, 
                error: null,
                success: true, 
            };

        case types.REGISTER_FAIL:
            return { 
                ...state, 
                loading: false, 
                error: action.payload,
                success: false,
            };

        // ADD CLIENT
        case types.CLIENT_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null,
                success: false, 
            };

        case types.CLIENT_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                clients: [...state.clients, action.payload], 
                error: null,
                success: true, 
            };

        case types.CLIENT_FAIL:
            return { 
                ...state, 
                loading: false, 
                error: action.payload,
                success: false,
            };

        // Fetch all clients
        case types.FETCH_CLIENTS_REQUEST:
            return {
                ...state,
                loading: true, 
                error: null,
                success: false,
            };
        case types.FETCH_CLIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                clients: action.payload, 
                error: null,
                success: true,
            };
        case types.FETCH_CLIENTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };

        // Fetch single client
        case types.FETCH_CLIENT_REQUEST:
            return {
                ...state,
                loading: true, 
                error: null,
                success: false,
            };
        case types.FETCH_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                client: action.payload, 
                error: null,
                success: true,
            };
        case types.FETCH_CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };

        // DELETE SINGLE CLIENT
        case types.DELETE_CLIENT_REQUEST:
            return {
                ...state,
                loading: true, 
                error: null,
                success: false,
            };
        case types.DELETE_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                clients: state.clients.filter(client => client.id !== action.payload.id), 
                error: null,
                success: true,
            };
        case types.DELETE_CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };
        // ADD TO CART
            case types.ADD_TO_CART:
                return {
                    ...state,
                    loading: false, 
                    cartItems: [...state.cartItems, action.payload], 
                    cartCount: state.cartCount + 1,
                    error: null,
                    success: true, 
                }

        // LOGOUT ACTION
        case types.LOGOUT:
            localStorage.removeItem('userInfo');
            return { 
                ...state, 
                userInfo: null, 
                loading: false, 
                error: null,
                success: false, 
            };

        default:
            return state;
    }
};

export default authReducer;
