import * as types from '../actions/types'
import axios from 'axios'

export const addToCart = (id, qty) => (dispatch, getState) => {
    axios.get(`/api/products/${id}`)
        .then(res => dispatch({
            type: types.ADD_TO_CART,
            payload: {
                product: res.data._id,
                name: res.data.name,
                imageUrl: res.data.imageUrl,
                price: res.data.price,
                countInStock: res.data.countInStock,
                qty
            }
        }))

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: types.REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
}