import types from '../types';

const initialState = {
    userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) 
        : null,
    clients: [],
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
                userInfo: action.payload, 
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
        //Client list
        case types.FETCH_CLIENTS_REQUEST:
            return {
                ...state,
                loading: false,
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
