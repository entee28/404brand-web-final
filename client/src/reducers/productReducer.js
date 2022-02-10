import { GET_PRODUCTS, GET_PRODUCTS_FAIL, DELETE_PRODUCT, ADD_PRODUCT, PRODUCTS_LOADING, UPDATE_PRODUCT } from "../actions/types";

const initialState = {
    products: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            };
        case GET_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.payload)
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products]
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map((product) => product._id === action.payload._id ? action.payload : product)
            };
        case PRODUCTS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}