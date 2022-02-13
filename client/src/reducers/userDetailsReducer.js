import { GET_USER_DETAILS, GET_USER_DETAILS_FAIL, GET_USER_DETAILS_RESET, GET_USER_DETAILS_SUCCESS } from "../actions/types";

const initialState = {
    user: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_DETAILS:
            return {
                loading: true
            }
        case GET_USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case GET_USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_USER_DETAILS_RESET:
            return {
                user: {}
            }
        default:
            return state;
    }
}