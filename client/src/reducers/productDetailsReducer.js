import { GET_PRODUCT_DETAILS, GET_PRODUCT_DETAILS_FAIL, GET_PRODUCT_DETAILS_RESET, GET_PRODUCT_DETAILS_SUCCESS } from "../actions/types";

const initialState = {
    product: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_DETAILS:
            return {
                loading: true
            }
        case GET_PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case GET_PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_PRODUCT_DETAILS_RESET:
            return {
                product: {}
            }
        default:
            return state;
    }
}