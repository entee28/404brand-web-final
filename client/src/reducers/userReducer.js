import { GET_USERS, GET_USERS_FAIL, DELETE_USER, ADD_USER, USERS_LOADING, UPDATE_USER } from "../actions/types";


const initialState = {
    users: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case GET_USERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            };
        case ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map((user) => user._id === action.payload._id ? action.payload : user)
            };
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}