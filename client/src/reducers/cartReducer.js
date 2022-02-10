import * as types from '../actions/types'

const initialState = {
    cartItems: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.ADD_TO_CART:
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case types.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }
        case types.CART_RESET:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
}