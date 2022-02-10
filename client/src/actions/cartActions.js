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

    setTimeout(() => {
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
    }, 500)
}

export const incCart = (id, qty) => (dispatch, getState) => {
    axios.get(`/api/products/${id}`)
        .then(res => dispatch({
            type: types.ADD_TO_CART,
            payload: {
                product: res.data._id,
                name: res.data.name,
                imageUrl: res.data.imageUrl,
                price: res.data.price,
                countInStock: res.data.countInStock,
                qty: qty + 1
            }
        }))

    setTimeout(() => {
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
    }, 500)
}

export const decCart = (id, qty) => (dispatch, getState) => {
    axios.get(`/api/products/${id}`)
        .then(res => dispatch({
            type: types.ADD_TO_CART,
            payload: {
                product: res.data._id,
                name: res.data.name,
                imageUrl: res.data.imageUrl,
                price: res.data.price,
                countInStock: res.data.countInStock,
                qty: qty - 1
            }
        }))

    setTimeout(() => {
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
    }, 500)
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: types.REMOVE_FROM_CART,
        payload: id
    })

    setTimeout(() => {
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
    }, 500)
}

export const emptyCart = (id) => (dispatch, getState) => {
    dispatch({
        type: types.CART_RESET,
    })

    setTimeout(() => {
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
    }, 500)
}