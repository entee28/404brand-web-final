import axios from 'axios'
import { userRequest } from '../requestMethods';
import { GET_PRODUCTS, DELETE_PRODUCT, ADD_PRODUCT, PRODUCTS_LOADING, GET_PRODUCTS_FAIL, GET_PRODUCT_DETAILS_SUCCESS, GET_PRODUCT_DETAILS, GET_PRODUCT_DETAILS_RESET, GET_PRODUCT_DETAILS_FAIL, UPDATE_PRODUCT } from "./types";

export const setProductsLoading = () => {
    return {
        type: PRODUCTS_LOADING
    }
}

export const setProductDetailsLoading = () => {
    return {
        type: GET_PRODUCT_DETAILS
    }
}

export const removeProductDetails = () => dispatch => {
    dispatch({
        type: GET_PRODUCT_DETAILS_RESET
    })
}

export const getProducts = () => dispatch => {
    dispatch(setProductsLoading);
    axios.get('https://brand404.herokuapp.com/api/products')
        .then(res => dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        }))
        .catch(error => dispatch({
            type: GET_PRODUCTS_FAIL,
            payload: error.payload && error.response.data.message ? error.response.data.message : error.message
        }))
}

export const getProductDetails = (id) => dispatch => {
    dispatch(setProductDetailsLoading);
    axios.get(`https://brand404.herokuapp.com/api/products/${id}`)
        .then(res => dispatch({
            type: GET_PRODUCT_DETAILS_SUCCESS,
            payload: res.data
        }))
        .catch(error => dispatch({
            type: GET_PRODUCT_DETAILS_FAIL,
            payload: error.payload && error.response.data.message ? error.response.data.message : error.message
        }))
}

export const deleteProduct = (id) => dispatch => {
    userRequest.delete(`https://brand404.herokuapp.com/api/products/${id}`)
        .then(res => dispatch({
            type: DELETE_PRODUCT,
            payload: id
        }))
}

export const addProduct = (product) => dispatch => {
    userRequest.post('https://brand404.herokuapp.com/api/products', product)
        .then(res => dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        }))

}

export const updateProduct = (product, id) => dispatch => {
    userRequest.put(`https://brand404.herokuapp.com/api/products/${id}`, product)
        .then(res => dispatch({
            type: UPDATE_PRODUCT,
            payload: res.data
        }))

}